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

Vue.use(VueRouter)

const routes = [
  { path: '/', name: 'Home', component: Home,},
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
]

const router = new VueRouter({ routes })

export default router
