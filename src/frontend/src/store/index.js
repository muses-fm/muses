import Vue from 'vue'
import Vuex from 'vuex'

import { normalizeTrackData, generateRandomString, normalizePlaylistData } from '../utils'
import SpotifyService from '../services/SpotifyService'
import { statuses } from '../config.js'
import stubs from '../stubs.js'

import { Actor, HttpAgent } from '@dfinity/agent'; // COMMENT THIS LINE TO RUN LOCAL DEV SERVER
import { idlFactory as artist_idl, canisterId as artist_id } from 'dfx-generated/artist'; // COMMENT THIS LINE TO RUN LOCAL DEV SERVER
import { idlFactory as curator_idl, canisterId as curator_id } from 'dfx-generated/curator'; // COMMENT THIS LINE TO RUN LOCAL DEV SERVER

const online = process.env.NODE_ENV === 'production';

Vue.use(Vuex)

const agent = new HttpAgent(); // COMMENT THIS LINE TO RUN LOCAL DEV SERVER
const artist = Actor.createActor(artist_idl, { agent, canisterId: artist_id }); // COMMENT THIS LINE TO RUN LOCAL DEV SERVER
const curator = Actor.createActor(curator_idl, { agent, canisterId: curator_id }); // COMMENT THIS LINE TO RUN LOCAL DEV SERVER

export default new Vuex.Store({
  state: {
    status: statuses.UNINITIALIZED,
    loading: {
      enabled: false,
      text: ''
    },
    trackSubmissions: [],
    playlistSubmissions: [],
    inbox: [],
    api: {
      hasSpotifyAccessToken: null,
      spotifyStateRandomString: generateRandomString(16)
    },
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
    },
    TOGGLE_SPOTIFY_ACCESS_TOKEN_FLAG (state, toggle) {
      state.api.hasSpotifyAccessToken = toggle
    }
  },
  actions: {
    async initializeAppWithDataFromIC({ dispatch, commit }) {
      commit('SET_STATUS', statuses.INITIALIZING)
      const submissions = online ? await artist.getSubmissions() : stubs.submissions
      if (submissions.length > 0) {
        const tracks = []
        submissions.forEach(async (submission) => {
          const spotifyTrack = await SpotifyService.getTrack(submission.spotifyTrackId);
          tracks.push(normalizeTrackData(submission, spotifyTrack))
        });

        commit('SET_TRACK_SUBMISSIONS', tracks)
      }
      const playlistSubmissions = online ? await curator.getPlaylists() : stubs.playlists
      if (playlistSubmissions.length > 0) {
        const playlists = []
        playlistSubmissions.forEach(async (playlistSubmission) => {
          const spotifyPlaylist = await SpotifyService.getPlaylist(playlistSubmission.spotifyPlaylistId);
          playlists.push(normalizePlaylistData(playlistSubmission, spotifyPlaylist))
        })

        commit('SET_PLAYLIST_SUBMISSIONS', playlists)
      }

      await dispatch('getPendingSubmissions')

      commit('SET_STATUS', statuses.INITIALIZED)
    },
    async submitTrack({ dispatch, commit }, trackId) {
      commit('TOGGLE_LOADER_ON', 'Storing track...')

      let submission
      if (online) {
        submission = await artist.submitTrack(trackId);
      } else {
        const id = `${stubs.submissions.length + 1}`
        submission = {id: id, spotifyTrackId: trackId};
        stubs.submissions.push(submission)
      }

      const spotifyTrack = await SpotifyService.getTrack(submission.spotifyTrackId);
      commit('SUBMIT_TRACK', normalizeTrackData(submission, spotifyTrack))

      await dispatch('getPendingSubmissions')

      commit('TOGGLE_LOADER_OFF')
    },
    async submitPlaylist({ commit }, playlistId) {
      commit('TOGGLE_LOADER_ON', 'Storing playlist...')

      let playlist
      if (online) {
        playlist = await curator.qualifyPlaylist(playlistId)
      } else {
        const id = `${stubs.playlists.length + 1}`
        playlist = {id: id, spotifyPlaylistId: playlistId};
        stubs.playlists.push(playlist)
        // XXX: simulate `curator.qualifyPlaylist` return value
        playlist = [playlist]
      }

      // TODO: Find out why returned value is an array with 1 element
      if (playlist && playlist.length > 0){
        const spotifyPlaylist = await SpotifyService.getPlaylist(playlist[0].spotifyPlaylistId);
        commit('SUBMIT_PLAYLIST', normalizePlaylistData(playlist[0], spotifyPlaylist))
      }

      commit('TOGGLE_LOADER_OFF')
    },
    async getPendingSubmissions({ commit }) {
      const submissionIds = online ? await curator.getPendingSubmissions() : stubs.submissions
      const inbox = []
      for (let i = 0; i < submissionIds.length; i++) {
        const submission = online ? await artist.getSubmission(submissionIds[i]) : [stubs.submissions[i]]
        // TODO: Find out why returned value is an array with 1 element
        if (submission && submission.length > 0){
          const spotifyTrack = await SpotifyService.getTrack(submission[0].spotifyTrackId);
          inbox.push(normalizeTrackData(submission[0], spotifyTrack))
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
    },
    toggleSpotifyAccessTokenFlag ({ commit }, toggle) {
      commit('TOGGLE_SPOTIFY_ACCESS_TOKEN_FLAG', toggle)
    }
  }
})
