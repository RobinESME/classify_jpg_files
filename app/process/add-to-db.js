const Datastore = require('nedb');

const database = './database.txt';

const formatPath = (folder, file) => folder + '/' + file;

const db = new Datastore({filename: database});
db.loadDatabase();

const senderDb = (result, bbox, score, path) =>
  db.insert({
    class: result,
    x: bbox[0],
    y: bbox[1],
    width: bbox[2],
    height: bbox[3],
    score,
    path
  });

const sendToDb = (pred) =>
  senderDb(
    pred.class,
    pred.bbox,
    Number(pred.score.toFixed(3)),
    formatPath(pred.class, pred.file)
  );

module.exports = {sendToDb, formatPath};
