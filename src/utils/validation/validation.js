import ValidationError from '../error/ValidationError.js';

const emailRegExp = new RegExp(
	/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
);

export const containsEmptyField = (fields) => {
	const errors = [];
	for (const [key, value] of Object.entries(fields)) {
		if (value.trim() === '') {
			const error = {
				param: key,
				message: `${key} must not be empty`,
			};
			errors.push(error);
		}
	}
	if (!errors.length) return;
	throw new ValidationError(errors);
};

export const isEmailValid = (email) => {
	if (email.match(emailRegExp)) return true;
	throw new ValidationError([{ param: 'email', message: 'email is not valid' }]);
};

export const fieldsValidation = (fields) => {
	containsEmptyField(fields);
	isEmailValid(fields.email);

	const passwordValidate =
		fields.password.length >= 8 && fields.password.length <= 20;

	if (!passwordValidate) {
		throw new ValidationError([
			{
				param: 'password',
				message: 'password must be between 8-20 characters',
			},
		]);
	}

	return true;
};
