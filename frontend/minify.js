import { minify } from "minify";
import tryToCatch from "try-to-catch";
import urlJoin from "url-join";
import fs from "fs";

const errorPageInputDir = "./public/error-page/";
const errorPageOutputDir = "./build/error-page/";
const errorPageFileName = ["error.html", "error.css", "error.js"];

const noscriptPageInputDir = "./public/noscript-page/";
const noscriptPageOutputDir = "./build/noscript-page/";
const noscriptPageFileName = ["noscript.html", "noscript.css"];

const options = {
  js: {
    type: "putout",
    putout: {
      quote: "'",
      mangle: true,
      mangleClassNames: true,
      removeUnusedVariables: true,
      removeConsole: false,
      removeUselessSpread: true,
    },
  },
  html: {
    removeComments: true,
    removeCommentsFromCDATA: true,
    removeCDATASectionsFromCDATA: true,
    collapseWhitespace: true,
    collapseBooleanAttributes: true,
    removeAttributeQuotes: true,
    removeRedundantAttributes: true,
    useShortDoctype: true,
    removeEmptyAttributes: true,
    removeEmptyElements: false,
    removeOptionalTags: true,
    removeScriptTypeAttributes: true,
    removeStyleLinkTypeAttributes: true,
    minifyJS: true,
    minifyCSS: true,
  },
  css: {
    type: "clean-css",
    "clean-css": {
      compatibility: "*",
    },
  },
};

const errorPageInput = errorPageFileName.map((name) =>
  urlJoin(errorPageInputDir, name)
);
const errorPageOutput = errorPageFileName.map((name) =>
  urlJoin(errorPageOutputDir, name)
);

const noscriptPageInput = noscriptPageFileName.map((name) =>
  urlJoin(noscriptPageInputDir, name)
);
const noscriptPageOutput = noscriptPageFileName.map((name) =>
  urlJoin(noscriptPageOutputDir, name)
);

errorPageInput.forEach(async (input, index) => {
  const [error, data] = await tryToCatch(minify, input, options);

  if (error) console.error(error.message);

  try {
    fs.writeFileSync(errorPageOutput[index], data);
  } catch (error) {
    console.error(error.message);
  }
});

noscriptPageInput.forEach(async (input, index) => {
  const [error, data] = await tryToCatch(minify, input, options);

  if (error) console.error(error.message);

  try {
    fs.writeFileSync(noscriptPageOutput[index], data);
  } catch (error) {
    console.error(error.message);
  }
});
