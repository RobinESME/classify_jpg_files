const fs = require('fs-extra');
const jpeg = require('jpeg-js');

const readJpg = async path => ({
	path,
	jpg: jpeg.decode(await fs.readFile(path), true)
});

module.exports = {readJpg};
