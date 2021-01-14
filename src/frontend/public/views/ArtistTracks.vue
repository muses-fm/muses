<template>
  <div>
    <v-main>
      <v-container class="py-8 px-6" fluid>
        <v-row>
          <v-col cols="12">
            <v-card>
              <v-subheader>My submitted tracks</v-subheader>
              <v-skeleton-loader type="list-item-avatar-two-line" v-if="status === initializingStatus">
              </v-skeleton-loader>
              <v-list v-else two-line>
                <v-list-item disabled v-if="trackSubmissions.length == 0">
                  There are no submitted tracks yet.
                </v-list-item>
                <v-list-item-group v-else v-model="selected" active-class="pink--text">
                  <template v-for="(submission, index) in trackSubmissions">
                    <v-list-item :key="`${submission.id}`">
                      <v-list-item-avatar color="grey darken-1"></v-list-item-avatar>
                      <v-list-item-content>
                        <v-list-item-title>ID: {{ submission.id }}</v-list-item-title>
                        <!-- TODO: Replace .url with .spotifyTrackId -->
                        <v-list-item-subtitle class="text--primary">{{ submission.url }}</v-list-item-subtitle>
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
import config from '../config.js'

export default {
  data: () => {
    return {
      selected: ''
    }
  },
  computed: {
    ...mapState([
      'trackSubmissions',
      'status'
    ]),
    initializingStatus() {
      return config.statuses.INITIALIZING;
    }
  },
  watch: {
    selected(newValue) {
      // TODO: Replace .url with .spotifyTrackId in the following line
      const url = reconstructSpotifyTrackUrl(this.trackSubmissions[newValue].url)
      window.open(url)
    }
  }
}
</script>
