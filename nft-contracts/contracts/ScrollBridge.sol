//SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";

error ScrollBridge__CallerIsNotOwner();
error ScrollBridge__TokenDoesNotExist();

contract ScrollBridge is ERC721Enumerable {
    struct PactInfo {
        string creator; // reference to the creator of the Pact
        uint64 unlock; // unix timestamp
        bool filecoin; // flag for Filecoin
    }

    mapping(uint256 => PactInfo) internal keys;
    mapping(uint256 => string) private tokenURIs;

    address public owner;

    constructor() ERC721("TimePact", "TP") {
        owner = msg.sender;
    }

    /// @dev Releases a copy on the chain
    function releaseCopy(
        string memory creator,
        uint64 unlock,
        address recipient,
        string memory uri,
        uint256 tokenId
    ) external {
        if (msg.sender != owner) {
            revert ScrollBridge__CallerIsNotOwner(); //Only deployer node can sign the transaction
        }
        if (_exists(tokenId)) {
            safeTransferFrom(owner, recipient, tokenId);
        } else {
            PactInfo storage info = keys[tokenId];
            info.creator = creator;
            info.unlock = unlock;
            tokenURIs[tokenId] = uri;

            _safeMint(msg.sender, tokenId); //Only works with ERC721 reciever/holder in the case with smart contracts
        }
    }

    /// @dev locks the NFT in the contract and releases original on the other chain
    function bridgeToFilecoin(uint256 tokenId, address recipient) public returns (address) {
        safeTransferFrom(msg.sender, owner, tokenId);
        return recipient;
    }

    /// @notice gives out details on specific deal
    /// Creator - string of the initiator of the mint
    /// Unlock - UNIX unlock date
    /// CID - ipfs cid or filecoin's storage providers' pcid or car
    /// Erase - SP storage expiry
    /// Filecoin - true in case the deal with storage providers was made
    function tokenInfo(uint256 tokenId) public view returns (string memory, uint64, bool) {
        return (keys[tokenId].creator, keys[tokenId].unlock, keys[tokenId].filecoin);
    }

    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        if (!_exists(tokenId)) {
            revert ScrollBridge__TokenDoesNotExist();
        }
        return tokenURIs[tokenId];
    }
}
