# Filecoin infrustructure and main contracts

Wallet Ethereum Address: `0x93df989465E0b1cD882E195DD5C4a760018151F9`

TimePact deployed to: `0x4E0c5D412B208DEDD6B6dF49A8Cd41b66B3936ea`

ScrollBridge deployed to Scroll: `0x75b69b55945C86BCaC598C234784f347c8f0234b`

# Filecoin-Scroll Bridge Operation

This smart contract contains some of the code for bridging tokens between Filecoin and Scroll, two blockchain platforms.

## Bridging from Filecoin to Scroll

`bridgeToScroll(uint256 tokenId)` on **FEVM** then `releaseCopy(string memory creator,uint64 unlock,bool filecoin,address recipient,string memory uri,uint256 tokenId)` on **Scroll**


## Bridging from Scroll to Filecoin

`bridgeToFilecoin(uint256 tokenId)`

emits an event `BridgeToFilecoin` with the following parameters:

- `tokenId`: the ID of the token
- `msg.sender`: the address of the sender

then call `bridgeFromScroll(uint256 tokenId, address recipient)` on **FEVM**

## TimePact

**TimePact** is the main registry of the `ERC721` tokens, `deployer` of `deal-client` for **FEVM** and the main logic operations contract. 
**ScrollBridge** is the copy of the most important metadata on **Scroll** blockchain and works in synergy with **TimePact** to bridge **FEVM ERC721** to **Scroll ERC721** 
