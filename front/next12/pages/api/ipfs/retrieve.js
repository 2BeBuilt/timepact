import axios from 'axios'

export default async function handler(req, res) {
  if (req.method === 'GET') {
    console.log(req.query.cid)
    axios
      .get(
        `http://express:${process.env.EXPRESS_PORT}/api/ipfs/retrieve?cid=${req.query.cid}`
      )
      .then(function (response) {
        // handle success
        console.log(response)
      })
      .catch(function (error) {
        // handle error
        console.log(error)
      })
      .finally(function () {
        // always executed
      })

    res.status(200).json('ok')
  }
}
