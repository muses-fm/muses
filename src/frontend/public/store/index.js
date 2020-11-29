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
    },
    SUBMIT_TRACK(state, submission) {
      state.submissions.push(submission)
    }
  },
  actions: {
    async fetchSubmissions({ commit }) {
      return new Promise((resolve) => {
        artist.getSubmissions().then(submissions => {
          commit('SET_SUBMISSIONS', submissions)
          resolve(submissions)
        });
      })
    },
    async submitTrack({ commit }, trackUrl) {
      return new Promise((resolve) => {
        artist.submitTrack(trackUrl).then(submission => {
          commit('SUBMIT_TRACK', submission)
          resolve(submission)
        })
      })
    }
  }
})
