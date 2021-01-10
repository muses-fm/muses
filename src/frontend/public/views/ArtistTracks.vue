<template>
  <div>
    <v-main>
      <v-container class="py-8 px-6" fluid>
        <v-row>
          <v-col cols="12">
            <v-card>
              <v-subheader>My submitted tracks</v-subheader>
              <v-list two-line>
                <v-list-item-group v-model="selected" active-class="pink--text">
                  <template v-for="(submission, index) in trackSubmissions">
                    <v-list-item :key="`${submission.id}`">
                      <v-list-item-avatar color="grey darken-1"></v-list-item-avatar>
                      <v-list-item-content>
                        <v-list-item-title>ID: {{ submission.id }}</v-list-item-title>                        
                        <v-list-item-subtitle class="text--primary">{{ submission.spotifyTrackId }}</v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>
                    <v-divider v-if="index < trackSubmissions.length - 1" :key="`divider-${submission.id}`" inset />
                  </template>
                </v-list-item-group>
              </v-list>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { reconstructSpotifyTrackUrl } from '../utils'

export default {
  data: () => {
    return {
      selected: ''
    }
  },
  computed: {
    ...mapState([
      'trackSubmissions'
    ])
  },
  watch: {
    selected(newValue) {      
      const spotifyTrackId = reconstructSpotifyTrackUrl(this.trackSubmissions[newValue].url)
      window.open(spotifyTrackId)
    }
  },
  created() {
    if (!this.trackSubmissions.length) {
      this.$store.dispatch('fetchSubmittedTracks');
    }
  }
}
</script>
