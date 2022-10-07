import db from '../../db.js';

export default {
	insert: async (data) => {
		const { userId, refreshToken } = data;
		const dateTime = new Date();

		await db('Tokens').insert({
			userId: userId,
			refreshToken: refreshToken,
			expiresIn: '30d',
			updatedAt: dateTime.toISOString().slice(0, 19).replace('T', ' '),
			createdAt: dateTime.toISOString().slice(0, 19).replace('T', ' '),
		});
	},

	find: async (param, value) => {
		const userToken = await db('Tokens')
			.select('*')
			.where({
				[`${param}`]: value,
			});

		return userToken[0];
	},

	del: async (param, value) => {
		await db('Tokens')
			.del()
			.where({
				[`${param}`]: value,
			});
	},
};
