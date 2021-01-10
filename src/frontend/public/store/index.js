import Vue from 'vue'
import Vuex from 'vuex'

import artist from 'ic:canisters/artist';
import curator from 'ic:canisters/curator';

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
    }
  },
  actions: {
    async fetchSubmittedTracks({ commit }) {
      commit('TOGGLE_LOADER_ON', 'Loading data...')
      return new Promise((resolve) => {
        artist.getSubmissions().then(submissions => {
          commit('SET_TRACK_SUBMISSIONS', submissions)
          commit('TOGGLE_LOADER_OFF')
          resolve(submissions)
        });
      })
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
    async fetchSubmittedPlaylists({ commit }) {
      commit('TOGGLE_LOADER_ON', 'Loading data...')
      return new Promise((resolve) => {
        curator.getPlaylists().then(playlistSubmissions => {
          commit('SET_PLAYLIST_SUBMISSIONS', playlistSubmissions)
          commit('TOGGLE_LOADER_OFF')
          resolve(playlistSubmissions)
        });
      })
    },
    async submitPlaylist({ commit }, playlistId) {
      commit('TOGGLE_LOADER_ON', 'Storing data...')
      return new Promise((resolve) => {
        curator.qualifyPlaylist(playlistId).then(submission => {
          commit('SUBMIT_PLAYLIST', submission)
          commit('TOGGLE_LOADER_OFF')
          resolve(submission)
        })
      })
    }
  }
})
