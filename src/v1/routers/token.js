const express = require('express');

const router = express.Router();
const log = require('../utilities/logUtility');
const { handleError } = require('../utilities/errorUtility');

const logger = log('Token-router');
const { middlewareValidation } = require('../middleware/middlewareValidation');
const tokenController = require('../controller/tokenController');

router.get('/testApi', async (req, res, next) => {
	try {
		res.status(200).json({data:"calling api working!!"});
	} catch (error) {
		handleError(error, "Something went wrong!", next);
	}
});

router.get('/getTopTokens', async (req, res, next) => {
	try {
		logger.info('request body :', req.body);
		const result = await tokenController.getTopTokens(req);
		res.status(result.code).json(result);
	} catch (error) {
		handleError(error, "Something went wrong!", next);
	}
});

router.get('/getTokenMetadata', middlewareValidation, async (req, res, next) => {
	try {
		logger.info('request body :', req.body);
		const result = await tokenController.getTokenMetadata(req);
		res.status(result.code).json(result);
	} catch (error) {
		handleError(error, "Something went wrong!", next);
	}
});

router.post('/swapToken', async (req, res, next) => {
	try {
		logger.info('request body :', req.body);
		const result = await tokenController.swapToken(req);
		res.status(result.code).json(result);
	} catch (error) {
		handleError(error, "Something went wrong!", next);
	}
});

router.get('/swapTokensAvailable', async (req, res, next) => {
	try {
		logger.info('request query :', req.query);
		const result = await tokenController.getSwapTokensAvailable(req);
		res.status(result.code).json(result);
	} catch (error) {
		handleError(error, "Something went wrong!", next);
	}
});

router.post('/quotePrice', async (req, res, next) => {
	try {
		logger.info('request body :', req.body);
		const result = await tokenController.getQuotePrice(req);
		res.status(result.code).json(result);
	} catch (error) {
		handleError(error, "Something went wrong!", next);
	}
});

router.post('/getTransactionApprove', async (req, res, next) => {
	try {
		logger.info('request body :', req.body);
		const result = await tokenController.getTransactionApprove(req);
		res.status(result.code).json(result);
	} catch (error) {
		handleError(error, "Something went wrong!", next);
	}
});

router.post('/getTransactionSwap', async (req, res, next) => {
	try {
		logger.info('request body :', req.body);
		const result = await tokenController.getTransactionSwap(req);
		res.status(result.code).json(result);
	} catch (error) {
		handleError(error, "Something went wrong!", next);
	}
});

router.get('/healthcheck', async (req, res, next) => {
	try {
		logger.info('request query :', req.query);
		const result = await tokenController.getHealthCheck(req);
		res.status(result.code).json(result);
	} catch (error) {
		handleError(error, "Something went wrong!", next);
	}
});

module.exports = router;
