# Mediolano.app

<h4 align="center">
  <a href="https://mediolano.app/">Website</a> |
  <a href="#">Demo Dapp (Soon)</a>
</h4>

In today’s ever-evolving digital world, protecting and managing intellectual property (IP) has become a critical challenge. From journalists to art collectors, new technologies are making it safer and more efficient to tokenize IP, enabling licensing, trading, distributing royalties, and more.

Mediolano offers an innovative platform that empowers content creators, from authors to journalists and publishers, to participate in the global information marketplace. Our mission is to transform the industry by providing transparency, immutability, security, optimization, and a range of innovative features to build, manage, and monetize IP.

Powered by Starknet

Before you begin, you need to install the following tools:

- [Node (>= v18.17)](https://nodejs.org/en/download/)
- Yarn ([v1](https://classic.yarnpkg.com/en/docs/install/) or [v2+](https://yarnpkg.com/getting-started/install))
- [Git](https://git-scm.com/downloads)
- [Rust](https://www.rust-lang.org/tools/install)
- [asdf](https://asdf-vm.com/guide/getting-started.html)
- [Cairo 1.0 extension for VSCode](https://marketplace.visualstudio.com/items?itemName=starkware.cairo1)

### Starknet-devnet version

To ensure the proper functioning of scaffold-stark, your local `starknet-devnet` version must be `0.0.4`. To accomplish this, first check your local starknet-devnet version:

```sh
starknet-devnet --version
```

If your local starknet-devnet version is not `0.0.4`, you need to install it.

```bash
cargo install starknet-devnet --version 0.0.4
```

### Scarb version

To ensure the proper functioning of scaffold-stark, your local `Scarb` version must be `2.6.5`. To accomplish this, first check your local Scarb version:

```sh
scarb --version
```

If your local Scarb version is not `2.6.5`, you need to install it.

- Install Scarb `2.6.5` via `asdf` ([instructions](https://docs.swmansion.com/scarb/download.html#install-via-asdf)).

### Starknet Foundry version

To ensure the proper functioning of the tests on scaffold-stark, your Starknet Foundry version must be 0.27.0. To accomplish this, first check your Starknet Foundry version:

```sh
snforge --version
```

If your Starknet Foundry version is not `0.27.0`, you need to install it.

- Install Starknet Foundry `0.27.0` via `asdf` ([instructions](https://foundry-rs.github.io/starknet-foundry/getting-started/installation.html#installation-via-asdf)).

### Compatible versions

- Starknet-devnet - v0.0.4
- Scarb - v2.6.5
- Snforge - v0.27.0
- Cairo - v2.6.4
- Rpc - v0.7.0    

Make sure you have the compatible versions otherwise refer to [Scaffold-Stark Requirements](https://github.com/Scaffold-Stark/scaffold-stark-2?.tab=readme-ov-file#requirements)

Then download the your computer and install dependencies by running:

```sh
git clone https://github.com/mediolano-app/mediolano-stark.git mediolano-stark
cd mediolano-stark
yarn add lucide-react
yarn install
```

> in the same terminal, start your local network (a local instance of a blockchain):

```bash
yarn chain
```

> in a second terminal window, 🛰 deploy your contract (locally):

```sh
cd mediolano-stark
yarn deploy
```

> in a third terminal window, start your 📱 frontend:

```sh
cd mediolano-stark
yarn start
```

📱 Open [http://localhost:3000](http://localhost:3000) to see the app.

---

Deploy your NextJS App

```shell
yarn vercel
```

> Follow the steps to deploy to Vercel. Once you log in (email, github, etc), the default options should work. It'll give you a public URL.

> If you want to redeploy to the same production URL you can run `yarn vercel --prod`. If you omit the `--prod` flag it will deploy it to a preview/test URL.

⚠️ Run the automated testing function to make sure your app passes

```shell
yarn test
```

#### Configuration of Third-Party Services for Production-Grade Apps

By default, scaffold-stark provides predefined Open API endpoint for some services such as Blast. This allows you to begin developing and testing your applications more easily, avoiding the need to register for these services. For production-grade applications, it's recommended to obtain your own API keys (to prevent rate limiting issues). You can configure these at:

🔷 `RPC_URL_SEPOLIA` variable in `packages/snfoundry/.env` and `packages/nextjs/.env.local`. You can create API keys from the [Alchemy dashboard](https://dashboard.alchemy.com/).

> 💬 Hint: It's recommended to store env's for nextjs in Vercel/system env config for live apps and use .env.local for local testing.
