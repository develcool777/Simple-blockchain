<template>
  <div class="settings">
    <Header/>
    <div class="wrapper">
      <div class="settings__title">Settings</div>
      <div class="settings__form">
        <label for="dif" class="settings__label">Difficulty</label>
        <input 
          type="number" 
          class="settings__input" 
          :placeholder="`Current ${bcInstance.difficulty}`" 
          id="dif" 
          v-model="difficulty"
        >
      </div>
      <div class="settings__form">
        <label for="rew" class="settings__label">Mining reward</label>
        <input 
          type="number" 
          class="settings__input" 
          :placeholder="`Current ${bcInstance.miningReward}`" 
          id="rew" 
          v-model="reward"
        >
      </div>
      <div class="settings__btn" @click="save()">Save changes</div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Header from '@/layout/Header';
export default {
  name: 'Settings',
  data() {
    return {
      difficulty: null,
      reward: null,
    }
  },
  components: {
    Header
  },
  computed: {
    ...mapState(['bcInstance'])
  },
  methods: {
    save() {
      if (this.reward !== null) {
        this.bcInstance.miningReward = +this.reward;
      }
      if (this.difficulty !== null) {
        this.bcInstance.difficulty = +this.difficulty;
      }
      this.reward = null;
      this.difficulty = null;
    }
  },
}
</script>
<style lang="scss">
.settings {
  &__title {
    font-size: rem(40);
    margin-top: rem(20);
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
.wrapper {
  max-width: rem(1300);
  width: 100%;
  margin: 0 auto;
}
</style>