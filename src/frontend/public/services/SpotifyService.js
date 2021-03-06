import axios from 'axios'
import api from './api'

const axiosInstance = axios.create({
  baseURL: 'https://api.spotify.com/v1',
  headers: {
    Authorization: constructAuthorizationString()
  }
})

axiosInstance.interceptors.request.use(function (config) {
  config.headers.Authorization = constructAuthorizationString()
  return config
})

function constructAuthorizationString () {
  return `Bearer ${localStorage.getItem('spotifyAccessToken')}`
}

class SpotifyService {
  static GET (url, params) {
    return axiosInstance.get(url, { params })
  }

  static POST (url, data) {
    return axiosInstance.post(url, data)
  }

  static PUT (url, data) {
    return axiosInstance.put(url, data)
  }

  static getPlaylists (params) {
    return this.GET(api.my.playlists, params)
  }

  static getPlaylist (playlistId) {
    return this.GET(api.playlist(playlistId))
  }

  static getTrack (trackId) {
    return this.GET(api.track(trackId))
  }

}
export default SpotifyService
