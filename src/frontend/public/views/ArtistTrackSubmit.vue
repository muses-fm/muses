<template>
  <div>
    <v-main>
      <v-container class="py-8 px-6" fluid>
        <v-row>
          <v-col cols="12">
            <v-card>
              <v-subheader>Submit track</v-subheader>
              <v-card-text>
                <v-form ref="form" v-model="isFormValid">
                  <v-text-field v-model="trackUrl" :rules="trackUrlRules" label="Track URL" required />
                  <v-btn :disabled="!isFormValid" color="primary" class="mr-4 mt-4" @click="submit">
                    Submit track
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
import { isValidHttpUrl, isValidSpotifyTrackUrl } from '../utils.js'

export default {
  data: () => {
    return {
      isFormValid: false,
      trackUrl: '',
      trackUrlRules: [
        v => !!v || 'Track URL is required',
        v => {
          const url = v && isValidHttpUrl(v) ? new URL(v) : {}
          return isValidSpotifyTrackUrl(url.hostname, url.pathname) || 'This is not a valid Spotify track URL'
        }
      ]
    }
  },
  computed: {
    trackId() {
      const url = this.trackUrl && isValidHttpUrl(this.trackUrl) ? new URL(this.trackUrl) : {}
      if (isValidSpotifyTrackUrl(url.hostname, url.pathname)) {
        return url.pathname.replace('/track/', '')
      }
    }
  },
  methods: {
    submit() {
      this.$store.dispatch('submitTrack', this.trackId).then(submission => {
        this.$router.push({ name: 'Artist Tracks' })
      })
    }
  }
}
</script>
