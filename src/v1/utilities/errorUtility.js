// const Sentry = require('@sentry/node');

const handleError = (error, messageToFront, next) => {
	if (error.statusCode === undefined && error.custom !== true) {
		Object.assign(error, { statusCode: 500 });
	}

	Object.assign(error, { detail: messageToFront });
	// Sentry.captureException(error);
	next(error);
};

module.exports = {
	handleError,
};
