/* eslint-disable max-len */
const logger = require('./logUtility');

const log = logger('responseMapperUtility');

const { SuccessResponse, ErrorResponse, PagingResult } = require('../../configs/responseConfig');
const errorCustom = require('../models/error/errorModel');

const successResponseMapper = async (data) => {
	try {
		const successRes = new SuccessResponse();
		successRes.payload = data || {};

		return successRes;
	} catch (error) {
		log.error('successResponseMapper Util', error.message);
		throw error;
	}
};

const errorResponseMapper = async (code, message, detail) => {
	try {
		/*
        	Swap real error message to property detail and
        	message property will get data being sentence to show at FE from router layer.
    	*/
		let errorRes = new ErrorResponse();
		errorRes = {
			...errorRes,
			code,
			message,
			detail,
		};

		return errorRes;
	} catch (error) {
		log.error('errorResponseMapper Util', error.message);
		throw error;
	}
};

/**
 * For mapping data to front-end with paginate
 * @param {'*'} data The data value must contain keys are total and data. If there are no both thing,It will throw Error;
 */
const successResponsePagiateMapper = async (data) => {
	try {
		const keysInData = Object.keys(data);
		if (!(keysInData.includes('total') && keysInData.includes('data'))) {
			throw new errorCustom.CustomErrorHandler(500, 'Properties does not contain keys that method need.');
		}

		const pagingRes = new PagingResult();
		pagingRes.total = data.total;
		pagingRes.data = data.data;

		const successRes = new SuccessResponse();
		successRes.payload = pagingRes;

		return successRes;
	} catch (error) {
		log.error('successResponsePagiateMapper Util', error.message);
		throw error;
	}
};

module.exports = {
	successResponseMapper,
	errorResponseMapper,
	successResponsePagiateMapper,
};
