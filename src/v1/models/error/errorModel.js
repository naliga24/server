class CustomErrorHandler extends Error {
	constructor(statusCode, message) {
		super();
		this.statusCode = statusCode;
		this.message = message;
		this.custom = true;
	}
}

class DataNotFoundError extends Error {
	constructor(message) {
		super();
		this.statusCode = 404;
		this.message = message === undefined ? 'Data not found.' : message;
		this.custom = true;
	}
}

class ObjectAlreadyExists extends Error {
	constructor(message) {
		super();
		this.statusCode = 409;
		this.message = message;
		this.custom = true;
	}
}

class IllegalStateError extends Error {
	constructor(message) {
		super();
		this.statusCode = 406;
		this.message = message;
		this.custom = true;
	}
}

class InvalidArgumentError extends Error {
	constructor(message) {
		super();
		this.statusCode = 422;
		this.message = message;
		this.custom = true;
	}
}

class PermissionAccessViolation extends Error {
	constructor(message) {
		super();
		this.statusCode = 403;
		this.message = message;
		this.custom = true;
	}
}

class BadRequestError extends Error {
	constructor(message) {
		super();
		this.statusCode = 400;
		this.message = message;
		this.custom = true;
	}
}

class UnauthorizedError extends Error {
	constructor(message) {
		super();
		this.statusCode = 401;
		this.message = message;
		this.custom = true;
	}
}

module.exports = {
	CustomErrorHandler,
	DataNotFoundError,
	ObjectAlreadyExists,
	IllegalStateError,
	InvalidArgumentError,
	PermissionAccessViolation,
	BadRequestError,
	UnauthorizedError,
};
