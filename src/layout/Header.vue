<template>
  <div class="header">
    <router-link 
      class="header__logo" 
      tag="div" 
      to="/"
    >BlockChain</router-link>
    <nav class="header__menu">
      <router-link 
        class="header__link" 
        tag="div" 
        v-for="(item, i) in menu" 
        :key="i" 
        :to="item.path"
      >{{ item.name }}</router-link>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'Header',
  data() {
    return {
      menu: [
        { name: 'Settings', path: '/settings' },
        { name: 'Create transaction', path: '/create-transaction' },
        { name: 'Pending transaction', path: '/pending-transaction' },
      ]
    }
  }
}
</script>

<style lang="scss">
.header {
  padding: rem(25) rem(20);
  background: $dark;
  @include Flex(space-between);
  &__logo, &__link {
    color: $white;
    text-decoration: none;
    font-size: rem(20);
    transition-duration: .5s;
  }
  &__link {
    padding: rem(10) rem(20);
    margin: 0 rem(20);
    border: 1px solid white;
    border-radius: rem(10);
  }
  &__link:hover {
    color: black;
    background: white;
  }
}
</style>