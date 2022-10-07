class InvalidTokenError extends Error {
	constructor(message) {
		super(message);
		this.name = this.constructor.name;

		this.statusCode = 404;
		this.errorType = 'INVALID_TOKEN';

		Error.captureStackTrace(this, this.constructor);
	}
}

export default InvalidTokenError;
