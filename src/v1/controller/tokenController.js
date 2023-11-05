const log = require("../utilities/logUtility");
const { successResponseMapper } = require("../utilities/responseMapperUtility");

const logger = log("Token-Controller");
const service = require("../service/tokenService");

const getTokensByChainId = async (req) => {
  try {
    const sentResult = await service.getTokensByChainId(req);
    logger.info("Success getTokensByChainId");
    return await successResponseMapper(sentResult);
  } catch (error) {
    logger.error("Error getTokensByChainId", error.message);
    throw error;
  }
};

const getTokenByAddress = async (req) => {
  try {
    const sentResult = await service.getTokenByAddress(req);
    logger.info("Success getTokenByAddress");
    return await successResponseMapper(sentResult);
  } catch (error) {
    logger.error("Error getTokenByAddress", error.message);
    throw error;
  }
};

module.exports = {
  getTokensByChainId,
  getTokenByAddress,
};
