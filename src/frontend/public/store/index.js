import Vue from 'vue'
import Vuex from 'vuex'

import artist from 'ic:canisters/artist';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    submissions: []
  },
  getters: {},
  mutations: {
    SET_SUBMISSIONS(state, submissions) {
      state.submissions = submissions
    }
  },
  actions: {
    async fetchSubmissions({ commit }) {
      return new Promise((resolve) => {
        artist.getAll().then(submissions => {
          commit('SET_SUBMISSIONS', submissions)
          resolve(submissions)
        });
      })
    }
  }
})
