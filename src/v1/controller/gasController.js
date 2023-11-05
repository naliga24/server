const log = require("../utilities/logUtility");
const { successResponseMapper } = require("../utilities/responseMapperUtility");

const logger = log("Token-Controller");
const service = require("../service/gasService");

const getGasPriceByChainId = async (req) => {
  try {
    const sentResult = await service.getGasPriceByChainId(req);
    logger.info("Success getGasPriceByChainId");
    return await successResponseMapper(sentResult);
  } catch (error) {
    logger.error("Error getGasPriceByChainId", error.message);
    throw error;
  }
};

module.exports = {
  getGasPriceByChainId,
};
