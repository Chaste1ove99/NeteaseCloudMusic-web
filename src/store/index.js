import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    playing: {},
    playingList: {}
  },
  mutations: {
    intoplaying (state, intoPlaying) {
      state.playing = intoPlaying
    },
    publishList (state, tracks) {
      state.playingList = tracks
    }
  },
  actions: {
  },
  modules: {
  }
})

export default store
