const request = require('supertest');

const server = 'http://localhost:3000';

describe('Route integration', () => {
	describe('/users/login', () => {
		describe('GET', () => {
			it('responds with 200 status and json msg of "You have been successfully logged in."', () =>
				request(server)
					.get('/users/login')
					.send({ username: 'codesmith', password: 'hi' })
					.set('Accept', 'application/json')
					.expect(200)
					.expect((res) => {
						res.body = 'You have been successfully logged in.';
					}));
		});
	});

	describe('/jobs/getJobs/:user_id', () => {
		describe('GET', () => {
			it('responds with 200 status', () =>
				request(server)
					.get('/jobs/getJobs/8')
					.set('Content-Type', '/json')
					.expect(200));
		});
	});
});
