<template>
  <div class="home">
    <Header/>
    <BlockChain/>
  </div>
</template>

<script>
import Header from '@/layout/Header';
import BlockChain from '@/layout/BlockChain';
export default {
  name: 'Home',
  components: {
    Header,
    BlockChain
  }
}
</script>
