# Filecoin infrustructure

Wallet Ethereum Address: 0x93df989465E0b1cD882E195DD5C4a760018151F9 

TimePact deployed to: 0x4E0c5D412B208DEDD6B6dF49A8Cd41b66B3936ea

ScrollBridge deployed to Scroll: 0x75b69b55945C86BCaC598C234784f347c8f0234b

# Scroll Bridge for TimePact

Bridging process:

Filecoin -> Scroll

`function bridgeToScroll(uint256 tokenId) public returns (string memory, uint64, bool, address, string memory, uint256) {
        safeTransferFrom(msg.sender, owner, tokenId);
        string memory uri = tokenURI(tokenId);
        emit BridgeToScroll(
            keys[tokenId].creator,
            keys[tokenId].unlock,
            keys[tokenId].filecoin,
            msg.sender,
            uri,
            tokenId
        );
        return (
            keys[tokenId].creator,
            keys[tokenId].unlock,
            keys[tokenId].filecoin,
            address(msg.sender),
            uri,
            tokenId
        );
    }

function releaseCopy(
        string memory creator,
        uint64 unlock,
        bool filecoin,
        address recipient,
        string memory uri,
        uint256 tokenId
        ) external {
        if (msg.sender != owner) {
            revert ScrollBridge__CallerIsNotOwner(); //Only deployer node can sign the transaction
        }
        if (_exists(tokenId)) {
            safeTransferFrom(owner, recipient, tokenId);
        } else {
            PactInfo storage info = keys[tokenId];
            info.creator = creator;
            info.unlock = unlock;
            info.filecoin = filecoin;
            tokenURIs[tokenId] = uri;

            _safeMint(msg.sender, tokenId); //Only works with ERC721 reciever/holder in the case with smart contracts
        }
    }`

Scroll -> Filecoin

    function bridgeToFilecoin(uint256 tokenId) public returns (uint256, address) {
        safeTransferFrom(msg.sender, owner, tokenId);
        emit BridgeToFilecoin(tokenId, msg.sender);
        return (tokenId, msg.sender);
    }

    function bridgeFromScroll(uint256 tokenId, address recipient) public {
        if (msg.sender != owner) {
            revert TimePact__CallerIsNotOwner();
        }
        safeTransferFrom(owner, recipient, tokenId);
    }
