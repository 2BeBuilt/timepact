import { packToFs } from 'ipfs-car/pack/fs'
import { FsBlockStore } from 'ipfs-car/blockstore/fs'

export default async function handler(req, res) {
  if (req.method === 'GET') {
    await packToFs({
      input: `temp/README.md`,
      output: `temp/output.car`,
      blockstore: new FsBlockStore(),
    })
    res.status(200).json('ok')
  }
}
