# Filecoin infrustructure

Wallet Ethereum Address: 0x93df989465E0b1cD882E195DD5C4a760018151F9 

TimePact deployed to: 0x07Af8dF107ff41F9e25E21eA36465Ece9f83cc9C

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

    function bridgeToFilecoin(uint256 tokenId) public returns (uint256, address) {
        safeTransferFrom(msg.sender, owner, tokenId);
        return (tokenId, msg.sender);
    }