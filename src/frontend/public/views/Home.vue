<template>
  <div>
    <v-main>
      <v-container class="mt-16">
        <v-row>
          <v-col class="text-center">
            <h1 class="text-h1">Welcome to Resonate!</h1>
            <div class="mt-16">
              <v-btn x-large color="primary" class="mr-5" :to="{ name: 'Artist' }">
                I am an Artist
              </v-btn>
              <v-btn x-large color="secondary" :to="{ name: 'Curator' }">
                I am a Curator
              </v-btn>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data: () => {
    return {
      selected: ''
    }
  }
}
</script>
