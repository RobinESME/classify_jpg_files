const R = require('ramda');
const fs = require('fs-extra');

const isJpg = x => R.includes('.jpg', x);

const addCurrentFolder = x => R.map(R.concat('./images/'), x);

const filterJpgFiles = R.pipe(R.filter(isJpg), addCurrentFolder);

const imageListJpg = filterJpgFiles(fs.readdirSync('./images'));

module.exports = {imageListJpg};
