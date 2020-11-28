# resonate

res(o)nate is a decentralized music curation platform that allows artists to distribute new releases to playlist curators without intermediaries.

## development

To get started, you might want to explore the project directory structure and install required tools:
- [Git](https://git-scm.com/downloads)
- [Node.js](https://nodejs.org/en/download/)
- [nvm](https://github.com/nvm-sh/nvm)
- [DFINITY SDK](https://sdk.dfinity.org/)

Clone this repo first running:

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

And deploy project canisters to the local network:

```sh
dfx deploy
```

This command, if successful, will display canister identifiers information, similar to the following:

```
Installing code for canister resonate, with canister_id 75hes-oqbaa-aaaaa-aaaaa-aaaaa-aaaaa-aaaaa-q
Installing code for canister resonate_assets, with canister_id cxeji-wacaa-aaaaa-aaaaa-aaaaa-aaaaa-aaaaa-q
```

You can now test the frontend in the browser by visiting the following URL, appending the `canister_id` from the `resonate_assets` canister to it:

```
http://127.0.0.1:8000/?canisterId=
```

To test your changes, you will need to re-deploy with `dfx deploy`.

> **NOTE:** Working with this project in your development environment will not affect any production deployment or identity tokens.

## more

To learn more before you start working with resonate, see the following documentation available online:

- [Quick Start](https://sdk.dfinity.org/docs/quickstart/quickstart.html)
- [SDK Developer Tools](https://sdk.dfinity.org/docs/developers-guide/sdk-guide.html)
- [Motoko Programming Language Guide](https://sdk.dfinity.org/docs/language-guide/motoko.html)
- [Motoko Language Quick Reference](https://sdk.dfinity.org/docs/language-guide/language-manual.html)
