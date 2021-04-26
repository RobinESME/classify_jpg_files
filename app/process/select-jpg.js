const R = require('ramda');
const fs = require('fs-extra');

const isJpg = (x) => R.includes('.jpg', x);

const filterJpgFiles = R.pipe(R.filter(isJpg), R.map(R.concat('./images/')));

const imageListJpg = filterJpgFiles(fs.readdirSync('./images'));

module.exports = {imageListJpg};
