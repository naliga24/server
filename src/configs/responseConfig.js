/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-expressions */
class ResponseMain {
	constructor() {
		this.code;
		this.status;
	}
}

class SuccessResponse extends ResponseMain {
	constructor() {
		super();
		super.code = 200;
		super.status = 'success';
		this.payload;
	}
}

class ErrorResponse extends ResponseMain {
	constructor() {
		super();
		super.status = 'error';
		this.message;
		this.detail;
	}
}

class PagingResult {
	constructor() {
		this.total;
		this.data;
	}
}

module.exports = {
	SuccessResponse,
	ErrorResponse,
	PagingResult,
};
