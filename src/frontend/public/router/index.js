import Vue from 'vue'
import VueRouter from 'vue-router'
import Tracks from '../views/Tracks.vue'
import TrackSubmit from '../views/TrackSubmit.vue'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/track/submit', name: 'Submit track', component: TrackSubmit },
  { path: '/tracks', name: 'Tracks', component: Tracks },
  { path: '/', name: 'Home', component: Home,},
]

const router = new VueRouter({ routes })

export default router
