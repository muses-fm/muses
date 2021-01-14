<template>
  <v-app>
    <router-view></router-view>
  </v-app>
</template>

<script>
import { mapState } from 'vuex'
import config from './config.js'

export default {
  computed: {
    ...mapState([
      'status'
    ])
  },
  created() {
    if (this.status !== config.statuses.INITIALIZED) {
      this.$store.dispatch('initializeAppWithDataFromIC')
    }
  }
}
</script>
