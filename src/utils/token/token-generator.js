import jwt from 'jsonwebtoken';
import Token from '../../models/Token.js';

export const generate = async (id) => {
	const accessToken = jwt.sign({ id }, process.env.ACCESS_TOKEN_PRIVATE_KEY, {
		expiresIn: '1hr',
	});

	const refreshToken = jwt.sign({ id }, process.env.REFRESH_TOKEN_PRIVATE_KEY, {
		expiresIn: '30d',
	});

	const userToken = await Token.find('userId', id);

	if (userToken) {
		await Token.del('userId', id);
	}

	await Token.insert({ userId: id, refreshToken });
	return Promise.resolve({ accessToken, refreshToken });
};
