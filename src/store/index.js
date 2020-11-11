import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    playing: {},
    playingList: {},
    code: 1
  },
  mutations: {
    intoplaying (state, intoPlaying) {
      state.playing = intoPlaying
    },
    publishList (state, tracks) {
      state.playingList = tracks
    },
    refresh (state, code) {
      state.code = code
    }
  },
  actions: {
  },
  modules: {
  }
})

export default store
