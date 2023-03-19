const { create } = require("ipfs-http-client");
const fileUpload = require("express-fileupload");

const client = create(
  `/ip4/${process.env.IPFS_HOST}/tcp/${process.env.IPFS_PORT}`
);

var express = require("express");
var router = express.Router();
router.use(fileUpload());

router.post("/upload", async (req, res, next) => {
  if (!req.files) {
    res.send("File was not found");
    return;
  }

  const file = req.files.data;

  console.log(file.data);

  const uploaded = await client.add(file.data);

  res.send(uploaded);
});

router.get("/retrieve", async (req, res, next) => {
  if (!req.query.cid) {
    res.send("No cid provided");
  }

  const cid = req.query.cid;

  const stream = client.cat(cid);
  const decoder = new TextDecoder();
  let data = "";

  for await (const chunk of stream) {
    // chunks of data are returned as a Uint8Array, convert it back to a string
    data += decoder.decode(chunk, { stream: true });
  }

  res.end(data);
});

router.get("/", async (req, res, next) => {
  res.render("index", { title: "ipfs" });
});

module.exports = router;
