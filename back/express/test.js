const { HttpJsonRpcConnector, LotusClient } = require("filecoin.js");

const express = require("express");
const app = express();
const port = process.env.EXPRESS_PORT;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

console.log(process.env.LOTUS_RPC_ENDPOINT);
console.log(process.env.LOTUS_AUTH_TOKEN);

app.get("/lotus-version", (req, res) => {
  (async () => {
    const httpConnector = new HttpJsonRpcConnector({
      url: process.env.LOTUS_RPC_ENDPOINT,
    });

    const lotusClient = new LotusClient(httpConnector);
    const version = await lotusClient.common.version();
    return version;
  })()
    .then()
    .catch();
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
