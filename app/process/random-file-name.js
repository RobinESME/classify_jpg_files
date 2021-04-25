const R = require('ramda');
const uuid = require('uuid');

const randomFileName = () => R.concat(uuid.v4(), '.jpg');

module.exports = {randomFileName};
