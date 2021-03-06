<template>
  <v-app>
    <router-view></router-view>
  </v-app>
</template>

<script>
import { mapState } from 'vuex'
import { statuses } from './config.js'
import { hasAccessToSpotify } from './utils'

export default {
  computed: {
    ...mapState([
      'status',
    ]),
    ...mapState({
      spotifyStateRandomString: state => state.api.spotifyStateRandomString
    })
  },
  created() {
    if (hasAccessToSpotify()) {
      this.$store.dispatch('toggleSpotifyAccessTokenFlag', true)
      if (this.status !== statuses.INITIALIZED) {
        this.$store.dispatch('initializeAppWithDataFromIC')
      }
    } else {
      this.$store.dispatch('toggleSpotifyAccessTokenFlag', false)
      const checkForSpotifyAccessToken = setInterval(async () => {
        if (hasAccessToSpotify()) {
          clearInterval(checkForSpotifyAccessToken)
          this.$store.dispatch('toggleSpotifyAccessTokenFlag', true)
          if (this.status !== statuses.INITIALIZED) {
            this.$store.dispatch('initializeAppWithDataFromIC')
          }
        }
      }, 2000)
    }
  }
}
</script>
