<template>
  <div class="pendingTransaction">
    <div class="pendingTransaction__title">Pending transactions</div>
    <Table :transactions="getPendingTransactions"/>
    <div class="pendingTransaction__btn" @click="minePendingTransactions()">Start mining</div>
  </div>
  <Modal 
    v-if="getShowModal" 
    :result="`Block has been created`" 
    :btn="`Blockchain`"
    :to="`/`"
  />
</template>

<script>
import Modal from '@/components/Modal';
import Table from '@/components/Table';
import { mapState, mapGetters, mapActions } from 'vuex';
export default {
  name: 'PendingTransaction',
  components: {
    Table,
    Modal
  },
  computed: {
    ...mapState(['bcInstance']),
    ...mapGetters(['getWalletKeys', 'getShowModal']),
    getPendingTransactions() {
      return this.bcInstance.pendingTransactions;
    }
  },
  methods: {
    ...mapActions(['CHANGE_SHOW_MODAL']),
    minePendingTransactions() {
      this.bcInstance.minePendingTransactions(
        this.getWalletKeys[0].publicKey
      );
      this.CHANGE_SHOW_MODAL(true);
    }
  }
}
</script>

<style lang="scss">
.pendingTransaction {
  &__title {
    font-size: rem(40);
    margin-top: rem(20);
    margin-bottom: rem(50);
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