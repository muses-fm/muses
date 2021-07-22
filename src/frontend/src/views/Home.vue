<template>
  <div>
    <v-main>
      <v-container class="mt-16">
        <v-row>
          <v-col class="text-center">
            <h1 class="text-h1">Welcome to MUSES.FM!</h1>
            <div class="mt-16">
              <div v-if="isLoggedIn === false">
                <v-btn x-large dark color="green" @click="loginToSpotify">
                  Login to Spotify
                </v-btn>
              </div>
              <div v-else-if="isLoggedIn === true">
                <v-btn x-large color="primary" class="ma-2" :to="{ name: 'Artist' }">
                  I am an Artist
                </v-btn>
                <v-btn x-large color="secondary" class="ma-2" :to="{ name: 'Curator' }">
                  I am a Curator
                </v-btn>
              </div>
              <div v-else>
                Checking Spotify API access...
              </div>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { spotify } from '../config.js'

export default {
  computed: {
    ...mapState({
      isLoggedIn: state => state.api.hasSpotifyAccessToken,
      spotifyStateRandomString: state => state.api.spotifyStateRandomString
    })
  },
  methods: {
    loginToSpotify () {
      const spotifyAuthUrl =  `${spotify.auth.baseUrl}?` +
        `response_type=${spotify.auth.responseType}&` +
        `client_id=${encodeURIComponent(spotify.auth.clientId)}&` +
        `scope=${encodeURIComponent(spotify.auth.scope)}&` +
        `redirect_uri=${encodeURIComponent(spotify.auth.redirectUri)}&` +
        `state=${encodeURIComponent(this.spotifyStateRandomString)}`
      window.open(spotifyAuthUrl, '_blank', 'height=570,width=520')
    }
  }
}
</script>
