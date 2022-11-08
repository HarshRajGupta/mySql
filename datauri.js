const dataUriParser = require('datauri/parser');
const path = require('path');

const getDataUri = (file) => {
	const parser = new dataUriParser();
	return parser.format(
		path.extname(file.originalname).toString(),
		file.buffer,
	);
};

module.exports = getDataUri;
