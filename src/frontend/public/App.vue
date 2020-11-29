<template>
  <div id="app">
    <v-app>
      <div id="nav">
        HIII from Vue!
        <div v-if="greeting">{{ greeting }}</div>
      </div>
      <v-container>Hello world</v-container>
      <router-view></router-view>
    </v-app>
  </div>
</template>

<script>
import artist from 'ic:canisters/artist';

export default {
  data: () => {
    return {
      greeting: ''
    }
  },
  created() {
    artist.greet(window.prompt("Enter your name:")).then(greeting => {
      this.greeting = greeting
    });
  }
}
</script>
