<template>
  <div>
    <v-main>
      <v-container class="py-8 px-6" fluid>
        <v-row>
          <v-col cols="12">
            <v-card>
              <v-subheader>My inbox</v-subheader>
              <v-skeleton-loader type="list-item-avatar-two-line" v-if="status === initializingStatus">
              </v-skeleton-loader>
              <v-list v-else two-line>
                <v-list-item disabled v-if="inbox.length == 0">
                  Your inbox is empty.
                </v-list-item>
                <template v-else v-for="(submission, index) in inbox">
                  <v-list-item :key="`${submission.id}`">
                    <v-list-item-avatar color="grey darken-1"></v-list-item-avatar>
                    <v-list-item-content>
                      <v-list-item-title>Resonate track submission ID: {{ submission.id }}</v-list-item-title>
                      <v-list-item-subtitle class="text--primary">
                        Spotify track ID: ?
                      </v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                  <v-divider v-if="index < inbox.length - 1" :key="`divider-${submission.id}`" inset />
                </template>
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
// import { reconstructSpotifyPlaylistUrl } from '../utils'
import config from '../config.js'

export default {
  data: () => {
    return {
      // selected: ''
    }
  },
  computed: {
    ...mapState([
      'inbox',
      'status'
    ]),
    initializingStatus() {
      return config.statuses.INITIALIZING;
    }
  },
  // watch: {
  //   selected(newValue) {
  //     const url = reconstructSpotifyPlaylistUrl(this.playlistSubmissions[newValue].spotifyPlaylistId)
  //     window.open(url)
  //   }
  // }
}
</script>
