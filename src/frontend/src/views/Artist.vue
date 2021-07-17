<template>
  <div>
    <v-navigation-drawer v-model="drawer" app>
      <v-sheet color="grey lighten-4" class="pa-4">
        <v-avatar class="mb-4" color="grey darken-1" size="64"></v-avatar>
        <div>artist@resonate.com</div>
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
      <router-link :to="{name: 'Curator'}">Switch to Curator view</router-link>
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
        { title: 'My submissions', to: { name: 'Artist Tracks' }, icon: 'list' },
        { title: 'Submit track', to: { name: 'Artist Submit Track' }, icon: 'publish' }
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
