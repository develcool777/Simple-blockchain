const SHA256 = require('crypto-js/sha256');
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');

export default class Transaction {
  constructor(sender='', receiver='', amount=1) {
    if (typeof amount !== 'number') {
      throw Error(`Transaction.constuctor amount must be Number`);
    }
    if (amount < 0) {
      throw Error(`Transaction.constuctor amount must be positive number`);
    }
    let signature = '';
    let timeStamp = Date.now();
    Object.defineProperties(this, {
      sender: {
        get: () => sender,
        set: (value) => sender = value,
        enumerable: true
      },
      receiver: {
        get: () => receiver,
        set: (value) => receiver = value,
        enumerable: true
      },
      amount: {
        get: () => amount,
        set: (value) => amount = value,
        enumerable: true
      },
      timeStamp: {
        get: () => timeStamp,
        set: (value) => timeStamp = value,
        enumerable: true
      },
      signature: {
        get: () => signature,
        set: (value) => {
          if (typeof value !== 'string') {
            throw Error(`signature.set() value must be string`);
          }
          signature = value
        },
        enumerable: true
      }
    })
  }

  calculateHash() {
    return SHA256(this.sender + this.receiver + this.amount + this.timeStamp).toString();
  }

  signTransaction(signingKey) {
    if (signingKey.getPublic('hex') !== this.sender) {
      throw Error(`Transaction.signTransaction() cannot sign transactions for other wallets`);
    }
    const hashTx = this.calculateHash();
    const sig = signingKey.sign(hashTx, 'base64');
    this.signature = sig.toDER('hex');
  }

  isValid() {
    if (this.sender === null) {
      return true;
    }
    if (!this.signature || this.signature.length === 0) {
      throw Error(`Transaction.isValid() no signature in this transaction`);
    }
    const publicKey = ec.keyFromPublic(this.sender, 'hex');
    return publicKey.verify(this.calculateHash(), this.signature)
  }
}