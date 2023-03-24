const { create } = require('ipfs-http-client')
const { packToFs } = require('ipfs-car/pack/fs')
const { FsBlockStore } = require('ipfs-car/blockstore/fs')
const { unpackToFs } = require('ipfs-car/unpack/fs')
const fs = require('fs')
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
router.use(fileUpload({ useTempFiles: true, tempFileDir: '/temp/' }))

router.post('/upload', async (req, res, next) => {
  if (!req.files) {
    res.send('File was not found')
    return
  }

  for (const key in req.files) {
    const file = req.files[key]
    fs.mkdir('/tmp/test/', (err) => {
      if (err) console.log(err)
    })
    fs.mkdir('/tmp/cars/', (err) => {
      if (err) console.log(err)
    })
    fs.writeFile(`/tmp/test/${file.name}`, file.data, (err) => {
      if (err) console.log(err)
    })
  }

  await packToFs({
    input: `/tmp/test`,
    output: `/tmp/cars/input.car`,
    blockstore: new FsBlockStore(),
  })
  fs.readFile('/tmp/cars/input.car', async (err, data) => {
    if (err) res.send(err)

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

    fs.rmSync('/tmp/test', { recursive: true, force: true })

    res.send(uploaded)
  })
})

router.get('/retrieve', async (req, res, next) => {
  if (!req.query.cid) {
    res.send('No cid provided')
  }

  const cid = req.query.cid

  const stream = client.cat(cid)

  let edata = []
  for await (const chunk of stream) edata.push(chunk)
  edata = Buffer.concat(edata)

  const key = decryptRSA(edata.slice(0, 684).toString('utf8'))
  const iv = edata.slice(684, 700).toString('utf8')
  const econtent = edata.slice(700).toString('utf8')
  const ebuf = Buffer.from(econtent, 'hex')
  const content = decryptAES(ebuf, key, iv)

  console.log(content)

  fs.mkdir('/tmp/output/', (err) => {
    if (err) console.log(err)
  })
  fs.writeFile(`/tmp/output/retrieved.car`, content, (err) => {
    if (err) console.log(err)

    res.setHeader(
      'Content-Disposition',
      'attachment; filename=' + 'retrieved.car'
    )
    res.setHeader('Content-Transfer-Encoding', 'binary')
    res.setHeader('Content-Type', 'application/octet-stream')

    res.sendFile('/tmp/output/retrieved.car')
  })
})

router.get('/', async (req, res, next) => {
  res.render('index', { title: 'ipfs' })
})

module.exports = router
