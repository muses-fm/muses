import Vue from 'vue'
import VueRouter from 'vue-router'
import Tracks from '../views/Tracks.vue'
import TrackSubmit from '../views/TrackSubmit.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/', name: 'Home', component: Tracks },
  { path: '/track/submit', name: 'Submit track', component: TrackSubmit },
  { path: '/tracks', name: 'Tracks', component: Tracks },
]

const router = new VueRouter({ routes })

export default router
