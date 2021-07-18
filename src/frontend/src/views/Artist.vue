<template>
  <div>
    <v-navigation-drawer v-model="drawer" app>
      <v-sheet color="grey lighten-4" class="pa-4">
        <v-avatar class="mb-4" color="grey darken-1" size="64"></v-avatar>
        <div class="grey--text">artist@resonate.com</div>
      </v-sheet>

      <v-divider />

      <v-list>
        <v-list-item v-for="{icon, title, to} in links" :key="icon" :to="to">
          <v-list-item-icon>
            <v-icon v-text="icon"></v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <NavigationBar view="curator" :onDrawerToggleClick="() => {drawer = !drawer}" />

    <router-view v-if="!loading.enabled"></router-view>
    <v-overlay v-else :value="loading.enabled" class="text-center">
      <div class="mb-5">{{ loading.text }}</div>
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import NavigationBar from '../components/NavigationBar.vue'

export default {
  components: {
    NavigationBar
  },
  data: () => {
    return {
      drawer: null,
      links: [
        { title: 'My submissions', to: { name: 'Artist Tracks' }, icon: 'mdi-playlist-music-outline' },
        { title: 'Submit track', to: { name: 'Artist Submit Track' }, icon: 'mdi-publish' }
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
