#!/bin/sh

set -e

usage() {
  progname=$(basename "$0")
  echo "usage: ${progname}"
}

apply() {
  dfx canister call artist submitTrack '("https://open.spotify.com/track/6HwwPLqfRbYS7peAp1OgFm?si=mYfboeKITt2yIVGxVeFCXw")'
  dfx canister call artist submitTrack '("https://open.spotify.com/track/6UINWt8tEGPYBXEu5VehZs?si=sb0zdWgIS-iK_M0VVmBCxw")'
}

# validate argument length
if [ $# -gt 0 ]; then
  usage
  exit 1
fi

apply
