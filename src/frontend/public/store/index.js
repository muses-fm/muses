import Vue from 'vue'
import Vuex from 'vuex'

import artist from 'ic:canisters/artist';
import curator from 'ic:canisters/curator';
import config from '../config.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    status: config.statuses.UNINITIALIZED,
    loading: {
      enabled: false,
      text: ''
    },
    trackSubmissions: [],
    playlistSubmissions: [],
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
    SET_TRACK_SUBMISSIONS(state, trackSubmissions) {
      state.trackSubmissions = trackSubmissions
    },
    SET_PLAYLIST_SUBMISSIONS(state, playlists) {
      state.playlistSubmissions = playlists
    },
    SUBMIT_TRACK(state, submission) {
      state.trackSubmissions.push(submission)
    },
    SUBMIT_PLAYLIST(state, submission) {
      state.playlistSubmissions.push(submission)
    },
    COMPONENT_WAS_RENDERED(state, componentName) {
      state.componentWasRendered[componentName] = true
    },
    SET_STATUS(state, status) {
      state.status = status
    }
  },
  actions: {
    async initializeAppWithDataFromIC({ commit }) {
      commit('SET_STATUS', config.statuses.INITIALIZING)

      const submissions = await artist.getSubmissions()
      if (submissions.length > 0) {
        commit('SET_TRACK_SUBMISSIONS', submissions)
      }

      const playlistSubmissions = await curator.getPlaylists()
      if (playlistSubmissions.length > 0) {
        commit('SET_PLAYLIST_SUBMISSIONS', playlistSubmissions)
      }

      commit('SET_STATUS', config.statuses.INITIALIZED)
    },
    async submitTrack({ commit }, trackId) {
      commit('TOGGLE_LOADER_ON', 'Storing data...')
      return new Promise((resolve) => {
        artist.submitTrack(trackId).then(submission => {
          commit('SUBMIT_TRACK', submission)
          commit('TOGGLE_LOADER_OFF')
          resolve(submission)
        })
      })
    },
    async submitPlaylist({ commit }, playlistId) {
      commit('TOGGLE_LOADER_ON', 'Storing data...')
      return new Promise((resolve) => {
        curator.qualifyPlaylist(playlistId).then(submission => {
          // TODO: Find out why returned value is an array with 1 element
          if (submission && submission.length > 0){
            commit('SUBMIT_PLAYLIST', submission[0])
          }
          commit('TOGGLE_LOADER_OFF')
          resolve(submission)
        })
      })
    }
  }
})
