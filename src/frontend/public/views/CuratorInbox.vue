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
                <v-list-item-group v-model="selected" active-class="pink--text">
                  <v-list-item disabled v-if="inbox.length == 0">
                    Your inbox is empty.
                  </v-list-item>
                  <template v-else v-for="(submission, index) in inbox">
                    <v-list-item :key="`${submission.id}`">
                      <v-list-item-avatar color="grey darken-1"></v-list-item-avatar>
                      <v-list-item-content>
                        <v-list-item-title>Resonate track submission ID: {{ submission.id }}</v-list-item-title>
                        <v-list-item-subtitle class="text--primary">
                          Spotify track ID: {{ submission.spotifyTrackId }}
                        </v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>
                    <v-divider v-if="index < inbox.length - 1" :key="`divider-${submission.id}`" inset />
                  </template>
                </v-list-item-group>
              </v-list>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">Reviewing track</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col>
                <iframe
                  :src="currentlyReviewingSpotifyTrackEmbedUrl"
                  width="528"
                  height="80"
                  frameborder="0"
                  allowtransparency="true"
                  allow="encrypted-media"
                >
                </iframe>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-select
                  :items="playlistSubmissions"
                  item-text="spotifyPlaylistId"
                  item-value="id"
                  label="Add to playlist"
                  v-model="addToPlaylist"
                  outlined
                >
                </v-select>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-textarea
                  name="feedback"
                  label="Feedback"
                  v-model="feedback"
                  hint="Enter feedback for the artist"
                  outlined
                ></v-textarea>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="resetDialog">Cancel</v-btn>
          <v-btn color="red" dark @click="resetDialog">Reject</v-btn>
          <v-btn color="green" dark @click="resetDialog">Accept</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { constructSpotifyTrackEmbedUrl } from '../utils'
import config from '../config.js'

export default {
  data: () => {
    return {
      selected: '',
      dialog: false,
      currentlyReviewingSubmissionId: null,
      currentlyReviewingSpotifyTrackEmbedUrl: '',
      feedback: '',
      addToPlaylist: null
    }
  },
  computed: {
    ...mapState([
      'inbox',
      'status',
      'playlistSubmissions'
    ]),
    initializingStatus() {
      return config.statuses.INITIALIZING;
    }
  },
  watch: {
    selected(newValue) {
      if (newValue >= 0) {
        this.dialog = true
        this.currentlyReviewingSubmissionId = this.inbox[newValue].id
        this.currentlyReviewingSpotifyTrackEmbedUrl = constructSpotifyTrackEmbedUrl(this.inbox[newValue].spotifyTrackId)
      }
    }
  },
  methods: {
    resetDialog() {
      this.currentlyReviewingSubmissionId = null
      this.currentlyReviewingSpotifyTrackEmbedUrl = ''
      this.feedback = ''
      this.addToPlaylist = null
      this.dialog = false
    }
  }
}
</script>
