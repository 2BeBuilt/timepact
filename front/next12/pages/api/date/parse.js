import { express } from '@/utils/hosts'

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const stamp = Number(req.query.stamp)
    res.status(200).json(new Date(stamp).getTime())
  }
}
