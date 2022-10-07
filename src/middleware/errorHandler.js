import ValidationError from '../utils/error/ValidationError.js';
import InvalidTokenError from '../utils/error/InvalidTokenError.js';
import MissingParamError from '../utils/error/MissingParamError.js';

const errorHandler = (err, req, res, next) => {
	if (err instanceof ValidationError) {
		return res.status(err.statusCode).send({
			errorType: err.errorType,
			errors: err.errors,
		});
	}

	if (err instanceof InvalidTokenError) {
		return res.status(err.statusCode).send({
			errorType: err.errorType,
			message: err.message,
		});
	}

	if (err instanceof MissingParamError) {
		return res.status(err.statusCode).send({
			errorType: err.errorType,
			message: err.message,
		});
	}

	return res.status(500).send({
		errors: [
			{
				message: 'Internal Server Error',
			},
		],
	});
};

export default errorHandler;
