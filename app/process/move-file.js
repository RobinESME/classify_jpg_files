const fs = require('fs-extra');

const {formatPath} = require('./add-to-db');

const moveFile = (oldPath, file, folder) =>
  fs.copyFileSync(oldPath, formatPath(folder, file));

const deleteFile = (path) => fs.unlinkSync(path);

module.exports = {moveFile, deleteFile};
