# Filecoin infrustructure

Wallet Ethereum Address: 0x93df989465E0b1cD882E195DD5C4a760018151F9 

TimePact deployed to: 0x7df86c47473b58Bfa4ee13d36C8274064341A5f7

ScrollBridge deployed to Scroll: 0xC567266cca974BDabE3e669D2B5e6A3deb0a7Ae6

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
        bool filecoin,
        address recipient,
        string memory uri,
        uint256 tokenId
    ) 

USERS: function bridgeToFilecoin(uint256 tokenId, address recipient) public returns (address) {
        safeTransferFrom(msg.sender, owner, tokenId);
        return recipient;
    }