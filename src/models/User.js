import bcrypt from 'bcryptjs';
import db from '../../db.js';

export default {
	insert: async (data) => {
		const { firstName, lastName, email, password } = data;

		const hashedPassword = bcrypt.hashSync(password, 10);
		const dateTime = new Date();

		await db('Users').insert({
			firstName: firstName,
			lastName: lastName,
			email: email,
			password: hashedPassword,
			updatedAt: dateTime.toISOString().slice(0, 19).replace('T', ' '),
			createdAt: dateTime.toISOString().slice(0, 19).replace('T', ' '),
		});
	},

	find: async (email) => {
		const user = await db('Users').select('*').where({
			email: email,
		});

		return user[0];
	},
};
