<template>
  <div class="bchain">
    <h1 class="bchain__title">Blocks on chain</h1>
    <p class="bchain__text">Each card represents a block on a chain. Click on a block to see</p>
    <div class="wrapper">
      <div class="bchain__blocks">
        <Block 
          v-for="(block, i) in getChain" 
          :key="i" 
          :block="block"
          :id="i"
          @click="currentBlock = i"
          :style="{borderColor: currentBlock === i ? 'blue' : none}"
        />
      </div>
      <div class="bchain__title bchain__title--transactions">Transactions inside block {{ currentBlock + 1 }}</div>
      <Table :transactions="getChain[currentBlock].transactions"/>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex';
import Block from '@/components/Block';
import Table from '@/components/Table';
export default {
  name: 'BlockChain',
  components: {
    Block,
    Table
  },
  data() {
    return {
      currentBlock: 0
    }
  },
  computed: {
    ...mapGetters(['getChain']),
    ...mapState(['bcInstance'])
  },
  created() {
    console.log(this.bcInstance);
  }
}
</script>

<style lang="scss">
.bchain {
  &__title, &__text {
    text-align: center;
  }
  &__title {
    font-size: rem(40);
    font-weight: 600;
    margin-top: rem(20);
    &--transactions {
      text-align: left;
    }
  }
  &__text {
    font-size: rem(20);
    margin-bottom: rem(20);
  }
  &__blocks {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    margin-bottom: rem(50);
  }
}
.wrapper {
  max-width: rem(1300);
  width: 100%;
  margin: 0 auto;
}
</style>