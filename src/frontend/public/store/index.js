import Vue from 'vue'
import Vuex from 'vuex'

import artist from 'ic:canisters/artist';  // TO COMMENT OUT WHEN RUNNING DEV SERVER
import curator from 'ic:canisters/curator';  // TO COMMENT OUT WHEN RUNNING DEV SERVER
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
    }
  },
  actions: {
    async initializeAppWithDataFromIC({ dispatch, commit }) {
      commit('SET_STATUS', config.statuses.INITIALIZING)

      const submissions = await artist.getSubmissions()  // TO COMMENT OUT WHEN RUNNING DEV SERVER
      // const submissions = [{id: 'test submission'}]  // TO UNCOMMENT WHEN RUNNING DEV SERVER
      if (submissions.length > 0) {
        commit('SET_TRACK_SUBMISSIONS', submissions)
      }

      const playlistSubmissions = await curator.getPlaylists()  // TO COMMENT OUT WHEN RUNNING DEV SERVER
      // const playlistSubmissions = [{id: 'test playlist'}]  // TO UNCOMMENT WHEN RUNNING DEV SERVER
      if (playlistSubmissions.length > 0) {
        commit('SET_PLAYLIST_SUBMISSIONS', playlistSubmissions)
      }

      await dispatch('getPendingSubmissions')

      commit('SET_STATUS', config.statuses.INITIALIZED)
    },
    async submitTrack({ dispatch, commit }, trackId) {
      commit('TOGGLE_LOADER_ON', 'Storing data...')
      return new Promise((resolve) => {
        artist.submitTrack(trackId).then(submission => {  // TO COMMENT OUT WHEN RUNNING DEV SERVER
          // const submission = 'testtracksubmission'  // TO UNCOMMENT WHEN RUNNING DEV SERVER

          dispatch('getPendingSubmissions')

          commit('SUBMIT_TRACK', submission)
          commit('TOGGLE_LOADER_OFF')
          resolve(submission)
        })  // TO COMMENT OUT WHEN RUNNING DEV SERVER
      })
    },
    async submitPlaylist({ commit }, playlistId) {
      commit('TOGGLE_LOADER_ON', 'Storing data...')
      return new Promise((resolve) => {
        curator.qualifyPlaylist(playlistId).then(submission => {  // TO COMMENT OUT WHEN RUNNING DEV SERVER
          // const submission = ['testplaylistsubmission']  // TO UNCOMMENT WHEN RUNNING DEV SERVER
          // TODO: Find out why returned value is an array with 1 element
          if (submission && submission.length > 0){
            commit('SUBMIT_PLAYLIST', submission[0])
          }
          commit('TOGGLE_LOADER_OFF')
          resolve(submission)
        })  // TO COMMENT OUT WHEN RUNNING DEV SERVER
      })
    },
    async getPendingSubmissions({ commit }) {
      const submissionIds = await curator.getPendingSubmissions()  // TO COMMENT OUT WHEN RUNNING DEV SERVER
      // const submissionIds = [{id: 'id1'}, {id: 'id2'}]  // TO UNCOMMENT WHEN RUNNING DEV SERVER

      const inbox = []

      for (let i = 0; i < submissionIds.length; i++) {
        const submission = await artist.getSubmission(submissionIds[i]);  // TO COMMENT OUT WHEN RUNNING DEV SERVER
        // const submission = {id: 'id1', spotifyTrackId: 'lalala'}  // TO UNCOMMENT WHEN RUNNING DEV SERVER

        // TODO: Find out why returned value is an array with 1 element
        if (submission && submission.length > 0){
          inbox.push(submission[0])
        }
      }

      if (inbox.length > 0) {
        commit('SET_INBOX', inbox)
      }
    }
  }
})
