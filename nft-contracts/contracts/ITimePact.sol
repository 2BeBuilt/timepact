// SPDX-License-Identifier: MIT

pragma solidity ^0.8.17;

interface IDeal {
    /// User request for this contract to make a deal. This structure is modelled after Filecoin's Deal
    /// Proposal, but leaves out the provider, since any provider can pick up a deal broadcast by this
    /// contract.
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

    /// Extra parameters associated with the deal request. These are off-protocol flags that
    /// the storage provider will need.
    struct ExtraParamsV1 {
        string location_ref;
        uint64 car_size;
        bool skip_ipni_announce;
        bool remove_unsealed_copy;
    }
}

interface ITimePact is IDeal {
    event Pact(string cid, string creator, uint64 edate); //Creation of the Pact
    event Unlocked(uint256 tokenId, address owner, string cid); //Unlocking the file (expiration of the Pact)
    event PactWithFilecoin(string pcid, string creator, uint64 edate); //Creation of the Pact with Filecoin

    /// @dev Returns the number of tokens in ``owner``'s account.
    function balanceOf(address owner) external view returns (uint256 balance);

    /// @dev Returns the owner of the `tokenId` token.
    function ownerOf(uint256 tokenId) external view returns (address owner);

    /// @dev Returns the total amount of tokens stored by the contract.
    function totalSupply() external view returns (uint256);

    /// @dev Returns a token ID owned by `owner` at a given `index` of its token list.
    ///  Use along with {balanceOf} to enumerate all of ``owner``'s tokens.
    function tokenOfOwnerByIndex(address owner, uint256 index) external view returns (uint256);

    /// @dev Returns tokenURI
    function tokenURI(uint256 tokenId) external view returns (string memory);

    /// @notice Creates the record of the tokenId -> CID pair
    /// @param pcid IPFS pointer
    /// @param creator Original creator of the Pact
    /// @param edate The expiry date in UNIX format
    function pact(string memory pcid, string memory creator, uint64 edate) external;

    /// @notice Creates the record of the tokenId -> CID pair
    /// @param pcid piece_cid or car
    function pactFilecoin(string memory pcid, uint256 tokenId, DealRequest calldata deal) external;

    /// @notice Unlocks the file and emits the event
    /// @param tokenId The NFT to get the user address for
    function unlock(uint256 tokenId) external;

    ///  @dev Transfers `tokenId` token from `from` to `to`.
    /// WARNING: Note that the caller is responsible to confirm that the recipient is capable of receiving ERC721
    /// or else they may be permanently lost. Usage of {safeTransferFrom} prevents loss, though the caller must
    ///  understand this adds an external call which potentially creates a reentrancy vulnerability.
    //Requirements:
    /// - `from` cannot be the zero address.
    /// - `to` cannot be the zero address.
    /// - `tokenId` token must be owned by `from`.
    /// - If the caller is not `from`, it must be approved to move this token by either {approve} or {setApprovalForAll}.
    function transferFrom(address from, address to, uint256 tokenId) external;

    /// @notice gives out details on specific deal
    /// Creator - string of the initiator of the mint
    /// Unlock - UNIX unlock date
    /// CID - ipfs cid or filecoin's storage providers' pcid or car
    /// Erase - SP storage expiry
    /// Filecoin - true in case the deal with storage providers was made
    function tokenInfo(
        uint256 tokenId
    ) external view returns (string memory, uint64, string memory, bool, uint64, bool);

    /// @dev locks the NFT in the contract and releases a copy on other chain
    function bridgeToScroll(
        uint256 tokenId
    ) external returns (string memory, uint64, bool, address, string memory, uint256);

    /// @dev returns the NFT to the local chain
    function bridgeFromScroll(uint256 tokenId, address recipient) external;

    //////////////////////Panel for Deal Client (with access control)////////////
    // addBalance funds the builtin storage market actor's escrow
    // with funds from the contract's own balance
    // @value - amount to be added in escrow in attoFIL
    function addBalanceClient(uint256 value) external;

    // This function attempts to withdraw the specified amount from the contract addr's escrow balance
    // If less than the given amount is available, the full escrow balance is withdrawn
    // @client - Eth address where the balance is withdrawn to. This can be the contract address or an external address
    // @value - amount to be withdrawn in escrow in attoFIL
    function withdrawBalanceClient(address client, uint256 value) external;

    /// Address of the deployed Deal Client
    function getDealClient() external view returns (address);
}
