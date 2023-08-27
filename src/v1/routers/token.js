const express = require('express');

const router = express.Router();
const log = require('../utilities/logUtility');
const { handleError } = require('../utilities/errorUtility');

const logger = log('Token-router');
const { middlewareValidation } = require('../middleware/middlewareValidation');
const controller = require('../controller/tokenController');

router.get('/testApi', async (req, res, next) => {
	try {
		res.status(200).json({data:"calling api working!!"});
	} catch (error) {
		handleError(error, "Something went wrong!", next);
	}
});

router.get('/getTokensByChainId', async (req, res, next) => {
	try {
		logger.info('request query :', req.query);
		const result = await controller.getTokensByChainId(req);
		res.status(result.code).json(result);
	} catch (error) {
		handleError(error, "Something went wrong!", next);
	}
});

router.get('/getTokenByAddress', async (req, res, next) => {
	try {
		logger.info('request query :', req.query);
		const result = await controller.getTokenByAddress(req);
		res.status(result.code).json(result);
	} catch (error) {
		handleError(error, "Something went wrong!", next);
	}
});

module.exports = router;
