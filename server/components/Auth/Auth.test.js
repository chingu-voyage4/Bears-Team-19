const request = require('supertest');
const app = require('../../app.js');
const User = require('../User/UserModel.js');

describe('Auth Routes', () => {
  beforeEach(async () => {
    // pass hashed === 'testpass' - hashed with https://bcrypt-generator.com/
    const testUser = {
      displayName: 'testuser',
      password: '$2y$10$j1vOGTmtiRYwhsGPNCDwZOi7dBqJJvxKdXAY.1V0L2jxDa1R4LKFi',
    };

    const user = new User(testUser);
    await user.save();
  });

  afterEach(async () => {
    await User.remove({});
  });

  test('Authentication routes return false with get request', async () => {
    const response = await request(app).get('/auth/register');
    expect(response.statusCode).toBe(404);
  });


  test('Auth Route returns error response with post request missing object', async () => {
    const response = await request(app).post('/auth/register');
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toEqual('"username" is required');
  });

  test('Auth Route returns error response with post request missing username field', async () => {
    const user = {
      password: 'testpass',
    };

    const response = await request(app).post('/auth/register').send(user);
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toEqual('"username" is required');
  });

  test('Auth Route returns error response with post request missing password field', async () => {
    const user = {
      username: 'testuser',
    };
    const response = await request(app).post('/auth/register').send(user);
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toEqual('"password" is required');
  });


  test('Auth route returns an object matching username registered', async () => {
    const user = {
      username: 'heyjp',
      password: 'testpass',
    };
    // No entry in db before API test runs
    const dbEntry = await User.findOne({ displayName: user.username });
    expect(dbEntry).toBe(null);

    const response = await request(app).post('/auth/register').send(user);
    expect(response.body).toEqual(user.username);
  });

  test('Register route returns an error if username already exists', async () => {
    const user = {
      username: 'testuser',
      password: 'ilikepasswords',
    };

    const response = await request(app).post('/auth/register').send(user);
    expect(response.statusCode).toEqual(200);
    expect(response.body.message).toBe('User exists');
  });

  test('Register route returns an error message if username is too short', async () => {
    const usernameShort = {
      username: 'abcd',
      password: 'newpass',
    };

    const response = await request(app).post('/auth/register').send(usernameShort);
    expect(response.statusCode).toEqual(200);
    expect(response.body).toHaveProperty('message');
  });

  test('Register route returns an error if password is too short', async () => {
    const usernameShort = {
      username: 'abcdef',
      password: 'short',
    };

    const response = await request(app).post('/auth/register').send(usernameShort);
    expect(response.statusCode).toEqual(200);
    expect(response.body).toHaveProperty('message');
  });
});
