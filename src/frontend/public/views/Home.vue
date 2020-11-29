<template>
  <div>
    <v-main>
      Hello from home!
      <v-btn :to="{path: '/subpage'}" elevation="2">Go to subpage</v-btn>
      <router-link to="/subpage">Go to subpage</router-link>
    </v-main>
  </div>
</template>
