import { express } from '@/utils/hosts'
import fs from 'fs'
import path from 'path'
import crypto from 'crypto'

function encryptRSA(toEncrypt, pubkeyPath = './security/RSA/public.pem') {
  const absolutePath = path.resolve(pubkeyPath)
  const publicKey = fs.readFileSync(absolutePath, 'utf8')
  const buffer = Buffer.from(toEncrypt, 'utf8')
  const encrypted = crypto.publicEncrypt(publicKey, buffer)
  return encrypted.toString('base64')
}

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const cid = req.query.cid
    let encrypted = encryptRSA(cid)
      .replaceAll('+', 'xMl13Jk')
      .replaceAll('/', 'Po3r21Ld')
      .replaceAll('=', 'M1l32')
    res.status(200).json(encrypted)
  }
}
