# REX Pancake

A simple [pancake](https://github.com/Rich-Harris/pancake) example that has been presented at
[Svelte Society Day France](https://france.sveltesociety.dev/).

⚡ **[JavaScript-free demo of the result](https://labs.karavia.ch/rex-pancake/)**

## Get started

Install the dependencies...

```bash
cd svelte-app
npm install
```

...then start [Rollup](https://rollupjs.org):

```bash
npm run dev
```

Navigate to [localhost:5000](http://localhost:5000). You should see your app running. Edit a component file in `src`, save it, and reload the page to see your changes.

## Server-side Rendering

To create a JavaScript-free version of the chart in `build/web`, run:

```bash
npm run build
```

## Embedding on GitHub

Sindre Sorhus [discovered](https://github.com/sindresorhus/css-in-readme-like-wat) that SVGs with HTML/CSS inside can be embedded in GitHub READMEs.

The trick is based on SVG's obscure
[\<foreignObject\>](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/foreignObject)
element and makes it possible to show a responsive version of the chart right here.

This is probably not a good idea, but here goes:

<img src="build/readme/chart.svg" width="1000" height="400">
