import { unpackToFs } from 'ipfs-car/unpack/fs'

export default async function handler(req, res) {
  if (req.method === 'GET') {
    await unpackToFs({
      input: `temp/temp.car`,
      output: `temp/`,
    })
    res.status(200).json('ok')
  }
}
