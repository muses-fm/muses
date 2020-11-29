<template>
  <div id="app">
    <v-app>
      <v-navigation-drawer v-model="drawer" app>
        <v-sheet color="grey lighten-4" class="pa-4">
          <v-avatar class="mb-4" color="grey darken-1" size="64"></v-avatar>
          <div>john@example.com</div>
        </v-sheet>

        <v-divider />

        <v-list>
          <v-list-item v-for="{icon, title, to} in links" :key="icon" :to="to">
            <!-- TODO: Fix font imports -->
            <!-- <v-list-item-icon>
              <v-icon>{{ icon }}</v-icon>
            </v-list-item-icon> -->

            <v-list-item-content>
              <v-list-item-title>{{ title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
      <router-view v-if="!loading"></router-view>
      <v-overlay v-else :value="loading" class="text-center">
        <div class="mb-5">Loading data...</div>
        <v-progress-circular indeterminate size="64"></v-progress-circular>
      </v-overlay>
    </v-app>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data: () => {
    return {
      drawer: null,
      links: [
        { title: 'My submissions', to: { name: 'Tracks' }, icon: 'list' },
        { title: 'Submit track', to: { name: 'Submit track' }, icon: 'publish' }
      ]
    }
  },
  computed: {
    ...mapState([
      'loading'
    ])
  }
}
</script>
