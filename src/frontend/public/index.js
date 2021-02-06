// import 'material-design-icons-iconfont/dist/material-design-icons.css'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'

Vue.use(Vuetify)

Vue.config.devtools = true
Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify: new Vuetify({
    // icons: {
    //   iconfont: 'material-icons',
    // }
  }),
  render: h => h(App),
}).$mount('#app')
