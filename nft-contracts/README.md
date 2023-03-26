# Filecoin infrustructure

Wallet Ethereum Address: 0x93df989465E0b1cD882E195DD5C4a760018151F9 

TimePact deployed to: 0x4E0c5D412B208DEDD6B6dF49A8Cd41b66B3936ea

ScrollBridge deployed to Scroll: 0x75b69b55945C86BCaC598C234784f347c8f0234b

# Scroll Bridge for TimePact

Bridging process:

TimePact

function bridgeToScroll(
        uint256 tokenId
    ) public returns (string memory, uint64, bool, address, string memory, uint256)

function bridgeFromScroll(uint256 tokenId, address recipient) public {
        if (msg.sender != owner) {
            revert TimePact__CallerIsNotOwner();
        }
        safeTransferFrom(owner, recipient, tokenId);
    }

Scroll

    `function releaseCopy(
        string memory creator,
        uint64 unlock,
        bool filecoin,
        address recipient,
        string memory uri,
        uint256 tokenId
    ) `

    function bridgeToFilecoin(uint256 tokenId) public returns (uint256, address) {
        safeTransferFrom(msg.sender, owner, tokenId);
        return (tokenId, msg.sender);
    }
