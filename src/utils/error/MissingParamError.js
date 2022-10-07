class MissingParamError extends Error {
	constructor(param) {
		super(`Missing param: ${param}`);
		this.name = this.constructor.name;

		this.statusCode = 500;
		this.errorType = 'MISSING_PARAM';

		Error.captureStackTrace(this, this.constructor);
	}
}

export default MissingParamError;
