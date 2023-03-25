const { create } = require('ipfs-http-client')
const fileUpload = require('express-fileupload')
const {
  generateKeys,
  encryptRSA,
  decryptRSA,
  encryptAES,
  decryptAES,
  crypto,
} = require('../services/encryption')

const client = create({ url: `http://ipfs:${process.env.IPFS_PORT}` })

generateKeys()

var express = require('express')
var router = express.Router()
router.use(fileUpload())

router.post('/upload', async (req, res, next) => {
  if (!req.files) {
    res.send('File was not found')
    return
  }

  const data = req.files.data.data

  const key = crypto.randomBytes(16).toString('hex') // 16 bytes -> 32 chars
  const iv = crypto.randomBytes(8).toString('hex') // 8 bytes -> 16 chars
  const ekey = encryptRSA(key) // 32 chars -> 684 chars
  const ebuff = encryptAES(data, key, iv)

  const content = Buffer.concat([
    // headers: encrypted key and IV (len: 700=684+16)
    Buffer.from(ekey, 'utf8'), // char length: 684
    Buffer.from(iv, 'utf8'), // char length: 16
    Buffer.from(ebuff, 'utf8'),
  ])

  const uploaded = await client.add(content)

  res.send(uploaded)
})

router.get('/retrieve', async (req, res, next) => {
  if (!req.query.cid) {
    res.send('No cid provided')
  }

  const ecid = req.query.cid
    .replaceAll('xMl13Jk', '+')
    .replaceAll('Po3r21Ld', '/')
    .replaceAll('M1l32', '=')

  const cid = decryptRSA(ecid)

  const stream = client.cat(cid)

  let edata = []
  for await (const chunk of stream) edata.push(chunk)
  edata = Buffer.concat(edata)

  const key = decryptRSA(edata.slice(0, 684).toString('utf8'))
  const iv = edata.slice(684, 700).toString('utf8')
  const econtent = edata.slice(700).toString('utf8')
  const ebuf = Buffer.from(econtent, 'hex')
  const content = decryptAES(ebuf, key, iv)

  res.end(content)
})

module.exports = router
