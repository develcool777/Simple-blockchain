<template>
  <div class="addTransaction__title">Create transaction</div>
  <p class="addTransaction__text">Transfer some money to someone</p>
  <div class="addTransaction__form">
    <label for="from" class="addTransaction__label">From address</label>
    <input 
      type="text" 
      class="addTransaction__input" 
      id="from" 
      v-model="getWalletKeys[0].publicKey"
      disabled
    >
  </div>
  <div class="addTransaction__form">
    <label for="to" class="addTransaction__label">To address</label>
    <input 
      type="text" 
      class="addTransaction__input" 
      placeholder="Address..." 
      id="to" 
      v-model="to"
    >
  </div>
  <div class="addTransaction__form">
    <label for="rew" class="addTransaction__label">Amount</label>
    <input 
      type="number" 
      class="addTransaction__input" 
      placeholder="Amount..." 
      id="rew" 
      v-model="amount"
    >
  </div>
  <div class="addTransaction__btn" @click="click()">Sign and create transaction</div>
</template>

<script>
import Transaction from '@/service/Transaction';
import { mapState, mapGetters } from 'vuex';
export default {
 name: 'CreateTransaction',
  data() {
    return {
      tx: {},
      to: '',
      amount: null
    }
  },
  computed: {
    ...mapState(['bcInstance']),
    ...mapGetters(['getWalletKeys'])
  },
  created() {
    this.tx = new Transaction();
    console.log(this.getWalletKeys);
  },
  methods: {
    click() {
      this.cheakData();
      this.createTransaction();
    },
    cheakData() {
      this.tx.receiver = this.to;
      this.tx.amount = this.amount; 
    },
    createTransaction() {
      this.tx.sender = this.getWalletKeys[0].publicKey;
      this.tx.signTransaction(this.getWalletKeys[0].keyObj);
      this.bcInstance.addTransaction(this.tx);

      this.tx = new Transaction();
      this.to = '';
      this.amount = null;
    }
  }
}
</script>

<style lang="scss">
.addTransaction {
  &__title {
    font-size: rem(40);
    margin-top: rem(20);
  }
  &__text {
    font-size: rem(20);
    margin-top: rem(10);
    margin-bottom: rem(50); 
  }
  &__form {
    display: flex;
    flex-direction: column;
  }
  &__label {
    font-size: rem(20);
    margin-bottom: rem(10);
  }
  &__input {
    margin-bottom: rem(40);
    font-size: rem(16);
    padding: rem(10) 0 rem(10) rem(10);
    border: 1px solid lightgray;
    border-radius: 5px;
  }
  &__btn {
    padding: rem(10);
    font-size: rem(20);
    border-radius: 5px;
    border: 1px solid transparent;
    background: blue;
    color: white;
    cursor: pointer;
    text-align: center;
    transition-duration: .5s;
  }
  &__btn:hover {
    border-color: black;
    background: white;
    color: blue;
    border-color: blue;
  }
}
</style>