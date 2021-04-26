// Note: Require the cpu and webgl backend and add them to package.json as peer dependencies.
require('@tensorflow/tfjs-node');
const cocoSsd = require('@tensorflow-models/coco-ssd');
const Bromise = require('bluebird');
const R = require('ramda');

const {createFolderFromClass} = require('./app/process/create-folder');
const {sendToDb} = require('./app/process/add-to-db');
const {moveFile, deleteFile} = require('./app/process/move-file');
const {imageListJpg} = require('./app/process/select-jpg');
const {readJpg} = require('./app/ia/filesystem');
const {addFileName, setNewBbox} = require('./app/process/modify-content');

const processFiles = (data) => {
  R.forEach((pred) => {
    createFolderFromClass(pred);
    sendToDb(pred);
    moveFile(data.path, pred.file, pred.class);
  }, data.prediction);
  deleteFile(data.path);
};

(async () => {
  const imgList = await Bromise.map(imageListJpg, readJpg);

  // Load the model.
  const model = await cocoSsd.load();

  // Classify the image.
  const predictions = await Bromise.map(imgList, async (x) => {
    const detection = await model.detect(x.jpg);
    return R.assoc('prediction', detection, x);
  });

  const main = R.pipe(
    R.map(addFileName),
    R.map(setNewBbox),
    R.values,
    R.forEach(processFiles)
  );

  main(predictions);
})();
