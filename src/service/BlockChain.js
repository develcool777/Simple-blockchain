import Block from './Block';
import Transaction from './Transaction';

export default class BlockChain {
  constructor() {
    const chain = [this.createGenesisBlock()];
    let difficulty = 2;
    let pendingTransactions = [];
    let miningReward = 100;
    Object.defineProperties(this, {
      chain: {
        get: () => chain,
        enumerable: true
      },
      difficulty: {
        get: () => difficulty,
        set: (value) => {
          if (!Number.isInteger(value)) {
            throw Error(`difficulty.set value must be Integer`);
          }
          difficulty = value;
        },
        enumerable: true
      },
      pendingTransactions: {
        get: () => pendingTransactions,
        set: (arr) => {
          if (!Array.isArray(arr)) {
            throw Error(`pendingTransactions.set arr must Array`);
          }
          pendingTransactions = arr;
        },
        enumerable: true
      },
      miningReward: {
        get: () => miningReward,
        set: (value) => {
          if (typeof value !== 'number') {
            throw Error(`miningReward.set() value must be number`);
          }
          miningReward = value;
        },
        enumerable: true
      },
    })
    Object.freeze(this);
  }
  createGenesisBlock() {
    return new Block(1618821636950, [], '0')
  }

  getLatestBlock() {
    return this.chain[this.chain.length - 1];
  }

  getBlockByIndex(index) {
    if (index < 0 || index > this.chain.length - 1) {
      throw Error(`getBlockByIndex index-${index} must be in range of chain`);
    }
    return this.chain[index];
  }

  minePendingTransactions(miningRewardAddress) {
    const rewardTx = new Transaction(null, miningRewardAddress, this.miningReward);
    this.pendingTransactions.push(rewardTx);
    let block = new Block(Date.now(), this.pendingTransactions, this.getLatestBlock().hash);
    block.mineBlock(this.difficulty);
    console.log('Block mined');
    this.chain.push(block);
    this.pendingTransactions = [];
  }

  addTransaction(transaction) {
    if (!transaction.sender || !transaction.receiver) {
      throw Error(`BlockChain.addTransaction() transaction must include from and to adress`);
    }
    if (!transaction.isValid()) {
      throw Error(`BlockChain.addTransaction() cannot add invalid transaction to chain`);
    }
    this.pendingTransactions.push(transaction);
  }

  getBalanceOfAddress(address) {
    let balance = 0;
    this.chain.forEach((block, index) => {
      if (index < 1) { return }
      block.transactions.forEach(transaction => {
        if (transaction.sender === address) {
          balance -= transaction.amount;
        }
        if (transaction.receiver === address) {
          balance += transaction.amount;
        }
      })
    })
    return balance;
  }

  isChainValid() {
    for (let i = 1; i < this.chain.length; i++) {
      const currentBlock = this.chain[i];
      const prevBlock = this.chain[i - 1];
      if(!currentBlock.hasValidTransactions()) {
        return false;
      }
      if (currentBlock.hash !== currentBlock.calculateHash()) {
        return false;
      }
      if (currentBlock.previousHash !== prevBlock.hash) {
        return false;
      }
    }
    return true;
  }
}