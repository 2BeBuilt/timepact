const {
  HttpJsonRpcConnector,
  MetamaskSnapHelper,
  LotusClient,
} = require("filecoin.js");

const LOTUS_RPC_ENDPOINT = `${process.env.LOTUS_PROTOCOL}://lotus:${process.env.LOTUS_PORT}/rpc/v0`;

const httpConnector = new HttpJsonRpcConnector({
  url: LOTUS_RPC_ENDPOINT,
  token: process.env.LOTUS_AUTH_TOKEN,
});
const lotusClient = new LotusClient(httpConnector);

var express = require("express");
var router = express.Router();

router.get("/", async (req, res, next) => {
  console.log(lotusClient.auth);
  res.render("index", { title: "deals" });
});

router.get("/getVer", async (req, res, next) => {
  res.send(await lotusClient.common.version());
});

router.get("/getDeals", async (req, res, next) => {
  res.send(await lotusClient.client.listDeals());
});

router.get("/find", async (req, res, next) => {
  if (!req.query.cid || !req.query.pieceCid) {
    res.send("No cid provided");
  }

  const cid = req.query.cid;
  const pieceCid = req.query.pieceCid;

  console.log(cid, pieceCid);

  res.send(await lotusClient.client.findData(cid, pieceCid));
});

module.exports = router;
