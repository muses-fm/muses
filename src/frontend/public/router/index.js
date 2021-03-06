import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Artist from '../views/Artist.vue'
import Curator from '../views/Curator.vue'
import ArtistTracks from '../views/ArtistTracks.vue'
import ArtistTrackSubmit from '../views/ArtistTrackSubmit.vue'
import CuratorSubmitPlaylist from '../views/CuratorSubmitPlaylist.vue'
import CuratorPlaylists from '../views/CuratorPlaylists.vue'
import CuratorInbox from '../views/CuratorInbox.vue'
import SpotifyAuthCallback from '../views/SpotifyAuthCallback.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/artist', name: 'Artist', component: Artist,
    children: [
      { path: 'submit', name: 'Artist Submit Track', component: ArtistTrackSubmit },
      { path: 'tracks', name: 'Artist Tracks', component: ArtistTracks }
    ]
  },
  { path: '/curator', name: 'Curator', component: Curator,
    children: [
      { path: 'submit', name: 'Curator Submit Playlist', component: CuratorSubmitPlaylist },
      { path: 'playlists', name: 'Curator Playlists', component: CuratorPlaylists },
      { path: 'inbox', name: 'Curator Inbox', component: CuratorInbox }
    ]
  },
  { path: '*', component: SpotifyAuthCallback, props: getHashParams},
]

/**
 * Extracts the hash parameters and their values from the URL and returns them
 * as an object where the keys are the parameter names and values are their
 * values.
 * Expects window.location.hash to be in the following format:
 * #/access_token=...&expires_in=...
 */
function getHashParams () {
  const hashParams = {}
  if (window.location.hash && window.location.hash.length > 2) {
    let q = window.location.hash.substring(2) // Remove the #/ part from the beginning of the string
    const r = /([^&;=]+)=?([^&;]*)/g
    var e = r.exec(q)

    while (e) {
      hashParams[e[1]] = decodeURIComponent(e[2])
      e = r.exec(q)
    }
  }
  return hashParams
}

const router = new VueRouter({ routes })

export default router
