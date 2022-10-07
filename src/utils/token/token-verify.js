import Token from '../../models/Token.js';
import jwt from 'jsonwebtoken';
import InvalidTokenError from '../error/InvalidTokenError.js';

export const verifyRefreshToken = async (refreshToken) => {
	const refreshTokenPrivateKey = process.env.REFRESH_TOKEN_PRIVATE_KEY;

	const tokenExisted = await Token.find('refreshToken', refreshToken);
	if (!tokenExisted) {
		throw new InvalidTokenError('Invalid refresh token');
	}

	return jwt.verify(refreshToken, refreshTokenPrivateKey, (error, token) => {
		if (error) throw new InvalidTokenError('Invalid refresh token');
		return {
			token,
			message: 'Valid refresh token',
		};
	});
};
