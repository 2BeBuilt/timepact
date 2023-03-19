const { HttpJsonRpcConnector, LotusClient } = require("filecoin.js");

const httpConnector = new HttpJsonRpcConnector({
  url: `${process.env.LOTUS_PROTOCOL}://${process.env.LOTUS_HOST}:${process.env.LOTUS_PORT}/rpc/v0`,
  token: process.env.LOTUS_AUTH_TOKEN,
});
const lotusClient = new LotusClient(httpConnector);

var express = require("express");
var router = express.Router();

router.get("/", async (req, res, next) => {
  res.render("index", { title: "deals" });
});

router.get("/getVer", async (req, res, next) => {
  console.log(req.query.dealCID);
  res.send(await lotusClient.common.version());
});

router.get("/getDeals", async (req, res, next) => {
  console.log(req.query.dealCID);
  res.send(await lotusClient.client.listDeals());
});

router.get("/genCar", async (req, res, next) => {
  res.send(await lotusClient.client.genCar({}));
});

module.exports = router;
