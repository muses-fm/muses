import Vue from 'vue'
import Vuex from 'vuex'

import config from '../config.js'

let artist;
let curator;
let online;

try {
  artist = require('ic:canisters/artist')
  curator = require('ic:canisters/curator')
  online = true
} catch (error) {
  online = false
  console.warn('RUNNING IN OFFLINE MODE')
}

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
    inbox: []
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
    SET_INBOX(state, inbox) {
      state.inbox = inbox
    },
    SET_STATUS(state, status) {
      state.status = status
    },
    REVIEW(state, review) {
      state.inbox = state.inbox.filter(submission => submission.id.toString() !== review.submissionId.toString())
    }
  },
  actions: {
    async initializeAppWithDataFromIC({ dispatch, commit }) {
      commit('SET_STATUS', config.statuses.INITIALIZING)

      const submissions = online ? await artist.getSubmissions() : [{id: 'test submission'}]
      if (submissions.length > 0) {
        commit('SET_TRACK_SUBMISSIONS', submissions)
      }

      const playlistSubmissions = online ? await curator.getPlaylists() : [{id: 'test playlist'}]
      if (playlistSubmissions.length > 0) {
        commit('SET_PLAYLIST_SUBMISSIONS', playlistSubmissions)
      }

      await dispatch('getPendingSubmissions')
      commit('SET_STATUS', config.statuses.INITIALIZED)
    },
    async submitTrack({ dispatch, commit }, trackId) {
      commit('TOGGLE_LOADER_ON', 'Storing track...')

      const submission = online ? await artist.submitTrack(trackId) : [{id: '1', spotifyTrackId: 'test'}]
      dispatch('getPendingSubmissions')
      commit('SUBMIT_TRACK', submission)

      commit('TOGGLE_LOADER_OFF')
      return submission
    },
    async submitPlaylist({ commit }, playlistId) {
      commit('TOGGLE_LOADER_ON', 'Storing playlist...')

      const submission = online ? await curator.qualifyPlaylist(playlistId) : [{id: '1', spotifyPlaylistId: 'test'}]
      // TODO: Find out why returned value is an array with 1 element
      if (submission && submission.length > 0){
        commit('SUBMIT_PLAYLIST', submission[0])
      }

      commit('TOGGLE_LOADER_OFF')
      return submission[0]
    },
    async getPendingSubmissions({ commit }) {
      const submissionIds = online ? await curator.getPendingSubmissions() : [{id: 'id1'}, {id: 'id2'}]
      const inbox = []
      for (let i = 0; i < submissionIds.length; i++) {
        const submission = online ? await artist.getSubmission(submissionIds[i]) : {id: 'id1', spotifyTrackId: 'lalala'}
        // TODO: Find out why returned value is an array with 1 element
        if (submission && submission.length > 0){
          inbox.push(submission[0])
        }
      }
      if (inbox.length > 0) {
        commit('SET_INBOX', inbox)
      }
    },
    async review({ commit }, { submissionId, feedback, playlistId }) {
      commit('TOGGLE_LOADER_ON', 'Submitting review...')

      if (online) {
        const review = await curator.reviewSubmission(submissionId, feedback, playlistId)
        // TODO: Find out why returned value is an array with 1 element
        commit('REVIEW', review[0])
      }

      commit('TOGGLE_LOADER_OFF')
    }
  }
})
