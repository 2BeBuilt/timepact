import { NFTStorage, File } from "nft.storage"
import fs from "fs"
import dotenv from "dotenv"
dotenv.config()

const API_KEY = process.env.NFT_STORAGE_API_KEY

async function storeAsset() {
    const client = new NFTStorage({ token: API_KEY })
    for (let i = 1; i <= 5; i++) {
        const metadata = await client.store({
            name: `TimePact #${i}`,
            description: "Encrypt and save your data for the future!",
            image: new File([await fs.promises.readFile(`assets/${i}.png`)], `${i}.png`, {
                type: "image/png",
            }),
        })
        console.log("Metadata stored on Filecoin and IPFS with URL:", metadata.url)
    }
}

storeAsset()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
