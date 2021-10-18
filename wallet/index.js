const { INITIAL_BALANCE } = require("../config");
const ChainUtil = require("../chain-utils");
const Transaction = require("./transaction");

class Wallet {
  constructor() {
    this.balance = INITIAL_BALANCE;
    this.keyPair = ChainUtil.genKeyPair();
    this.publicKey = this.keyPair.getPublic().encode("hex");
  }

  toString() {
    return ` Wallet -
          publicKey: ${this.publicKey}
          balance  : ${this.balance}
          `;
  }

  sign(dataHash) {
    return this.keyPair.sign(dataHash);
  }

  createTransaction(recepient, amount, transactionPool) {
    if (amount > this.balance) {
      console.log(
        `Amount: ${amount} exceeds the current balance: ${this.balance}`
      );
    }
    console.log(transactionPool);
    console.log(typeof transactionPool);

    let transaction = transactionPool.existingTransaction(this.publicKey);

    if (transaction) {
      transaction.update(this, recepient, amount);
    } else {
      transaction = Transaction.newTransaction(this, recepient, amount);
      transactionPool.updateOrAddTransaction(transaction);
    }

    return transaction;
  }
}

module.exports = Wallet;
