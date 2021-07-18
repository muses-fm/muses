<template>
  <v-app-bar app>
    <v-app-bar-nav-icon @click="onDrawerToggleClick">
      <v-icon large>mdi-menu</v-icon>
    </v-app-bar-nav-icon>
    <v-toolbar-title></v-toolbar-title>
    <v-spacer/>
    <router-link :to="switchLink">{{ switchText }}</router-link>
  </v-app-bar>
</template>

<script>
export default {
  props: ['view', 'onDrawerToggleClick'],
  computed: {
    switchLink() {
      return this.view === 'curator' ? {name: 'Curator'} : {name: 'Artist'};
    },
    switchText() {
      return this.view === 'curator' ? 'Switch to Curator view' : 'Switch to Artist view';
    }
  }
}
</script>
