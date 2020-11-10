import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    ListID: '',
    playing: {},
    playingList: {}
  },
  mutations: {
    getListID (state, id) {
      state.ListID = id
    },
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
