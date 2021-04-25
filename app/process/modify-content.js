const R = require('ramda');

const {randomFileName} = require('./random-file-name');

const addFileName = data =>
	R.set(
		R.lensProp('prediction'),
		R.map(pred => R.assoc('file', randomFileName(), pred), data.prediction),
		data
	);

const setNewBbox = data =>
	R.set(
		R.lensProp('prediction'),
		R.map(
			pred =>
				R.set(
					R.lensProp('bbox'),
					[
						Number(R.divide(pred.bbox[0], data.jpg.width).toFixed(3)),
						Number(R.divide(pred.bbox[1], data.jpg.height).toFixed(3)),
						Number(R.divide(pred.bbox[2], data.jpg.width).toFixed(3)),
						Number(R.divide(pred.bbox[3], data.jpg.height).toFixed(3))
					],
					pred
				),
			data.prediction
		),
		data
	);

module.exports = {addFileName, setNewBbox};
