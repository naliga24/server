const log = require('../utilities/logUtility');
const axios = require('axios');
const Web3 = require('web3');
require('dotenv').config();
const broadcastApiUrl = (chainId) => 'https://tx-gateway.1inch.io/v1.1/' + chainId + '/broadcast';
const apiBaseUrl = 'https://api.1inch.io/v5.0/';
const logger = log('Token-Service');

const getTopTokens = async () => {
	try {
		const result = {};
		const response = await axios.get('https://sandbox-api.coinmarketcap.com/v1/cryptocurrency/listings/latest', {
			headers: {
				'X-CMC_PRO_API_KEY': process.env.COIN_MARKET_CAP_KEY,
				'Accepts': 'application/json',
			},
			params: {
				start: 1,
				limit: 100,
				convert: "USD,ETH",
				sort: "market_cap",
				cryptocurrency_type: "tokens"

			}
		});
		result.message = 'Get top tokens complete.';
		result.data = response.data;

		return result;
	} catch (error) {
		logger.error('Error getting Top Tokens service', error.message);
		throw error;
	}
};

const getTokenMetadata = async (req) => {
	try {
		const result = {};
		const { Moralis } = req;

		const options = {
			chain: "eth",
			addresses: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
		};
		const tokenMetadata = await Moralis.Web3API.token.getTokenMetadata(options);
		result.message = 'Get Tokens Metadata complete.';
		result.tokenData = tokenMetadata;

		return result;
	} catch (error) {
		logger.error('Error getting Tokens Metadata service', error.message);
		throw error;
	}
};

function apiRequestUrl(chainId, methodName, queryParams) {
	return apiBaseUrl + chainId + methodName + '?' + (new URLSearchParams(queryParams)).toString();
}

async function checkAllowance(chainId, tokenAddress, walletAddress) {
	const allowance = await axios.get(apiRequestUrl(chainId, '/approve/allowance', { tokenAddress, walletAddress }))
		.then(res => res.data.allowance);
	return allowance;
}

async function signAndSendTransaction(privateKey, web3RpcUrl, chainId, transaction) {
	const web3 = new Web3(web3RpcUrl);
	const { rawTransaction } = await web3.eth.accounts.signTransaction(transaction, privateKey);
	const response = await broadCastRawTransaction(chainId, rawTransaction);
	return response;
}

async function broadCastRawTransaction(chainId, rawTransaction) {
	const transactionHash = await axios({
		url: broadcastApiUrl(chainId),
		method: 'post',
		headers: { 'Content-Type': 'application/json' },
		data: { rawTransaction: rawTransaction },
	})
		.then(res => res.data.transactionHash).catch(err => console.log(err));
	return transactionHash;
}

async function buildTxForApproveTradeWithRouter(web3RpcUrl, chainId, tokenAddress, amount, walletAddress) {
	const web3 = new Web3(web3RpcUrl);
	const url = apiRequestUrl(
		chainId,
		'/approve/transaction',
		amount ? { tokenAddress, amount } : { tokenAddress }
	);
	const transaction = await axios.get(url).then(res => res.data);

	const gasLimit = await web3.eth.estimateGas({
		to: transaction.to,
		data: transaction.data,
		from: walletAddress
	});

	return {
		...transaction,
		gas: gasLimit
	};
}

async function buildTxForSwap(chainId, swapParams) {
	const url = apiRequestUrl(chainId, '/swap', swapParams);
	const response = await axios.get(url,{
        validateStatus: function () {
          return true;
        },
      }).then(res => {
		if(res?.data?.tx){
         return res.data.tx;
		}
		return res.data;
	});
	return response;
}

const getSwapTokensAvailable = async (req) => {
	try {
		const { chainId } = req.query
		// const response = await axios.get(`https://api.1inch.io/v4.0/${chainId}/tokens`);
		// return response.data

		const url = apiRequestUrl(chainId, '/tokens');
		const response = await axios.get(url).then(res => {
			return res.data;
		});
		return response;
	} catch (error) {
		logger.error('Error get Swap tokens available service', error.message);
		throw error;
	}
};

const getQuotePrice = async (req) => {
	try {
		const { fromToken, toToken, walletAddress, amount, chainId, fee } = req.body;

		const swapParams = {
			fromTokenAddress: fromToken.address,
			toTokenAddress: toToken.address,
			amount,
			fromAddress: walletAddress,
			slippage: 1,
			disableEstimate: false,
			allowPartialFill: false,
			fee,
		};

		const url = apiRequestUrl(chainId, '/quote', swapParams);
		const response = await axios.get(url).then(res => {
			return res.data;
		});
		return response;
	} catch (error) {
		logger.error('Error get Quote service', error.message);
		throw error;
	}
};

const getTransactionApprove = async (req) => {
	try {
		const { fromToken, walletAddress, amount, chainId, web3RpcUrl: { changeNetworkParam: { rpcUrls: [rpcUrl] } } } = req.body;

		const response = await buildTxForApproveTradeWithRouter(rpcUrl, chainId, fromToken.address, amount, walletAddress);
		return response;
	} catch (error) {
		logger.error('Error getTransactionApprove', error.message);
		throw error;
	}
};

const getTransactionSwap = async (req) => {
	try {
		const { fromToken, toToken, walletAddress, destReceiver, amount, chainId, referrerAddress, fee } = req.body;
		const swapParams = {
			fromTokenAddress: fromToken.address,
			toTokenAddress: toToken.address,
			amount,
			fromAddress: walletAddress,
			destReceiver, 
			slippage: 1,
			disableEstimate: false,
			allowPartialFill: false,
			referrerAddress,
			fee,
		};
		const response = await buildTxForSwap(chainId, swapParams);
		return response;
	} catch (error) {
		logger.error('Error getTransactionSwap', error.message);
		throw error;
	}
};

const getHealthCheck = async (req) => {
	try {
		const { chainId } = req.query;
		const url = apiRequestUrl(chainId, '/healthcheck');
		const response = await axios.get(url).then(res => {
			return res.data;
		});
		return response;
	} catch (error) {
		logger.error('Error getHealthCheck', error.message);
		throw error;
	}
};

module.exports = {
	checkAllowance,
	signAndSendTransaction,
	getTopTokens,
	getTokenMetadata,
	getSwapTokensAvailable,
	getQuotePrice,
	getTransactionApprove,
	getTransactionSwap,
	getHealthCheck,
};
