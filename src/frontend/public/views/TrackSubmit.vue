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
                  <v-btn :disabled="!isFormValid" color="primary" class="mr-4" @click="submit">
                    Submit
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
export default {
  data: () => {
    return {
      isFormValid: false,
      trackUrl: '',
      trackUrlRules: [
        v => !!v || 'Track URL is required'
      ]
    }
  },
  methods: {
    submit() {
      this.$store.dispatch('submitTrack', this.trackUrl).then(submission => {
        this.$router.push({ name: 'Tracks' })
      })
    }
  }
}
</script>
