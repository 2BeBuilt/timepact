// SPDX-License-Identifier: MIT

pragma solidity ^0.8.17;

interface IScrollBridge {
    /// @dev Releases a copy on the chain
    function releaseCopy(
        string memory creator,
        uint64 unlock,
        bool filecoin,
        address recipient,
        string memory uri,
        uint256 tokenId
    ) external;

    /// @dev locks the NFT in the contract and releases original on the other chain
    function bridgeToFilecoin(uint256 tokenId) external returns (uint256, address);

    /// @notice gives out details on specific deal
    /// Creator - string of the initiator of the mint
    /// Unlock - UNIX unlock date
    /// CID - ipfs cid or filecoin's storage providers' pcid or car
    /// Erase - SP storage expiry
    /// Filecoin - true in case the deal with storage providers was made
    function tokenInfo(uint256 tokenId) external view returns (string memory, uint64, bool);

    function tokenURI(uint256 tokenId) external view returns (string memory);
}
