# Scroll Bridge for TimePact

Bridging process:

TimePact
USERS: function bridgeToScroll(
        uint256 tokenId
    ) public returns (string memory, uint64, bool, address, string memory, uint256)

WE: function bridgeFromScroll(uint256 tokenId, address recipient) public {
        if (msg.sender != owner) {
            revert TimePact__CallerIsNotOwner();
        }
        safeTransferFrom(owner, recipient, tokenId);
    }

Scroll
WE: function releaseCopy(
        string memory creator,
        uint64 unlock,
        address recipient,
        string memory uri,
        uint256 tokenId
    ) 

USERS: function bridgeToFilecoin(uint256 tokenId, address recipient) public returns (address) {
        safeTransferFrom(msg.sender, owner, tokenId);
        return recipient;
    }
