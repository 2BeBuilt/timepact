import { express } from '@/utils/hosts'

export default async function handler(req, res) {
  if (req.method === 'GET') {
    res.status(200).json(new Date().getTime())
  }
}
