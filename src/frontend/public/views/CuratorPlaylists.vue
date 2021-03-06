<template>
  <div>
    <v-main>
      <v-container class="py-8 px-6" fluid>
        <v-row>
          <v-col cols="12">
            <v-card>
              <v-subheader>My submitted playlists</v-subheader>
              <v-skeleton-loader type="list-item-avatar-two-line" v-if="status === initializingStatus">
              </v-skeleton-loader>
              <v-list v-else two-line>
                <v-list-item-group v-model="selected" active-class="pink--text">
                  <v-list-item disabled v-if="playlistSubmissions.length == 0">
                    There are no qualified playlists yet.
                  </v-list-item>
                  <template v-else v-for="(submission, index) in playlistSubmissions">
                    <v-list-item :key="`${submission.spotifyPlaylistId}`">
                      <v-list-item-avatar>
                        <v-img :src="submission.image"></v-img>
                      </v-list-item-avatar>
                      <v-list-item-content>
                        <v-list-item-title>{{ submission.title }}</v-list-item-title>
                        <v-list-item-subtitle>{{ submission.owner.name }}</v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>
                    <v-divider v-if="index < playlistSubmissions.length - 1" :key="`divider-${submission.spotifyPlaylistId}`" inset />
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
import { reconstructSpotifyPlaylistUrl } from '../utils'
import { statuses } from '../config.js'

export default {
  data: () => {
    return {
      selected: ''
    }
  },
  computed: {
    ...mapState([
      'playlistSubmissions',
      'status'
    ]),
    initializingStatus() {
      return statuses.INITIALIZING;
    }
  },
  watch: {
    selected(newValue) {
      const url = reconstructSpotifyPlaylistUrl(this.playlistSubmissions[newValue].spotifyPlaylistId)
      window.open(url)
    }
  }
}
</script>
