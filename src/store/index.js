import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    playing: {},
    playingList: [],
    follow: 0,
    br: 320000
  },
  mutations: {
    intoplaying (state, intoPlaying) {
      state.playing = intoPlaying
    },
    publishList (state, tracks) {
      state.playingList = tracks
    },
    followCount (state, count) {
      state.follow = count
    },
    changeBr (state, br) {
      state.br = br
    }
  },
  actions: {
  },
  modules: {
  }
})

export default store
