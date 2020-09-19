const fs = require("fs");
const path = require("path");

const App = require("./build/ssr/App.js");

const { html, css } = App.render();
const globalCss = fs.readFileSync(
  path.join(__dirname, "public/global.css"),
  "utf8"
);

const htmlWrapper = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />

    <title>REX pancake</title>

    <link rel="stylesheet" href="global.css" />
    <link rel="stylesheet" href="style.css" />
  </head>

  <body>${html}</body>
</html>`.trim();

fs.mkdirSync(path.join(__dirname, "build/web"), { recursive: true });
fs.writeFileSync(path.join(__dirname, "build/web/index.html"), htmlWrapper);
fs.writeFileSync(path.join(__dirname, "build/web/global.css"), globalCss);
fs.writeFileSync(path.join(__dirname, "build/web/style.css"), css.code);

const svgWrapper = `
<svg xmlns="http://www.w3.org/2000/svg">
  <foreignObject width="100%" height="100%">
    <body xmlns="http://www.w3.org/1999/xhtml">
      <style>
        ${globalCss}
        body {
          background: #eee;
          max-width: none;
        }
        ${css.code}
      </style>
      ${html.replace(/<svg/g, `<svg xmlns="http://www.w3.org/2000/svg"`)}
    </body>
  </foreignObject>
</svg>`.trim();

fs.mkdirSync(path.join(__dirname, "build/readme"), { recursive: true });
fs.writeFileSync(path.join(__dirname, "build/readme/chart.svg"), svgWrapper);
