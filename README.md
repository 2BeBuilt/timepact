# TimePact

### Abstract
The TimePact is built in **Hyperspace**, the testnet of **FEVM** that just came out on the Mainnet. It gives users the ability to create a time capsule with specific data and an expiration date that could be unlocked by the special NFT. NFTs could be transferred easily among the accounts and bridged to other blockchains (Scroll for now), this gives the market a great opportunity to speculate on what could be in a specific TimePact. Because the data that is stored on the Filecoin Storage Providers or IPFS is not encrypted, TimePact uses a special algorithm that will only expose the data to the owner of the NFT after a specific time. The project utilizes the new **FEVM** as it proposes **Storage Deals** through smart-contracts and utilizes the resilience of the original filecoin infrastructure. NFTs can be bridged from **FEVM** to the **Scroll** testnet (more blockchains coming) to become a true multi-chain service. 

### Scenic Introduction
Introducing TimePact - a blockchain marvel that blends ancient magic and futuristic technology to lock and encrypt your data. Enter into an Immutable Pact with an ancient librarian, who safeguards your information with powerful magic encryption. Receive a unique NFT key that can unlock and retrieve your data from the formidable IPFS or Filecoin Storage Providers at a pre-determined time. The keys can travel through space and time and can even be traded for mystical cryptographic currency on other blockchains, like Scroll. Step into the future with TimePact, where magic meets technology.

### TimePact creation flow
At the start of the creation process, the **creator** would be asked to upload the files, input **Creator** information and choose the **date of exposure** when the encypted data can be decrypted and revealed to the holder of the **Pact** (a specific NFT that serves as a key to the data). 

After signing the **TimePact**, data is stored on the ipfs node for future transfer to Filecoin Storage Providers in case the user chooses this option. In the case of Filecoin Storage, the `end_epoch` is `unlock date` + 24 weeks delay. After the `unlock date`, the owner of NFT would use it to decrypt the stored `data` from the Filecoin Storage Providers or the IPFS node into `initial data`.

### Technology
One of the key benefits of TimePact is that it is a modular technology, anyone can spin up TimePact nodes and create a decentralized privacy layer on top of Filecoin EVM and IPFS. This will enable more people to take advantage of the powerful combination of blockchain technology to secure their data.

Moreover, the modular design of TimePact makes it scalable and flexible, ensuring that it can adapt to the changing needs of its users. This means that as more people start using TimePact, the service can scale up to accommodate the growing demand for its services.

By creating a decentralized privacy layer on top of Filecoin EVM and IPFS, TimePact is helping to establish a new standard for data security and protection in the blockchain space. As more people adopt this technology, we can expect to see a significant increase in the level of privacy and security in the digital world.
