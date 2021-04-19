const SHA256 = require('crypto-js/sha256');
export default  class Block {
  constructor(timeStamp, transactions, previousHash=''){
    if (!Array.isArray(transactions)) {
      throw Error(`Block.constructor transactions must be type of Array`);
    }
    if (typeof previousHash !== 'string') {
      throw Error(`Block.constructor previousHash must be type of String`);
    }
    let hash = this.calculateHash();
    let nonce = 0;
    Object.defineProperties(this, {
      previousHash: {
        get: () => previousHash,
        set: (value) => {
          if (typeof value !== 'string') {
            console.log(value);
            throw Error(`previousHash.set value must be type of String`);
          }
          previousHash = value;
        },
        enumerable: true
      },
      timeStamp: {
        get: () => timeStamp,
        set: (value) => {
          if (typeof value !== 'string') {
            console.log(value);
            throw Error(`timeStamp.set value must be type of String`);
          }
          timeStamp = value;
        },
        enumerable: true
      },
      transactions: {
        get: () => transactions,
        set: (value) => {
          if (!Array.isArray(value)) {
            throw Error(`transactions.set() value must be type of Array`);
          }
          transactions = value
        },
        enumerable: true
      },
      hash: {
        get: () => hash,
        set: (value) => {
          if (typeof value !== 'string') {
            throw Error(`hash.set value must be type of String`);
          }
          hash = value;
        },
        enumerable: true
      },
      nonce: {
        get: () => nonce,
        set: (value) => {
          if (!Number.isInteger(value)) {
            throw Error(`nonce.set value must be Integer`);
          }
          nonce = value;
        },
        enumerable: true
      }
    })
  }
  calculateHash() {
    return SHA256(this.previousHash + this.timeStamp + JSON.stringify(this.transactions) + this.nonce).toString();
  }

  mineBlock(difficulty) {
    while(this.hash.substring(0, difficulty) !== Array(difficulty + 1).join('0')) {
      this.nonce++
      this.hash = this.calculateHash();
    }
  } 

  hasValidTransactions() {
    this.transactions.forEach(transaction => {
      if (!transaction.isValid()) {
        return false;
      }
    })
    return true;
  }
}