const fs = require("fs");

module.exports = {
  copyFile(sourcePath, destPath) {
    fs.createReadStream(__dirname + "/.." + sourcePath).pipe(fs.createWriteStream(destPath));
  },

  createFile(data, path, callback) {
    return fs.writeFileSync(data, path, callback);
  },
};
