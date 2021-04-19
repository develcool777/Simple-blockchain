<template>
  <router-view/>
</template>
<script>
import { mapActions } from 'vuex';
import BlockChain from '@/service/BlockChain';
import EC from 'elliptic';
export default {
  created() {
    this.init();
  },
  methods: {
    ...mapActions(['INIT_STATE']),
    init() {
      const bc = new BlockChain();
      bc.difficulty = 1;
      bc.minePendingTransactions('my-wallet-address');
      const keys = this.generateWalletKeys()
      console.log({keys});
      const obj = {
        blockchain: bc,
        chain: bc.chain,
        walletKeys: keys
      }
      this.INIT_STATE(obj);
    },
    generateWalletKeys() {
      const ec = new EC.ec('secp256k1');
      const key = ec.genKeyPair();
      return {
        keyObj: key,
        publicKey: key.getPublic('hex'),
        privateKey: key.getPrivate('hex')
      } 
    }
  }
}
</script>
