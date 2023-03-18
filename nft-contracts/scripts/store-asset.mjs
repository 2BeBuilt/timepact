import { NFTStorage, File } from "nft.storage"
import fs from "fs"
import dotenv from "dotenv"
dotenv.config()

const API_KEY = process.env.NFT_STORAGE_API_KEY

async function storeAsset() {
    const client = new NFTStorage({ token: API_KEY })
    const metadata = await client.store({
        name: "TimeWarp",
        description: "Encrypt and save your data for the future!",
        image: new File([await fs.promises.readFile("assets/1.png")], "1.png", {
            type: "image/png",
        }),
    })
    console.log("Metadata stored on Filecoin and IPFS with URL:", metadata.url)
}

storeAsset()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
