const http = require('http');
const dfxConfig = require('../dfx.json');

// TODO: move to canister_ids.local.json perhaps?
const FRONTEND_CANISTER_ID = 'r7inp-6aaaa-aaaaa-aaabq-cai';

// HTTP server used as Spotify OAuth callback URL in development environments. This is necessary because Spotify
// removes the `canisterId=` parameter from the callback URL.
const server = http.createServer((request, response) => {
  // Redirect to the frontend canister in the local DFINITY replica
  response.writeHead(301, {
    'Location': `http://${dfxConfig.networks.local.bind}?canisterId=${FRONTEND_CANISTER_ID}`,
  });
  response.end();
})

console.log("REDIRECT SERVER IS ON! GIMME ZE SPOTIFY!");
server.listen(3000);
