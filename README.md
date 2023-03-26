# TimePact: Secure Data Storage with Unlockable Encrypted Content through Non-fungible tokens. Developing Privacy

TimePact is a decentralized application (dApp) built on the Hyperspace testnet of Filecoin EVM (FEVM), which has recently transitioned to Mainnet. It allows users to create secure time capsules containing specific data, with an expiration date, that can be unlocked using special NFTs. These NFTs can be easily transferred between accounts and bridged to other blockchains (currently Scroll), providing a market for speculation on the contents of each TimePact.

The data stored on Filecoin Storage Providers or IPFS is encrypted, and TimePact employs a unique algorithm that exposes the data only to the NFT owner after a specified time. By leveraging the innovative FEVM, TimePact facilitates Storage Deals through smart contracts while utilizing the resilience of the original Filecoin infrastructure. NFTs can be bridged from FEVM to the Scroll testnet (with more blockchains coming soon) to establish a truly multi-chain service.

## Key Features

1. **Secure Time Capsules**: Create time capsules containing encrypted data, accessible only after a specific expiration date.
2. **Unlockable NFTs**: Utilize unique NFTs as keys to unlock and access the stored data.
3. **Transferable NFTs**: Easily transfer NFTs between accounts, fostering market speculation on TimePact contents.
4. **Multi-Chain Compatibility**: Bridge NFTs from FEVM to Scroll testnet (and more blockchains in the future) for a truly multi-chain experience.

## TimePact: A Pioneer in Secure Data Storage and NFT-based Unlocking

TimePact leverages the cutting-edge features of FEVM and the potential of NFTs to provide a secure, encrypted data storage solution that is unlocked only after a specified time. As a result, it offers a powerful platform for creating digital time capsules and fostering a thriving market for speculation on their contents. With multi-chain compatibility, TimePact is set to become a key player in the ever-evolving world of decentralized data storage and NFT-based technologies.


### Scenic Introduction
Introducing TimePact - a blockchain marvel that blends ancient magic and futuristic technology to lock and encrypt your data. Enter into an Immutable Pact with an ancient librarian, who safeguards your information with powerful magic encryption. Receive a unique NFT key that can unlock and retrieve your data from the formidable IPFS or Filecoin Storage Providers at a pre-determined time. The keys can travel through space and time and can even be traded for mystical cryptographic currency on other blockchains, like Scroll. Step into the future with TimePact, where magic meets technology.

## Overview

1. **Creating a TimePact**: Upload files, input creator information, and choose an unlock date.
2. **Data Storage**: Store encrypted data on IPFS or Filecoin Storage Providers (user's choice).
3. **NFT-based Keys**: Utilize NFTs as keys to unlock and decrypt stored data.
4. **Cross-Chain Functionality**: Transfer NFT keys between Filecoin EVM (FEVM) and Scroll Layer 2 blockchain.

## Creating a TimePact

To create a TimePact:

1. **Upload Files**: Visit the "Sign Pact" page and upload the files you want to store. Supported file types include text, images, and more.
2. **Input Creator Information**: Provide the necessary creator information (twitter, wallet, name...).
3. **Choose Unlock Date**: Select the date when the encrypted data can be decrypted and revealed (the unlock date). After the unlock date is confirmed, the data's erase time will be set to 24 weeks after the unlock date.

After confirming the unlock time, a `Sign Pact` button will appear. Click it to sign the transaction, which will encrypt the data, and mint a unique NFT key (1 out of 5 pseudo-randomized types) with all necessary information in the user's FEVM wallet.

## Data Storage

After signing the TimePact, the encrypted data is stored on an IPFS node. Users can opt to transfer their data to Filecoin Storage Providers by clicking on the IPFS sign. The system will populate a custom `deal proposal` transaction using self-deployed `deal client` and `deal client` will emit a necessary event on-chain, based on the Filecoin's specifications. Once the proposal is accepted by Storage Providers, the user's storage solution will be with Filecoin Storage Providers. 

In the case of Filecoin Storage, the `end_epoch` is the `unlock date` + `24 weeks delay`.

## NFT-based Keys

On the `My Pacts` page, users can view all their TimePacts and corresponding NFT keys while connected to FEVM. Each NFT key has a countdown timer indicating the time remaining until the unlock date. When the countdown expires, an `Unlock` button appears, allowing users to sign the `Unlock Pact`, decrypt the stored data, and make it viewable or downloadable for the NFT key owner.

*Note: Once an NFT key is used to unlock data, it becomes non-transferable (soul-bound) to avoid market confusion.*

## Cross-Chain Functionality

Users can send their NFT keys to other wallets on FEVM or bridge the token to the Scroll Layer 2 blockchain for easier trading and wider audience reach. TimePact uses a custom-developed bridge from FEVM to Scroll for now, with more blockchains coming in the future through the Hyperlane from Scroll.

If NFT keys are bridged to the Scroll blockchain, users can view their tokens on any marketplace connected to Scroll or the `My Pacts` page of the TimePact dApp while connected to the Scroll blockchain. From there, users can send NFT keys to other Scroll addresses or bridge the tokens back to FEVM for unlocking the content and decrypting or downloading it.

## Future Expansion

TimePact aims to become a modular solution, allowing anyone to deploy nodes with its encryption, decryption, and storage flows. This will enable the creation of a decentralized privacy layer on top of Filecoin EVM and IPFS. This will enable more people to take advantage of the powerful combination of blockchain technology to secure their data.

Moreover, the modular design of TimePact makes it scalable and flexible, ensuring that it can adapt to the changing needs of its users. This means that as more people start using TimePact, the service can scale up to accommodate the growing demand for its services.

By creating a decentralized privacy layer on top of Filecoin EVM and IPFS, TimePact is helping to establish a new standard for data security and protection in the blockchain space. As more people adopt this technology, we can expect to see a significant increase in the level of privacy and security in the digital world.



