const Moralis = require("moralis/node");

const log = require('../utilities/logUtility');

const logger = log('Middleware-Validation');

// const errorAgent = require('../models/error/errorModel');
const { handleError } = require('../utilities/errorUtility');

module.exports = {
	middlewareValidation: async (req, res, next) => {
		try {
			// const token = req.headers.authorization;
			// if (!token) throw new errorAgent.UnauthorizedError('There is not token including this request.');
			await Moralis.start({ serverUrl: process.env.MORALIS_SERVER_URL, appId: process.env.MORALIS_APP_ID, masterKey: process.env.MORALIS_MASTER_KEY });
			logger.info("Middleware validation pass");
			console.log("moralis=>", Moralis);
			req.Moralis = Moralis;
			next();
		} catch (error) {
			logger.error('Cannot validate this request')
			handleError(
				error,
				"Cannot validate this request",
				next
			);
		}
	},
};
