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
    redirectUri: (process.env.NODE_ENV === 'production'
      // TODO: Fetch domain name from canister_ids.testnet.json
      ? 'https://ryaba-2iaaa-aaaab-aac2a-cai.ic0.app/'
      : 'http://localhost:8080/')
  }
})

export {
  statuses,
  spotify
}
