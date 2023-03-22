import axios from 'axios'
import { getExpress } from '@/utils/hosts'

export async function GET(request) {
  axios
    .get(`${getExpress()}/api/ipfs`)
    .then((res) => {
      console.log(JSON.stringify(res))
      return new Response(JSON.stringify(res))
    })
    .catch((err) => {
      console.log(JSON.stringify(err))
      return new Response(JSON.stringify(err))
    })
  return new Response('')
}

export async function POST(req, res) {
  console.log(request)
  axios
    .post(`${getExpress()}/api/ipfs/upload`, formData, {
      signal: abortController.signal,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then(function (response) {
      console.log(response)
      setCid(response.data.path)

      setLoading(false)
      setAlert(true)
    })
    .catch(function (error) {
      setLoading(false)
      console.log(error)
    })
    .finally(function () {})
}
