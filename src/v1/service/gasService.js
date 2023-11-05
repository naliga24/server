const log = require("../utilities/logUtility");
const axios = require("axios");
require("dotenv").config();
const apiBaseUrl = "https://api.1inch.dev/gas-price/v1.4/";
const logger = log("Token-Service");

axios.defaults.headers.common = {
  Authorization: `Bearer ${process.env.ONEINCH_API_KEY}`,
  "Content-Type": "application/json",
};

const apiRequestUrl = (chainId, methodName, queryParams) => {
  return (
    apiBaseUrl +
    chainId +
    methodName +
    "?" +
    new URLSearchParams(queryParams)?.toString()
  );
};

const getGasPriceByChainId = async (req) => {
  try {
    const { chainId } = req.query;
    const url = apiRequestUrl(chainId, "/");
    console.log("getGasPriceByChainId=>", url, process.env.ONEINCH_API_KEY);
    const response = await axios.get(url).then((res) => {
      return res.data;
    });
    console.log("getGasPriceByChainId=>", url, response);
    return response;
  } catch (error) {
    logger.error("Error getGasPriceByChainId", error.message);
    throw error;
  }
};

module.exports = {
  getGasPriceByChainId,
};
