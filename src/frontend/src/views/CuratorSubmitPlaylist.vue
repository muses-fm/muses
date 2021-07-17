<template>
  <div>
    <v-main>
      <v-container class="py-8 px-6" fluid>
        <v-row>
          <v-col cols="12">
            <v-card>
              <v-subheader>Submit playlist</v-subheader>
              <v-card-text>
                <v-form ref="form" v-model="isFormValid">
                  <v-text-field v-model="playlistUrl" :rules="playlistUrlRules" label="Playlist URL" required />
                  <v-btn :disabled="!isFormValid" color="primary" class="mr-4 mt-4" @click="submit">
                    Submit playlist
                  </v-btn>
                </v-form>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </div>
</template>

<script>
import { isValidHttpUrl, isValidSpotifyPlaylistUrl } from '../utils.js'

export default {
  data: () => {
    return {
      isFormValid: false,
      playlistUrl: '',
      playlistUrlRules: [
        v => !!v || 'Playlist URL is required',
        v => {
          const url = v && isValidHttpUrl(v) ? new URL(v) : {}
          return isValidSpotifyPlaylistUrl(url.hostname, url.pathname) || 'This is not a valid Spotify playlist URL'
        }
      ]
    }
  },
  computed: {
    playlistId() {
      const url = this.playlistUrl && isValidHttpUrl(this.playlistUrl) ? new URL(this.playlistUrl) : {}
      if (isValidSpotifyPlaylistUrl(url.hostname, url.pathname)) {
        return url.pathname.replace('/playlist/', '')
      }
    }
  },
  methods: {
    async submit() {
      await this.$store.dispatch('submitPlaylist', this.playlistId)
      this.$router.push({ name: 'Curator Playlists' })
    }
  }
}
</script>
