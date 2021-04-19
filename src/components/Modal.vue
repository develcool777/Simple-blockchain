<template>
	<transition name="fade">
		<div class="modal" >
			<div class="mask"/>
			<div class="result center">
				<div class="result__title">{{ result }}</div>
        <router-link 
          class="result__btn" 
          tag="div"
          :to="to"
          @click="close()"
        >{{ btn }}</router-link>
			</div>
		</div>
	</transition>
</template>
<script>
import { mapActions } from 'vuex'
export default {
	name: "Modal",
  props: {
    result: String,
    btn: String,
    to: String
  },
	data() {
		return {
			width: 400,
		}
	},
	computed: {
	},
	methods: {
		...mapActions(['CHANGE_SHOW_MODAL']),
    close() {
      this.CHANGE_SHOW_MODAL(false);
    }
	}
}
</script>
<style lang="scss">
.result {
	display: flex;
	align-items: center;
	flex-direction: column;
	justify-content: space-around;
	width: rem(500);
	height: rem(350);
	background-color: $white;
	border-radius: rem(10);
	z-index: $modalContent;
	&__title {
		font-size: rem(50);
    text-align: center;
	}
	&__btn {
		padding: rem(10) rem(20);
		border-radius: rem(10);
    border: 1px solid transparent;
		color: $white;
		background: blue;
		cursor: pointer;
		transition-duration: .5s;
    text-decoration: none;
	}
	&__btn:hover {
		background: white;
    border-color: blue;
    color: blue;
	}
}
</style>