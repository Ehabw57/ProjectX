const sharp = require("sharp");
const fs = require("fs");
function resizeImage(path, width, height) {
  const buffer = fs.readFileSync(path);
  return sharp(buffer).resize(width, height, {
    fit: "cover",
    position: "center",
  }).toFile(path);
}

module.exports = resizeImage;
