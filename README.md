## About

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

It is made to show an up-to-date example of how I develop.

Here are some requirements, which were set for this project:
- create at least 2 pages: list page and details page
- use [The Star Wars API](https://swapi.dev/) for requests
- list page should have a search and pagination
- details page should have non-direct data of the main item \
  (e.g. if person has a vehicle id, then show some relevant info of that vehicle as well)
- API has no images, so find another way to show relevant images
- use Material UI for styling

## Getting Started

First, clone the repo:

```bash
git clone git@github.com:primetwig/explorer.git
```

Then go to the project:

```bash
cd ./explorer
```

And install all deps:

```bash
npm ci
# or
yarn
```

Now you have 2 options:

Option 1 is to run a development server:

```bash
npm run dev
# or
yarn dev
```

Option 2 is to make a build and run it:

```bash
npm run build
npm run start
# or
yarn build
yarn start
```

Either option will bring up the local server, which you can use.

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
