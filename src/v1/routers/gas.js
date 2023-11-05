const express = require("express");

const router = express.Router();
const log = require("../utilities/logUtility");
const { handleError } = require("../utilities/errorUtility");

const logger = log("Token-router");
const controller = require("../controller/gasController");

router.get("/getGasPriceByChainId", async (req, res, next) => {
  try {
    logger.info("request query :", req.query);
    const result = await controller.getGasPriceByChainId(req);
    res.status(result.code).json(result);
  } catch (error) {
    handleError(error, "Something went wrong!", next);
  }
});

module.exports = router;
