<template>
  <div class="block">
    <div class="block__cell">
      <div class="block__headTitle">
        Block 
        <span class="block__headTitle block__headTitle--span" v-if="block.previousHash === '0'">(Genesis block)</span>
      </div>
    </div>
    <div class="block__cell">
      <div class="block__title">Hash</div>
      <div class="block__hash" :style="{color: colors[id]}">{{ block.hash }}</div>
      <br>
      <div class="block__title">Hash of previous block</div>
      <div class="block__hash" :style="{color: id === 0 ? 'black' : colors[id - 1]}">{{ block.previousHash }}</div>
    </div>
    <div class="block__cell">
      <div class="block__title">Nonce</div>
      <div class="block__data">{{ block.nonce }}</div>
    </div>
    <div class="block__cell">
      <div class="block__title">Timestamp</div>
      <div class="block__data">{{ block.timeStamp }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Block',
  props: {
    block: Object,
    id: Number
  },
  data() {
    return {
      colors: ['purple', 'green', 'pink', 'blue', 'red']
    }
  }
}
</script>

<style lang="scss">
.block {
  margin: rem(10);
  width: rem(400);
  border: 1px solid gray;
  border-radius: 5px;
  &__cell {
    padding: rem(20);
  }
  &__cell:not(:last-child) {
    border-bottom: 1px solid gray;
  }
  &__headTitle {
    font-weight: 700;
    font-size: rem(25);
    padding: rem(10) 0;
    &--span {
      font-weight: 200;
      color: gray;
      font-size: rem(20);
    }
  }
  &__title {
    font-size: rem(20);
    margin-bottom: rem(10);
  }
  &__hash {
    font-size: rem(16);
    max-width: rem(360);
    text-overflow: ellipsis;
    overflow: hidden;
  }
  &__data {
    font-size: rem(16);
    color: gray;
  }
}
</style>