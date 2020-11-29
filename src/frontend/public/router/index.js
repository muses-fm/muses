import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Subpage from '../views/Subpage.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/subpage', name: 'Subpage', component: Subpage },
]

const router = new VueRouter({
  base: process.env.BASE_URL,
  routes
})

export default router
