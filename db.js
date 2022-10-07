import knex from 'knex';

const db = knex({
	client: 'mysql2',
	connection: {
		host: '178.128.109.9',
		user: 'test01',
		password: 'PlsDoNotShareThePass123@',
		database: 'entrance_test',
	},
});

export default db;
