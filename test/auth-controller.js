import chai from 'chai';
import sinon from 'sinon';
import User from '../src/models/User.js';
import Token from '../src/models/Token.js';
import authController from '../src/controllers/auth.js';

const expect = chai.expect;

describe('POST /sign-up', () => {
	describe('Given valid fields', () => {
		it('Should throw an error code 500 if accessing the database fails', (done) => {
			sinon.stub(User, 'find');
			User.find.throws();

			const req = {
				body: {
					firstName: 'aaaa',
					lastName: 'aaaa',
					email: 'aaaa@gmail.com',
					password: 'aaaabvcfg',
				},
			};

			authController
				.signUp(req, {}, () => {})
				.then((result) => {
					expect(result).to.be.an('error');
					expect(result).to.have.property('statusCode', 500);
					done();
				});

			User.find.restore();
		});
	});
});
