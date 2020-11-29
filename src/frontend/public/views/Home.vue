<template>
  <div>
    <v-list>
      <v-list-item-group v-model="selected" active-class="pink--text">
        <template v-for="submission in submissions">
          <v-list-item :key="submission.id">
            <v-list-item-content>
              <v-list-item-title>ID: {{ submission.id }}</v-list-item-title>
              <v-list-item-subtitle class="text--primary">{{ submission.url }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list-item-group>
    </v-list>
    <v-overlay :value="overlay">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
  </div>
</template>

<script>
import artist from 'ic:canisters/artist';

export default {
  data: () => {
    return {
      submissions: [],
      overlay: true,
      selected: ''
    }
  },
  created() {
    artist.getAll().then(submissions => {
      this.submissions = submissions
      this.overlay = false
    });
  }
}
</script>
