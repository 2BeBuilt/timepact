# Filecoin infrustructure

Wallet Ethereum Address: 0x93df989465E0b1cD882E195DD5C4a760018151F9 

TimePact deployed to: 0xc9bD6E2544aD630a69450D0f99020cF32920aF71

ScrollBridge deployed to Scroll: 0x150C6275651c474082E9b9bfA45b01021148Dea7

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