# TimeCapsule
### Abstract
The TimeCapsule is created using fresh **FEVM** that just came out on the Mainnet. The idea is to give users ability to create the time capsule with the specific data and expiration date that could be unlocked by the special NFT. As NFTs could be transfered easily among the accounts on the blockchain, this gives the great market opportunity to speculate on what could be in a specific time capsule. Because the data that is stored on the filecoin providers is not encrypted it is essential to design a special algorithm that will only expose the data to the owner of the NFT on the specific time.
This project covers all the necessary features of the new **FEVM** as we use both the power of the solidity smart-contracts and the resilience of the original filecoin infrastructure.

### TimeCapsule creation flow
In the start of the creation process, the creator would be asked to provide the **initial data** and the **date of exposure** when it could be revealed. 

Let's consider the **initial data** as **idata** and **date of exposure** as **edate**.

After that, the **idata** would be encrypted by the special algorithm and the **edata** would be stored on the ipfs node for the future transfer to storage providers. The request would be sent to storage providers to store the **edata** untill the `edate + n`. Where **n** is the maximum days of data retrieval after the **edate** occured. 
After the successful storage deal with one of the providers, the **edata** would be deleted from ipfs and the creator would receive an NFT that would work as a key to retrieve the **idata** after the **edate**.
On the **edate** the owner of NFT would use this key to decrypt the stored **edata** from the FVM.
