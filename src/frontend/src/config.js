const statuses = Object.freeze({
  UNINITIALIZED: 'UNINITIALIZED',
  INITIALIZING: 'INITIALIZING',
  INITIALIZED: 'INITIALIZED',
})

const spotify = Object.freeze({
  hostname: 'open.spotify.com',
  auth: {
    baseUrl: 'https://accounts.spotify.com/authorize',
    responseType: 'token',
    clientId: '787eb6536fcc4a4dba1c43b01b751ac0',
    scope: '',
    redirectUri: 'http://localhost:3000/'
  }
})

export {
  statuses,
  spotify
}
