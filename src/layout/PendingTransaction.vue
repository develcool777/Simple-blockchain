<template>
  <div class="pendingTransaction">
    <div class="pendingTransaction__title">Pending transactions</div>
    <Table :transactions="getPendingTransactions"/>
    <div class="pendingTransaction__btn" @click="minePendingTransactions()">Start mining</div>
  </div>
</template>

<script>
import Table from '@/components/Table'
import { mapState, mapGetters } from 'vuex';
export default {
  name: 'PendingTransaction',
  components: {
    Table
  },
  computed: {
    ...mapState(['bcInstance']),
    ...mapGetters(['getWalletKeys']),
    getPendingTransactions() {
      return this.bcInstance.pendingTransactions;
    }
  },
  methods: {
    minePendingTransactions() {
      this.bcInstance.minePendingTransactions(
        this.getWalletKeys[0].publicKey
      );
    }
  }
}
</script>

<style lang="scss">
.pendingTransaction {
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