const R = require('ramda');
const fs = require('fs-extra');

const folderCreater = name => fs.mkdirSync(name, {recursive: true});

const createFolderFromClass = pred => folderCreater(R.prop('class', pred));

module.exports = {createFolderFromClass};
