const request = require('supertest');
const app = require('./app.js');

describe('Routes return data', () => {
  test('Get request to route path returns a response', async () => {
    await request(app)
      .get('/')
      .expect(200);
  });
});
