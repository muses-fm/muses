import Vue from 'vue'
import Vuex from 'vuex'

import artist from 'ic:canisters/artist';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loading: {
      enabled: false,
      text: ''
    },
    trackSubmissions: [],
    playlistSubmissions: []
  },
  getters: {},
  mutations: {
    TOGGLE_LOADER_ON (state, text='') {
      state.loading.enabled = true
      state.loading.text = text
    },
    TOGGLE_LOADER_OFF (state) {
      state.loading.enabled = false
      state.loading.text = ''
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
      commit('TOGGLE_LOADER_ON', 'Loading data...')
      return new Promise((resolve) => {
        artist.getSubmissions().then(submissions => {
          commit('SET_SUBMISSIONS', submissions)
          commit('TOGGLE_LOADER_OFF')
          resolve(submissions)
        });
      })
    },
    async submitTrack({ commit }, trackUrl) {
      commit('TOGGLE_LOADER_ON', 'Storing data...')
      return new Promise((resolve) => {
        artist.submitTrack(trackUrl).then(submission => {
          commit('SUBMIT_TRACK', submission)
          commit('TOGGLE_LOADER_OFF')
          resolve(submission)
        })
      })
    }
  }
})
