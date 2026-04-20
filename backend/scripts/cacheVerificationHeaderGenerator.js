const fs = require("fs");
const nanoidGenerator = require("nanoid").nanoid;

function cacheVerificationHeaderGenerator() {
  fs.writeFileSync(
    "./src/public/cacheVerificationHeader.json",
    JSON.stringify({
      etag: `W/"${nanoidGenerator()}"`,
      lastmod: new Date().toUTCString(),
    })
  );
}

cacheVerificationHeaderGenerator();
