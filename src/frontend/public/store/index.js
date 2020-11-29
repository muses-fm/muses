import Vue from 'vue'
import Vuex from 'vuex'

import artist from 'ic:canisters/artist';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loading: false,
    submissions: []
  },
  getters: {},
  mutations: {
    TOGGLE_LOADER (state, toggle) {
      state.loading = toggle
    },
    SET_SUBMISSIONS(state, submissions) {
      state.submissions = submissions
    },
    SUBMIT_TRACK(state, submission) {
      state.submissions.push(submission)
    }
  },
  actions: {
    async fetchSubmissions({ commit }) {
      commit('TOGGLE_LOADER', true)
      return new Promise((resolve) => {
        artist.getSubmissions().then(submissions => {
          commit('SET_SUBMISSIONS', submissions)
          commit('TOGGLE_LOADER', false)
          resolve(submissions)
        });
      })
    },
    async submitTrack({ commit }, trackUrl) {
      commit('TOGGLE_LOADER', true)
      return new Promise((resolve) => {
        artist.submitTrack(trackUrl).then(submission => {
          commit('SUBMIT_TRACK', submission)
          commit('TOGGLE_LOADER', false)
          resolve(submission)
        })
      })
    }
  }
})
