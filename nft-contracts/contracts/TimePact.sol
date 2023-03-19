// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";

error TimePact__EmptyKey();
error TimePact__NotEnoughTimePassed();
error TimePact__CallerIsNotOwnerNorApproved();
error TimePact__TokenDoesNotExist();
error TimePact__AlreadyUnlocked();

contract TimePact is ERC721 {
    constructor() ERC721("TimePact", "TP") {}

    struct PactInfo {
        string creator; // reference to the creator of the Pact
        uint64 unlock; // unix timestamp
        string CID; // reference to the encrypted storage
        bool locked; //Pact locked or unlocked
    }

    mapping(uint256 => PactInfo) internal keys;

    uint constant delay = 24 weeks;
    uint256 private number;

    event Pact(string cid, string creator, uint64 edate); //Creation of the Pact
    event Unlocked(uint256 tokenId, address owner, string cid); //Unlocking the file (expiration of the Pact)

    /// @notice Creates the record of the tokenId -> CID pair
    /// @param cid IPFS pointer
    /// @param creator Original creator of the Pact
    /// @param edate The expiry date in UNIX format
    function pact(string memory cid, string memory creator, uint64 edate) external {
        if (keccak256(abi.encode(cid)) == keccak256(abi.encode(""))) {
            revert TimePact__EmptyKey();
        }
        PactInfo storage info = keys[number];
        info.creator = creator;
        info.unlock = edate;
        info.CID = cid;
        info.locked = true;

        _safeMint(msg.sender, number); //Only works with ERC721 reciever/holder in the case with smart contracts
        ++number;
        emit Pact(cid, creator, edate);
    }

    /// @notice Unlocks the file and emits the event
    /// @param tokenId The NFT to get the user address for
    function unlock(uint256 tokenId) external {
        if (_isApprovedOrOwner(msg.sender, tokenId)) {
            revert TimePact__CallerIsNotOwnerNorApproved();
        }
        if (!checkUnlock(tokenId)) {
            revert TimePact__NotEnoughTimePassed();
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
            revert TimePact__TokenDoesNotExist();
        }

        string memory baseURI = _baseURI();
        return baseURI;
    }

    // /**
    //  * @dev See {IERC721-transferFrom}.
    //  */
    // function transferFrom(address from, address to, uint256 tokenId) public override {
    //     if (!keys[tokenId].locked) {
    //         revert TimePact__AlreadyUnlocked();
    //     }
    //     require(
    //         _isApprovedOrOwner(_msgSender(), tokenId),
    //         "ERC721: caller is not token owner or approved"
    //     );
    //     _transfer(from, to, tokenId);
    // }

    // /**
    //  * @dev See {IERC721-safeTransferFrom}.
    //  */
    // function safeTransferFrom(address from, address to, uint256 tokenId) public override {
    //     if (!keys[tokenId].locked) {
    //         revert TimePact__AlreadyUnlocked();
    //     }
    //     safeTransferFrom(from, to, tokenId, "");
    // }

    // /**
    //  * @dev See {IERC721-safeTransferFrom}.
    //  */
    // function safeTransferFrom(
    //     address from,
    //     address to,
    //     uint256 tokenId,
    //     bytes memory data
    // ) public override {
    //     if (!keys[tokenId].locked) {
    //         revert TimePact__AlreadyUnlocked();
    //     }
    //     require(
    //         _isApprovedOrOwner(_msgSender(), tokenId),
    //         "ERC721: caller is not token owner or approved"
    //     );
    //     _safeTransfer(from, to, tokenId, data);
    // }

    // //////////////////TESTING THIS/////////////////////
    //     /**
    //  * @dev Safely transfers `tokenId` token from `from` to `to`, checking first that contract recipients
    //  * are aware of the ERC721 protocol to prevent tokens from being forever locked.
    //  *
    //  * `data` is additional data, it has no specified format and it is sent in call to `to`.
    //  *
    //  * This internal function is equivalent to {safeTransferFrom}, and can be used to e.g.
    //  * implement alternative mechanisms to perform token transfer, such as signature-based.
    //  *
    //  * Requirements:
    //  *
    //  * - `from` cannot be the zero address.
    //  * - `to` cannot be the zero address.
    //  * - `tokenId` token must exist and be owned by `from`.
    //  * - If `to` refers to a smart contract, it must implement {IERC721Receiver-onERC721Received}, which is called upon a safe transfer.
    //  *
    //  * Emits a {Transfer} event.
    //  */
    // function _safeTransfer(
    //     address from,
    //     address to,
    //     uint256 tokenId,
    //     bytes memory data
    // ) internal virtual {
    // if (!keys[tokenId].locked) {
    //     revert TimePact__AlreadyUnlocked();
    // }
    //     _transfer(from, to, tokenId);
    //     require(_checkOnERC721Received(from, to, tokenId, data), "ERC721: transfer to non ERC721Receiver implementer");
    // }

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
}
