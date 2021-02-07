#!/bin/sh

set -e

usage() {
  progname=$(basename "$0")
  echo "usage: ${progname}"
}

apply() {
  dfx canister call curator qualifyPlaylist '("https://open.spotify.com/playlist/5cXbbQOyTdkCu09vEWeEoV?si=G6LYqwImRtuUjvmTKFJ-vw")'
  dfx canister call artist submitTrack '("https://open.spotify.com/track/6HwwPLqfRbYS7peAp1OgFm?si=mYfboeKITt2yIVGxVeFCXw")'
  dfx canister call artist submitTrack '("https://open.spotify.com/track/6UINWt8tEGPYBXEu5VehZs?si=sb0zdWgIS-iK_M0VVmBCxw")'
  dfx canister call curator reviewSubmission '(1, "This song is awesome! Keep doing your best!", 1)'
  dfx canister call curator reviewSubmission '(2, "This song does not fit my taste, sorry!", 0)'
}

# validate argument length
if [ $# -gt 0 ]; then
  usage
  exit 1
fi

apply
