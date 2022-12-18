const fs = require("fs");

module.exports = {
  copyFile(sourcePath, destPath) {
    fs.createReadStream(__dirname + "/.." + sourcePath).pipe(fs.createWriteStream(destPath));
  },
};
