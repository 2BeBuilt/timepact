import { ethers } from 'ethers'
import { scroll } from '@/utils/constants/addresses'
import contractAbi from '@/utils/constants/abiScrollBridge.json'

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const creator = req.query.creator
    const unlock = req.query.unlock
    const filecoin = req.query.filecoin === 'true' ? true : false
    const recipient = req.query.recipient
    const uri = req.query.uri
    const tokenId = req.query.tokenId

    const provider = new ethers.providers.JsonRpcProvider(
      'https://alpha-rpc.scroll.io/l2'
    )
    const signer = new ethers.Wallet(process.env.PK, provider)
    const scrollBridge = new ethers.Contract(scroll, contractAbi, signer)

    const result = await scrollBridge.releaseCopy(
      creator,
      Number(unlock),
      filecoin,
      ethers.utils.getAddress(recipient),
      uri,
      Number(tokenId)
    )

    res.status(200).json(result)
  }
}
