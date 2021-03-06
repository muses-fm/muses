import { spotify } from './config.js'

function isValidHttpUrl(string) {
  let url;

  try {
    url = new URL(string);
  } catch (_) {
    return false;
  }

  return url.protocol === "http:" || url.protocol === "https:";
}

function isValidSpotifyPlaylistUrl(hostname, pathname) {
  return hostname == spotify.hostname && pathname.includes('/playlist/')
}

function isValidSpotifyTrackUrl(hostname, pathname) {
  return hostname == spotify.hostname && pathname.includes('/track/')
}

function reconstructSpotifyPlaylistUrl(playlistId) {
  return `https://${spotify.hostname}/playlist/${playlistId}`
}

function reconstructSpotifyTrackUrl(trackId) {
  return `https://${spotify.hostname}/track/${trackId}`
}

function constructSpotifyTrackEmbedUrl(trackId) {
  return `https://${spotify.hostname}/embed/track/${trackId}`
}

function normalizeTrackData(submission, spotifyTrack) {
  return {
    title: spotifyTrack.data.name,
    artist: spotifyTrack.data.artists.map(artist => artist.name).join(", "),
    image: spotifyTrack.data.album.images[0].url,
    spotifyTrackId: submission.spotifyTrackId,
    id: submission.id
  }
}

function normalizePlaylistData(submission, spotifyPlaylist) {
  return {
    title: spotifyPlaylist.data.name,
    description: spotifyPlaylist.data.description,
    image: spotifyPlaylist.data.images[0].url,
    url: spotifyPlaylist.data.external_urls.spotify,
    followersCount: spotifyPlaylist.data.followers.total,
    spotifyPlaylistId: spotifyPlaylist.data.id,
    owner: {
      name: spotifyPlaylist.data.owner.display_name,
      url: spotifyPlaylist.data.owner.external_urls.spotify
    },
    id: submission.id
  }
}

function generateRandomString (length) {
  var text = ''
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length))
  }
  return text
}

function hasAccessToSpotify() {
  let accessToken = localStorage.getItem('spotifyAccessToken');
  let tokenExpiresIn = localStorage.getItem('spotifyTokenExpiresIn');
  let tokenReceivedAt = localStorage.getItem('spotifyTokenReceivedAt');

  return accessToken && Date.now() < tokenReceivedAt + tokenExpiresIn
}

export {
  isValidHttpUrl,
  isValidSpotifyPlaylistUrl,
  isValidSpotifyTrackUrl,
  reconstructSpotifyPlaylistUrl,
  reconstructSpotifyTrackUrl,
  constructSpotifyTrackEmbedUrl,
  normalizeTrackData,
  normalizePlaylistData,
  generateRandomString,
  hasAccessToSpotify
}
