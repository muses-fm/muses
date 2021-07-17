<template>
  <div>
    <v-navigation-drawer v-model="drawer" app>
      <v-sheet color="grey lighten-4" class="pa-4">
        <v-avatar class="mb-4" color="grey darken-1" size="64"></v-avatar>
        <div>curator@resonate.com</div>
      </v-sheet>

      <v-divider />

      <v-list>
        <v-list-item v-for="{icon, title, to} in links" :key="icon" :to="to">
          <v-list-item-content>
            <v-list-item-title>{{ title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = !drawer">MENU</v-app-bar-nav-icon>
      <v-toolbar-title></v-toolbar-title>
      <v-spacer/>
      <router-link :to="{name: 'Artist'}">Switch to Artist view</router-link>
    </v-app-bar>

    <router-view v-if="!loading.enabled"></router-view>
    <v-overlay v-else :value="loading.enabled" class="text-center">
      <div class="mb-5">{{ loading.text }}</div>
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data: () => {
    return {
      drawer: null,
      links: [
        { title: 'My playlists', to: { name: 'Curator Playlists' }, icon: 'list' },
        { title: 'Submit playlist', to: { name: 'Curator Submit Playlist' }, icon: 'publish' },
        { title: 'My Inbox', to: { name: 'Curator Inbox' }, icon: 'inbox' }
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
