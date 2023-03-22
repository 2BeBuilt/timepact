// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "./basic-deal-client/DealClient.sol";

error TimePact__EmptyKey();
error TimePact__NotEnoughTimePassed();
error TimePact__CallerIsNotOwnerNorApproved();
error TimePact__TokenDoesNotExist();
error TimePact__AlreadyUnlocked();

interface IDeal {
    // User request for this contract to make a deal. This structure is modelled after Filecoin's Deal
    // Proposal, but leaves out the provider, since any provider can pick up a deal broadcast by this
    // contract.
    struct DealRequest {
        bytes piece_cid;
        uint64 piece_size;
        bool verified_deal;
        string label;
        int64 start_epoch;
        int64 end_epoch;
        uint256 storage_price_per_epoch;
        uint256 provider_collateral;
        uint256 client_collateral;
        uint64 extra_params_version;
        ExtraParamsV1 extra_params;
    }

    // Extra parameters associated with the deal request. These are off-protocol flags that
    // the storage provider will need.
    struct ExtraParamsV1 {
        string location_ref;
        uint64 car_size;
        bool skip_ipni_announce;
        bool remove_unsealed_copy;
    }

    function makeDealProposal(DealRequest calldata deal) external returns (bytes32);
}

contract TimePact is ERC721Enumerable {
    struct PactInfo {
        string creator; // reference to the creator of the Pact
        uint64 unlock; // unix timestamp
        string pCID; // reference to the encrypted storage piece CID
        bool locked; //Pact locked or unlocked
        uint64 erase; //unlock + delay (UNIX)
    }

    mapping(uint256 => PactInfo) internal keys;

    uint constant delay = 12 weeks;
    uint256 private number;
    DealClient public dealsClient;
    address public owner;

    constructor() ERC721("TimePact", "TP") {
        dealsClient = new DealClient();
        owner = msg.sender;
    }

    event Pact(string cid, string creator, uint64 edate); //Creation of the Pact
    event Unlocked(uint256 tokenId, address owner, string cid); //Unlocking the file (expiration of the Pact)

    /// @notice Creates the record of the tokenId -> CID pair
    /// @param pcid IPFS pointer
    /// @param creator Original creator of the Pact
    /// @param edate The expiry date in UNIX format
    function pact(
        string memory pcid,
        string memory creator,
        uint64 edate,
        DealRequest calldata deal
    ) external {
        if (keccak256(abi.encode(pcid)) == keccak256(abi.encode(""))) {
            revert TimePact__EmptyKey();
        }

        dealsClient.makeDealProposal(deal);

        PactInfo storage info = keys[number];
        info.creator = creator;
        info.unlock = edate;
        info.pCID = pcid;
        info.locked = true;

        _safeMint(msg.sender, number); //Only works with ERC721 reciever/holder in the case with smart contracts
        ++number;
        emit Pact(pcid, creator, edate);
    }

    /// @notice Unlocks the file and emits the event
    /// @param tokenId The NFT to get the user address for
    function unlock(uint256 tokenId) external {
        if (!_isApprovedOrOwner(msg.sender, tokenId)) {
            revert TimePact__CallerIsNotOwnerNorApproved();
        }
        if (!checkUnlock(tokenId)) {
            revert TimePact__NotEnoughTimePassed();
        }

        keys[tokenId].locked = false;

        emit Unlocked(tokenId, msg.sender, keys[tokenId].pCID);
    }

    /// @notice gives out details on specific deal
    function tokenInfo(
        uint256 tokenId
    ) public view returns (string memory, uint64, string memory, bool, uint64) {
        return (
            keys[tokenId].creator,
            keys[tokenId].unlock,
            keys[tokenId].pCID,
            keys[tokenId].locked,
            keys[tokenId].erase
        );
    }

    /// @notice Checks if the files can be unlocked
    /// @dev True => can be unlocked
    /// @param tokenId The NFT to get the user address for
    function checkUnlock(uint256 tokenId) public view returns (bool) {
        if (uint256(keys[tokenId].unlock) <= block.timestamp) {
            return true;
        } else {
            return false;
        }
    }

    /// @notice Checks if the files were outdated and deleted
    /// @dev True => deleted
    /// @param tokenId The NFT to get the user address for
    function checkDelete(uint256 tokenId) public view returns (bool) {
        if (uint256((keys[tokenId].unlock) + delay) <= block.timestamp) {
            return true;
        } else {
            return false;
        }
    }

    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        if (!_exists(tokenId)) {
            revert TimePact__TokenDoesNotExist();
        }
        return _baseURI();
    }

    function getDelay() public pure returns (uint256) {
        return delay;
    }

    /**
     * @dev Token becomes wallet-bound after Pact is unlocked (to prevent malicious trading)
     */
    function _transfer(address from, address to, uint256 tokenId) internal override {
        if (!keys[tokenId].locked) {
            revert TimePact__AlreadyUnlocked();
        }
        super._transfer(from, to, tokenId);
    }

    function _baseURI() internal pure override returns (string memory) {
        return "ipfs://bafyreidzk5x25hnwj2qsyueplg4k3vgrg7nlflv36xihntpycrgqh7yure/metadata.json";
    }

    //////////////////////Panel for Deal Client (with access control)////////////
    // addBalance funds the builtin storage market actor's escrow
    // with funds from the contract's own balance
    // @value - amount to be added in escrow in attoFIL
    function addBalanceClient(uint256 value) public {
        dealsClient.addBalance(value);
    }

    // This function attempts to withdraw the specified amount from the contract addr's escrow balance
    // If less than the given amount is available, the full escrow balance is withdrawn
    // @client - Eth address where the balance is withdrawn to. This can be the contract address or an external address
    // @value - amount to be withdrawn in escrow in attoFIL
    function withdrawBalanceClient(address client, uint256 value) public {
        require(msg.sender == owner);
        dealsClient.withdrawBalance(client, value);
    }

    function getDealClient() public view returns (address) {
        return address(dealsClient);
    }
}
