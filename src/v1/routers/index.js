const express = require('express');

const router = express.Router();

const { errorResponseMapper } = require('../utilities/responseMapperUtility');
const generateRequestIdObj = require('../middleware/generateRequestId');
const { printReq } = require('../middleware/printRequest');
const swapRouter = require('./swap');
const tokensRouter = require('./token');

// * Add middle ware
router.use(generateRequestIdObj.generateRequestId);
router.use(printReq);

// * Add api
router.use('/swap', swapRouter);
router.use('/token', tokensRouter);

// eslint-disable-next-line no-unused-vars
router.use(async (err, req, res, next) => {
	const { statusCode, detail, message } = err;
	const errorObj = await errorResponseMapper(statusCode, detail, message);

	res.status(errorObj.code).json(errorObj);
});

module.exports = router;
