const request = require('supertest');
const app = require('../app.js');

describe('Auth Routes', () => {
  test('Authentication routes return false with get request', async () => {
    const response = await request(app).get('/auth/register');
    expect(response.statusCode).toBe(404);
  });

  test('Auth Route returns response with post request', async () => {
    const object = {
      success: false,
    };

    const response = await request(app).post('/auth/register');
    expect(response.statusCode).toBe(200);
    expect(response.body).toMatchObject(object);
    expect(response.body).toMatchSnapshot();
  });
});
