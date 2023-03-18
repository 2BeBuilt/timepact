// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";

error TimeWarp__EmptyKey();
error TimeWarp__NotEnoughTimePassed();
error TimeWarp__CallerIsNotOwnerNorApproved();
error TimeWarp__TokenDoesNotExist();
error TimeWarp__AlreadyUnlocked();

contract TimeWarp is ERC721 {
    constructor() ERC721("TimeWarp", "TW") {}

    struct WarpInfo {
        string creator; // reference to the creator of the Warp
        uint64 unlock; // unix timestamp
        string CID; // reference to the encrypted storage
        bool locked; //locked or unlocked
    }

    mapping(uint256 => WarpInfo) internal keys;

    uint constant delay = 24 weeks;
    uint256 private number;

    event Warped(string cid, string creator, uint64 edate); //Creation of the Warp
    event Unlocked(uint256 tokenId, address owner, string cid); //Unlocking the file (expiration of the Warp)

    /// @notice Creates the record of the tokenId -> CID pair
    /// @param cid IPFS pointer
    /// @param creator Original creator of the Warp
    /// @param edate The expiry date in UNIX format
    function warp(string memory cid, string memory creator, uint64 edate) external {
        if (keccak256(abi.encode(cid)) == keccak256(abi.encode(""))) {
            revert TimeWarp__EmptyKey();
        }
        WarpInfo storage info = keys[number];
        info.creator = creator;
        info.unlock = edate;
        info.CID = cid;
        info.locked = true;

        _safeMint(msg.sender, number); //Only works with ERC721 reciever/holder in the case with smart contracts
        ++number;
        emit Warped(cid, creator, edate);
    }

    /// @notice Unlocks the file and emits the event
    /// @param tokenId The NFT to get the user address for
    function unlock(uint256 tokenId) external {
        if (!keys[tokenId].locked) {
            revert TimeWarp__AlreadyUnlocked();
        }
        if (_isApprovedOrOwner(msg.sender, tokenId)) {
            revert TimeWarp__CallerIsNotOwnerNorApproved();
        }
        if (!checkUnlock(tokenId)) {
            revert TimeWarp__NotEnoughTimePassed();
        }

        keys[tokenId].locked = false;

        emit Unlocked(tokenId, msg.sender, keys[tokenId].CID);
    }

    /// @notice Checks if the files can be unlocked
    /// @dev True => can be unlocked
    /// @param tokenId The NFT to get the user address for
    function checkUnlock(uint256 tokenId) public view returns (bool) {
        if (uint256(keys[tokenId].unlock) >= block.timestamp) {
            return true;
        } else {
            return false;
        }
    }

    /// @notice Checks if the files were outdated and deleted
    /// @dev True => deleted
    /// @param tokenId The NFT to get the user address for
    function checkDelete(uint256 tokenId) public view returns (bool) {
        if (uint256(keys[tokenId].unlock) >= block.timestamp + delay) {
            return true;
        } else {
            return false;
        }
    }

    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        if (!_exists(tokenId)) {
            revert TimeWarp__TokenDoesNotExist();
        }

        string memory baseURI = _baseURI();
        return baseURI;
    }

    function _baseURI() internal pure override returns (string memory) {
        return "ipfs://bafyreidzk5x25hnwj2qsyueplg4k3vgrg7nlflv36xihntpycrgqh7yure/metadata.json";
    }
}
