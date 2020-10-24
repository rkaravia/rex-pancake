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

    <style>
      #forkongithub {
        padding: 16px;
        padding-bottom: 0;
        pointer-events: none;
      }
      #forkongithub a {
        display: block;
        background: #000;
        color: #fff;
        text-decoration: none;
        text-align: center;
        font-weight: bold;
        padding: 5px 40px;
        font-size: 1rem;
        line-height: 2rem;
        position: relative;
        transition: 0.5s;
        pointer-events: all;
        box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.8);
      }
      #forkongithub a:hover {
        background: #c11;
        color: #fff;
      }
      #forkongithub a::before,
      #forkongithub a::after {
        content: "";
        width: 100%;
        display: block;
        position: absolute;
        top: 1px;
        left: 0;
        height: 1px;
        background: #fff;
      }
      #forkongithub a::after {
        bottom: 1px;
        top: auto;
      }
      #forkongithub svg {
        width: 16px;
        height: 16px;
        vertical-align: middle;
        fill-rule: evenodd;
        clip-rule: evenodd;
        stroke-linejoin: round;
        stroke-miterlimit: 2;
      }
      @media screen and (min-width: 550px) {
        #forkongithub {
          position: fixed;
          top: 0;
          right: 0;
          width: 200px;
          height: 200px;
          margin: 0;
          z-index: 9999;
        }
        #forkongithub a {
          width: 200px;
          position: absolute;
          top: 60px;
          right: -60px;
          transform: rotate(45deg);
        }
      }
    </style>
  </head>

  <body>
    <div id="forkongithub">
      <a href="https://github.com/rkaravia/rex-pancake">
        Fix, Fork, Contribute
        <svg viewBox="0 0 136 133">
          <g transform="matrix(3.92891,0,0,3.92891,67.867,129.125)">
            <path
              d="M0,-31.904C-8.995,-31.904 -16.288,-24.611 -16.288,-15.614C-16.288,-8.417 -11.621,-2.312 -5.148,-0.157C-4.333,-0.008 -4.036,-0.511 -4.036,-0.943C-4.036,-1.329 -4.05,-2.354 -4.058,-3.713C-8.589,-2.729 -9.545,-5.897 -9.545,-5.897C-10.286,-7.779 -11.354,-8.28 -11.354,-8.28C-12.833,-9.29 -11.242,-9.27 -11.242,-9.27C-9.607,-9.155 -8.747,-7.591 -8.747,-7.591C-7.294,-5.102 -4.934,-5.821 -4.006,-6.238C-3.858,-7.29 -3.438,-8.008 -2.972,-8.415C-6.589,-8.826 -10.392,-10.224 -10.392,-16.466C-10.392,-18.244 -9.757,-19.698 -8.715,-20.837C-8.883,-21.249 -9.442,-22.905 -8.556,-25.148C-8.556,-25.148 -7.188,-25.586 -4.076,-23.478C-2.777,-23.84 -1.383,-24.02 0.002,-24.026C1.385,-24.02 2.779,-23.84 4.08,-23.478C7.19,-25.586 8.555,-25.148 8.555,-25.148C9.444,-22.905 8.885,-21.249 8.717,-20.837C9.761,-19.698 10.392,-18.244 10.392,-16.466C10.392,-10.208 6.583,-8.831 2.954,-8.428C3.539,-7.925 4.06,-6.931 4.06,-5.411C4.06,-3.234 4.04,-1.477 4.04,-0.943C4.04,-0.507 4.333,0 5.16,-0.159C11.628,-2.318 16.291,-8.419 16.291,-15.614C16.291,-24.611 8.997,-31.904 0,-31.904"
              fill="#fff"
            />
          </g>
        </svg>
      </a>
    </div>
    <main>${html}</main>
  </body>
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
        }
        main {
          max-width: none;
        }
        ${css.code}
      </style>
      <main>
        ${html.replace(/<svg/g, `<svg xmlns="http://www.w3.org/2000/svg"`)}
      </main>
    </body>
  </foreignObject>
</svg>`.trim();

fs.mkdirSync(path.join(__dirname, "build/readme"), { recursive: true });
fs.writeFileSync(path.join(__dirname, "build/readme/chart.svg"), svgWrapper);
