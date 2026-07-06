const fs = require("fs");
const { randomBytes } = require('node:crypto');

function cacheVerificationHeaderGenerator() {
  fs.writeFileSync(
    "./src/public/cacheVerificationHeader.json",
    JSON.stringify({
      etag: `W/"${randomBytes(16).toString('base64url')}"`,
      lastmod: new Date().toUTCString(),
    })
  );
}

cacheVerificationHeaderGenerator();
