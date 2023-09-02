import { ethers } from 'ethers'
import { pact } from '@/utils/constants/addresses'
import contractAbi from '@/utils/constants/abiTimePact.json'

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const tokenId = req.query.tokenId
    const recipient = req.query.recipient

    const provider = new ethers.providers.JsonRpcProvider(
      'https://api.hyperspace.node.glif.io/rpc/v1'
    )
    const signer = new ethers.Wallet(process.env.PK, provider)
    const timePact = new ethers.Contract(pact, contractAbi, signer)

    const result = await timePact.bridgeFromScroll(
      Number(tokenId),
      ethers.utils.getAddress(recipient)
    )

    res.status(200).json(result)
  }
}
