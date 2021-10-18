const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const Blockchain = require("../blockchain");
const P2pserver = require("./p2p-server");
const Wallet = require("../wallet");
const TransactionPool = require("../wallet/transaction-pool");

const wallet = new Wallet();

const transactionPool = new TransactionPool();

//get the port from the user or set a default port
const HTTP_PORT = process.env.HTTP_PORT || 3000;

//middleware
app.use(bodyParser.json());

//create a new Blockchain instance
const blockchain = new Blockchain();

//Intiate p2p server
const p2pserver = new P2pserver(blockchain);

p2pserver.listen();

app.get("/blocks", (req, res) => {
  res.json(blockchain.chain);
});

app.post("/mine", (req, res) => {
  const block = blockchain.addBlock(req.body.data);
  console.log(`New block added: ${block.toString()}`);
  p2pserver.syncChain();

  res.redirect("/blocks");
});

app.listen(HTTP_PORT, () => {
  console.log(`App listening on port ${HTTP_PORT}`);
});
