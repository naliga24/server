const log = require('../utilities/logUtility');

const logger = log('Request-MiddleWare');

module.exports = {
	printReq: (req, res, next) => {
		logger.info(' Request ---> ', req.method, req.originalUrl);
		next();
	},
};
