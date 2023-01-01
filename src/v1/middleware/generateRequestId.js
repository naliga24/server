const httpContext = require('express-http-context');
const { v4: uuidv4 } = require('uuid');

module.exports = {
	generateRequestId: (req, res, next) => {
		const requestId = uuidv4();
		httpContext.set('requestId', requestId);
		next();
	},
};
