export default {
  my: {
    playlists: '/me/playlists'
  },
  playlist: (playlistId) => `/playlists/${playlistId}`,
  track: (trackId) => `/tracks/${trackId}`
}
