import MissingParamError from '../error/MissingParamError.js';

export const bodyValidation = (body, keys) => {
	for (const key of keys) {
		if (!Object.keys(body).includes(key)) {
			throw new MissingParamError(key);
		}
	}

	return true;
};
