class ValidationError extends Error {
	constructor(errors) {
		super();
		this.name = this.constructor.name;

		this.statusCode = 400;
		this.errorType = 'VALIDATION_ERROR';
		this.errors = errors;

		Error.captureStackTrace(this, this.constructor);
	}
}

export default ValidationError;
