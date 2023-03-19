const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

security_path = "security/RSA/";
private_path = path.join(security_path, "private.pem");
public_path = path.join(security_path, "public.pem");

function generateKeys() {
  if (fs.existsSync(private_path && public_path)) return;

  const { privateKey, publicKey } = crypto.generateKeyPairSync("rsa", {
    modulusLength: 4096,
    publicKeyEncoding: {
      type: "pkcs1",
      format: "pem",
    },
    privateKeyEncoding: {
      type: "pkcs1",
      format: "pem",
      cipher: "aes-256-cbc",
      passphrase: "",
    },
  });

  fs.writeFileSync(private_path, privateKey);
  fs.writeFileSync(public_path, publicKey);
}

function encryptRSA(toEncrypt, pubkeyPath = public_path) {
  const absolutePath = path.resolve(pubkeyPath);
  const publicKey = fs.readFileSync(absolutePath, "utf8");
  const buffer = Buffer.from(toEncrypt, "utf8");
  const encrypted = crypto.publicEncrypt(publicKey, buffer);
  return encrypted.toString("base64");
}

function decryptRSA(toDecrypt, privkeyPath = private_path) {
  const absolutePath = path.resolve(privkeyPath);
  const privateKey = fs.readFileSync(absolutePath, "utf8");
  const buffer = Buffer.from(toDecrypt, "base64");
  const decrypted = crypto.privateDecrypt(
    {
      key: privateKey.toString(),
      passphrase: "",
    },
    buffer
  );
  return decrypted.toString("utf8");
}

function encryptAES(buffer, secretKey, iv) {
  const cipher = crypto.createCipheriv("aes-256-ctr", secretKey, iv);
  const data = cipher.update(buffer);
  const encrypted = Buffer.concat([data, cipher.final()]);
  return encrypted.toString("hex");
}

function decryptAES(buffer, secretKey, iv) {
  const decipher = crypto.createDecipheriv("aes-256-ctr", secretKey, iv);
  const data = decipher.update(buffer);
  const decrpyted = Buffer.concat([data, decipher.final()]);
  return decrpyted;
}

module.exports = {
  generateKeys,
  encryptRSA,
  decryptRSA,
  encryptAES,
  decryptAES,
  crypto,
};
