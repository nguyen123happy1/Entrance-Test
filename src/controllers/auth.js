import bcrypt from 'bcryptjs';
import Token from '../models/Token.js';
import User from '../models/User.js';
import ValidationError from '../utils/error/ValidationError.js';
import { generate } from '../utils/token/token-generator.js';
import { verifyRefreshToken } from '../utils/token/token-verify.js';
import { bodyValidation } from '../utils/validation/requestBodyValidation.js';
import { fieldsValidation } from '../utils/validation/validation.js';

const authController = {
	signUp: async (req, res, next) => {
		try {
			const { email, password } = req.body;

			bodyValidation(req.body, ['firstName', 'lastName', 'email', 'password']);
			fieldsValidation({ email, password });

			const userExisted = await User.find(email);
			if (userExisted) {
				throw new ValidationError([
					{ param: 'email', message: 'email is already existed' },
				]);
			}

			await User.insert(req.body);
			const { id, firstName, lastName } = await User.find(email);

			res.status(201).send({
				id,
				firstName,
				lastName,
				email,
				displayName: `${firstName} ${lastName}`,
			});
			return;
		} catch (error) {
			next(error);
			if (error instanceof ValidationError) {
				error.statusCode = 400;
				return error;
			}
			error.statusCode = 500;
			return error;
		}
	},

	signIn: async (req, res, next) => {
		try {
			const { email, password } = req.body;

			bodyValidation(req.body, ['email', 'password']);
			fieldsValidation({ email, password });

			const userExisted = await User.find(email);
			if (!userExisted) {
				throw new ValidationError([
					{ param: '', message: 'Invalid email/password' },
				]);
			}

			const isPasswordCorrect = bcrypt.compareSync(password, userExisted.password);

			if (!isPasswordCorrect) {
				throw new ValidationError([
					{
						param: '',
						message: 'Invalid email/password',
					},
				]);
			}

			const { accessToken, refreshToken } = await generate(userExisted.id);
			const { firstName, lastName } = userExisted;

			res.status(200).json({
				user: {
					email,
					firstName,
					lastName,
					displayName: `${firstName} ${lastName}`,
				},
				token: accessToken,
				refreshToken,
			});
			return;
		} catch (error) {
			next(error);
			return error;
		}
	},

	refreshToken: async (req, res, next) => {
		try {
			const { token } = await verifyRefreshToken(req.body.refreshToken);
			const { accessToken, refreshToken } = await generate(token.id);
			res.status(200).json({
				token: accessToken,
				refreshToken,
			});
			return;
		} catch (error) {
			next(error);
			return error;
		}
	},

	signOut: async (req, res, next) => {
		try {
			if (!req?.headers?.authorization) {
				throw new Error('Unauthorized');
			}

			await Token.del('refreshToken', req.headers.authorization);

			res.status(204).send();
		} catch (error) {
			next(error);
			return error;
		}
	},
};

export default authController;
