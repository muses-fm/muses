<template>
  <div id="app">
    <div id="nav">
      HIII from Vue!
      <div v-if="greeting">{{ greeting }}</div>
    </div>
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
