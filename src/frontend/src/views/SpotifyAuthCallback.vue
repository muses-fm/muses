<template>
  <div></div>
</template>

<script>
export default {
  props: ['access_token', 'state', 'expires_in'],
  created () {
    if (!this.$props.access_token) {
      this.$router.push({name: 'Home'})
      return
    }
    localStorage.setItem('spotifyAccessToken', this.$props.access_token)
    localStorage.setItem('spotifyReceivedState', this.$props.state)
    localStorage.setItem('spotifyTokenExpiresIn', this.$props.expires_in)
    localStorage.setItem('spotifyTokenReceivedAt', Date.now())
    window.close()
  }
}
</script>
