const Transaction = require('./Transaction');
const BlockChain = require('./BlockChain');
const EC = require('elliptic').ec;

const ec = new EC('secp256k1');
const mykey = ec.keyFromPrivate('d2120edbdf7ac02405a84f3a604d29466ebe3b20d130513a2ec6aba72272ca7f');
const myWalletAddress = mykey.getPublic('hex');

const bc = new BlockChain();
const tx1 = new Transaction(myWalletAddress, 'public key goes here', 10);
tx1.signTransaction(mykey);
bc.addTransaction(tx1);



console.log('Starting the miner');
bc.minePendingTransactions(myWalletAddress);

console.log('Balance is', bc.getBalanceOfAddress(myWalletAddress));

// console.log('Starting the miner');
// bc.minePendingTransactions('my-address');

// console.log('Balance is', bc.getBalanceOfAddress('my-address'));


// bc.chain[1].transactions[0].amount = 1;


console.log('valid', bc.isChainValid());
// bc.showBlockChain(3);
// console.log('Properties:', bc.chain);
console.log(JSON.stringify(bc, null, 4));
