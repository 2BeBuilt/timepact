import axios from 'axios'
import { express } from '@/utils/hosts'

export default async function handler(req, res) {
  if (req.method === 'GET') {
    axios
      .get(`${express}/ipfs/retrieve?cid=${req.query.cid}`)
      .then(function (response) {
        res.status(200).json(response.data)
      })
      .catch(function (error) {
        if (error.response) {
          res.status(500).json(error.response.data)
        } else if (error.request) {
          res.status(500).json('Request error')
        } else {
          res.status(500).json(('Error', error.message))
        }
      })
  }
}
