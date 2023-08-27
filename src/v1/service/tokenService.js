const log = require('../utilities/logUtility');
const axios = require('axios');
require('dotenv').config();
const apiBaseUrl = 'https://api.1inch.dev/token/v1.2/';
const logger = log('Token-Service');

axios.defaults.headers.common = {
	'Authorization': `Bearer ${process.env.ONEINCH_API_KEY}`,
	'Content-Type': 'application/json',
  };

const apiRequestUrl = (chainId, methodName, queryParams) => {
	return apiBaseUrl + chainId + methodName + '?' + (new URLSearchParams(queryParams))?.toString();
}

const getTokensByChainId = async (req) => {
	try {
		const { chainId } = req.query;
		const url = apiRequestUrl(chainId);
		const response = await axios.get(url).then(res => {
			return res.data;
		});
		return response;
	} catch (error) {
		logger.error('Error getTokensByChainId', error.message);
		throw error;
	}
};

const getTokenByAddress = async (req) => {
	try {
		const { chainId, address } = req.query;
		const url = apiRequestUrl(chainId, `/custom/${address}`);
		console.log("getTokenByAddress=>", url, process.env.ONEINCH_API_KEY);
		const response = await axios.get(url).then(res => {
			return res.data;
		});
		console.log("getTokenByAddress=>", url, response);
		return response;
	} catch (error) {
		logger.error('Error getTokenByAddress', error.message);
		throw error;
	}
};

module.exports = {
	getTokensByChainId,
	getTokenByAddress,
};
