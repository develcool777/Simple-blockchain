<template>
  <div class="transaction">
    <Header/>
    <div class="wrapper">
      <CreateTransaction v-if="id === 0"/>
      <PendingTransaction  v-if="id === 1"/>
    </div>
  </div>
</template>

<script>
import Header from '@/layout/Header';
import CreateTransaction from '@/layout/CreateTransaction';
import PendingTransaction from '@/layout/PendingTransaction';
export default {
  name: 'Transaction',
  components: {
    Header,
    CreateTransaction,
    PendingTransaction
  },
  props: {
    id: Number
  }
}
</script>

<style lang="scss">
.wrapper {
  max-width: rem(1300);
  width: 100%;
  margin: 0 auto;
}
</style>