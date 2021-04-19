import { createStore } from 'vuex'

export default createStore({
  state: {
    bcInstance: {},
    chain: [],
    walletKeys: [],
    showModal: false
  },
  getters: {
    getBcInstance: state => state.bcInstance,
    getChain: state => state.chain,
    getWalletKeys: state => state.walletKeys,
    getShowModal: state => state.showModal
  },
  mutations: {
    setBcInstance(state, instance) {
      state.bcInstance = instance;
    },
    setChain(state, arr) {
      state.chain = arr;
    },
    setWalletKeys(state, arr=[]) {
      state.walletKeys = arr;
    },
    addWalletKeys(state, obj) {
      state.walletKeys.push(obj);
    },
    changeShowModal(state, boolean) {
      state.showModal = boolean;
    }  
  },
  actions: {
    INIT_STATE({commit}, payload) {
      commit('setBcInstance', payload.blockchain);
      commit('setChain', payload.chain);
      commit('setWalletKeys', []);
      commit('addWalletKeys', payload.walletKeys);
      commit('changeShowModal', false);
    },
    SET_CHAIN({commit}, array) {
      commit('setChain', array);
    },
    SET_WALLETS_KEYS({commit}, array) {
      commit('setWalletKeys', array);
    },
    CHANGE_SHOW_MODAL({commit}, boolean) {
      commit('changeShowModal', boolean);
    }
  }
})
