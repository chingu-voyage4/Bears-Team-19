const request = require('supertest');
const app = require('../../app.js');

const User = require('../user/usermodel.js');


describe('Register Route', () => {
  beforeEach(async () => {
    const testUser = {
      username: 'testuser',
      email: 'registeruser@test.com',
      password: 'registerpass',
    };

    const newUser = new User(testUser);
    await newUser.save();
  });

  afterEach(async () => {
    await User.remove({});
  });

  test('Authentication route return false with get request', async () => {
    const response = await request(app).get('/api/user/create');
    expect(response.statusCode).toBe(404);
  });


  test('Auth Route returns error response with post request missing object', async () => {
    const response = await request(app).post('/api/user/create');
    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toEqual('"email" is required');
  });

  test('Auth Route returns error response with post request missing email field', async () => {
    const user = {
      password: 'testpass',
    };

    const response = await request(app).post('/api/user/create').send(user);
    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toEqual('"email" is required');
  });

  test('Auth Route returns error response with post request empty password field', async () => {
    const user = {
      username: 'loginuser',
      email: 'loginuser@test.com',
      password: '',
    };
    const response = await request(app).post('/api/user/create').send(user);
    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toEqual('"password" is not allowed to be empty');
  });


  test('Auth route returns an object matching email registered', async () => {
    const user = {
      username: 'heyjp',
      email: 'heyjp@test.com',
      password: 'testpass',
    };

    // No entry in db before API test runs
    const dbEntry = await User.findOne({ email: user.email });
    expect(dbEntry).toBe(null);

    const response = await request(app).post('/api/user/create').send(user);
    expect(response.statusCode).toEqual(201);
    expect(response.body).toEqual(user.email);
  });

  test('Register route returns an error if email already exists', async () => {
    const user = {
      username: 'testuser',
      email: 'registeruser@test.com',
      password: 'ilikepasswords',
    };

    const response = await request(app).post('/api/user/create').send(user);
    expect(response.statusCode).toEqual(400);
    expect(response.body.message).toBe('User exists');
  });

  test('Register route returns an error message if email is not valid', async () => {
    const emailShort = {
      username: 'testuser',
      email: 'email@.com',
      password: 'newpass',
    };
    
    const response = await request(app).post('/api/user/create').send(emailShort);
    expect(response.statusCode).toEqual(400);
    expect(response.body).toHaveProperty('message');
  });

  test('Register route returns an error if password is too short', async () => {
    const emailShort = {
      username: 'testuser',
      email: 'abcdef@test.com',
      password: 'short',
    };

    const response = await request(app).post('/api/user/create').send(emailShort);
    expect(response.statusCode).toEqual(400);
    expect(response.body).toHaveProperty('message');
  });

  test('Register route returns an error message if email contains spaces', async () => {
    const emailSpace = {
      username: 'testuser',
      email: 'abc@test.com def',
      password: 'testpass',
    };

    const response = await request(app).post('/api/user/create').send(emailSpace);
    expect(response.statusCode).toEqual(400);
    expect(response.body).toHaveProperty('message');
  });

  test('Register route returns an error message if email contains symbols', async () => {
    const emailSymbol = {
      username: 'testuser',
      email: '{]`,.;;@test.com',
      password: 'testpass',
    };

    const response = await request(app).post('/api/user/create').send(emailSymbol);
    expect(response.statusCode).toEqual(400);
    expect(response.body).toHaveProperty('message');
  });

  test('Register route returns an error message if password contains symbols', async () => {
    const passwordSymbol = {
      username: 'testuser',
      email: 'testuser@test.com',
      password: '=_£$@%^&',
    };

    const response = await request(app).post('/api/user/create').send(passwordSymbol);
    expect(response.statusCode).toEqual(400);
    expect(response.body).toHaveProperty('message');
  });
});