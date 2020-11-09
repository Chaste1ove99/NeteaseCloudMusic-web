import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    ListID: ''
  },
  mutations: {
    getListID (state, id) {
      state.ListID = id
    }
  },
  actions: {
  },
  modules: {
  }
})

export default store
