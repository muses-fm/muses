# res(o)nate

res(o)nate is a decentralized music curation platform that allows artists to distribute new releases to playlist curators without intermediaries. Try the [demo](http://ryaba-2iaaa-aaaab-aac2a-cai.ic0.app/) on DFINITY testnet.

## Development

To get started, you might want to explore the project directory structure and install required tools:
- [Git](https://git-scm.com/downloads) and [GNU Make](https://www.gnu.org/software/make/).
- [Node.js](https://nodejs.org/en/download/), [nvm](https://github.com/nvm-sh/nvm) and [yarn](https://classic.yarnpkg.com/).
- [DFINITY SDK](https://sdk.dfinity.org/).

Make sure to install the right version of the DFINITY SDK with:

```sh
DFX_VERSION=0.6.21 sh -ci "$(curl -fsSL https://sdk.dfinity.org/install.sh)"
```

Clone this repo:

```sh
git clone git@github.com:OmeGak/resonate.git
cd resonate
```

Once cloned, make sure you have the right version of `node` installed with `nvm`:

```sh
nvm use
```

Start a local DFNITY replica for development:

```sh
dfx start
```

And deploy the project canisters to the local network:

```sh
yarn install
dfx deploy
```

This command, if successful, will display IDs of your deployed canisters:

```
Installing code for canister artist, with canister_id rwlgt-iiaaa-aaaaa-aaaaa-cai
Installing code for canister curator, with canister_id rrkah-fqaaa-aaaaa-aaaaq-cai
Installing code for canister frontend, with canister_id ryjl3-tyaaa-aaaaa-aaaba-cai
```

Spot the `frontend` canister and use its ID to access the user interface:

```
http://localhost:8000/?canisterId=ryjl3-tyaaa-aaaaa-aaaba-cai
```

You can now also interact with your canisters' `actor`s directly from the terminal with:

```sh
dfx canister call <canister_name> <function> [<argument>]
```

If you want to have some dummy data for testing, apply local fixtures:

```sh
make fixtures
```

If at any point you want to start from scratch, run:

```sh
make clean
```

> **NOTE:** Working with this project in your development environment will not affect any production deployment or identity tokens.

### Backend

While developing, you can re-deploy the changes in your canister with:

```sh
dfx deploy <canister_alias>
```

Or use `dfx deploy` to re-deploy all canisters.

### Frontend

While developing, you can re-deploy your changes while preserving canister state with:

```
dfx build frontend
dfx canister install frontend --mode=upgrade
```

or simply run

```sh
yarn redeploy:frontend
```

which does the same thing.

For faster development cycles, you may want to work with a local dev server, disconnected from the canisters, instead. Start it with:

```sh
yarn start
```

> **NOTE:** You will need to comment out code that imports or uses canisters and manually mock responses to make the above command work.

And navigate to [`http://localhost:8080`](http://localhost:8080) to see your changes applied via hot reload.

## More

To learn more before you start working with resonate, see the following documentation available online:
- [Quick Start](https://sdk.dfinity.org/docs/quickstart/quickstart.html)
- [SDK Developer Tools](https://sdk.dfinity.org/docs/developers-guide/sdk-guide.html)
- [Motoko Programming Language Guide](https://sdk.dfinity.org/docs/language-guide/motoko.html)
- [Motoko Language Quick Reference](https://sdk.dfinity.org/docs/language-guide/language-manual.html)

If the docs are not helping, these are other resources you can draw inspiration from:
- [Awesome DFINITY repository](https://github.com/dfinity/awesome-dfinity)
- [DFINITY examples](https://github.com/dfinity/examples)
- [LinkedUp](https://github.com/dfinity/linkedup)
- [motoko-sequence](https://github.com/matthewhammer/motoko-sequence)

If nothing helps and you are stuck, these are places you can go ask for guidance:
- [DFINITY forum](https://forum.dfinity.org/)

## Troubleshooting

### Replica error (code 3): IC0301

```
Replica error (code 3): IC0301: Canister ic:ryjl3-tyaaa-aaaaa-aaaba-cai not found.
```

Start the DFX network with:

```sh
dfx start --clean
```

The --clean option removes checkpoints and stale state information from your project’s cache so that you can restart the Internet Computer replica and web server processes in a clean state.

### How to upgrade the SDK

To [upgrade from a previous SDK version](https://sdk.dfinity.org/docs/developers-guide/install-upgrade-remove.html#_upgrading_to_the_latest_version), run:
```sh
dfx upgrade
```

For a clean installation instead of an upgrade, run:
```sh
~/.cache/dfinity/uninstall.sh && sh -ci "$(curl -sSL https://sdk.dfinity.org/install.sh)"
```
