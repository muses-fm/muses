import config from './config.js'

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
  return hostname == config.spotifyHostname && pathname.includes('/playlist/')
}

function isValidSpotifyTrackUrl(hostname, pathname) {
  return hostname == config.spotifyHostname && pathname.includes('/track/')
}

function reconstructSpotifyPlaylistUrl(playlistId) {
  return `https://${config.spotifyHostname}/playlist/${playlistId}`
}

function reconstructSpotifyTrackUrl(trackId) {
  return `https://${config.spotifyHostname}/track/${trackId}`
}

export {
  isValidHttpUrl,
  isValidSpotifyPlaylistUrl,
  isValidSpotifyTrackUrl,
  reconstructSpotifyPlaylistUrl,
  reconstructSpotifyTrackUrl
}
