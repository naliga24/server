const log = require('../utilities/logUtility');
const { successResponseMapper } = require('../utilities/responseMapperUtility');

const logger = log('Token-Controller');
const tokenService = require('../service/tokenService');

const getTopTokens = async (req) => {
	try {
		const sentResult = await tokenService.getTopTokens(req);
		logger.info('Success getting Top Tokens');
		return await successResponseMapper(sentResult);
	} catch (error) {
		logger.error('Error getting Top Tokens controller', error.message);
		throw error;
	}
};

const getTokenMetadata = async (req) => {
	try {
		const sentResult = await tokenService.getTokenMetadata(req);
		logger.info('Success getting Tokens Metadata');
		return await successResponseMapper(sentResult);
	} catch (error) {
		logger.error('Error getting Tokens Metadata controller', error.message);
		throw error;
	}
};

const swapToken = async (req) => {
	try {
		const sentResult = await tokenService.swapToken(req);
		logger.info('Success swapping Tokens');
		return await successResponseMapper(sentResult);
	} catch (error) {
		logger.error('Error swapping Tokens controller', error.message);
		throw error;
	}
};

const getSwapTokensAvailable = async (req) => {
	try {
		const sentResult = await tokenService.getSwapTokensAvailable(req);
		logger.info('Success getSwap tokens available');
		return await successResponseMapper(sentResult);
	} catch (error) {
		logger.error('Error get Swap tokens available controller', error.message);
		throw error;
	}
};

const getQuotePrice = async (req) => {
	try {
		const sentResult = await tokenService.getQuotePrice(req);
		logger.info('Success Quote available');
		return await successResponseMapper(sentResult);
	} catch (error) {
		logger.error('Error Quote controller', error.message);
		throw error;
	}
};

const getTransactionApprove = async (req) => {
	try {
		const sentResult = await tokenService.getTransactionApprove(req);
		logger.info('Success getTransactionApprove');
		return await successResponseMapper(sentResult);
	} catch (error) {
		logger.error('Error getTransactionApprove', error.message);
		throw error;
	}
};

const getTransactionSwap = async (req) => {
	try {
		const sentResult = await tokenService.getTransactionSwap(req);
		logger.info('Success getTransactionSwap');
		return await successResponseMapper(sentResult);
	} catch (error) {
		logger.error('Error getTransactionSwap', error.message);
		throw error;
	}
};

const getHealthCheck = async (req) => {
	try {
		const sentResult = await tokenService.getHealthCheck(req);
		logger.info('Success getHealthCheck');
		return await successResponseMapper(sentResult);
	} catch (error) {
		logger.error('Error getHealthCheck', error.message);
		throw error;
	}
};

module.exports = {
	getTopTokens,
	getTokenMetadata,
	swapToken,
	getSwapTokensAvailable,
	getQuotePrice,
	getTransactionApprove,
	getTransactionSwap,
	getHealthCheck,
};
