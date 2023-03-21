// SPDX-License-Identifier: MIT

pragma solidity ^0.8.17;

interface IDeal {
    event DealProposalCreate(bytes32 indexed id, uint64 size, bool indexed verified, uint256 price);

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
        bytes extra_params;
    }

    function makeDealProposal(DealRequest calldata deal) external returns (bytes32);
}

interface ITimePact is IDeal {
    /**
     * @dev Returns the number of tokens in ``owner``'s account.
     */
    function balanceOf(address owner) external view returns (uint256 balance);

    /**
     * @dev Returns the owner of the `tokenId` token.
     *
     * Requirements:
     *
     * - `tokenId` must exist.
     */
    function ownerOf(uint256 tokenId) external view returns (address owner);

    /**
     * @dev Returns the total amount of tokens stored by the contract.
     */
    function totalSupply() external view returns (uint256);

    /**
     * @dev Returns a token ID owned by `owner` at a given `index` of its token list.
     * Use along with {balanceOf} to enumerate all of ``owner``'s tokens.
     */
    function tokenOfOwnerByIndex(address owner, uint256 index) external view returns (uint256);

    /**
     * @dev Returns a token ID at a given `index` of all the tokens stored by the contract.
     * Use along with {totalSupply} to enumerate all tokens.
     */
    function tokenByIndex(uint256 index) external view returns (uint256);

    /// @notice Creates the record of the tokenId -> CID pair
    /// @param pcid IPFS pointer
    /// @param creator Original creator of the Pact
    /// @param edate The expiry date in UNIX format
    function pact(
        string memory pcid,
        string memory creator,
        uint64 edate,
        address dealClient,
        IDeal.DealRequest calldata deal
    ) external;

    /// @notice Unlocks the file and emits the event
    /// @param tokenId The NFT to get the user address for
    function unlock(uint256 tokenId) external;

    /// @notice gives out details on specific deal
    function tokenInfo(
        uint256 tokenId
    ) external view returns (string memory, uint64, string memory, bool, uint64);
}
