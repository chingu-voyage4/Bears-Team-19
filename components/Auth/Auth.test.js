const request = require('supertest');
const app = require('../../app.js');
const User = require('../User/UserModel.js');


describe('Register Route', () => {
  beforeEach(async () => {
    const testUser = {
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
    const response = await request(app).get('/api/auth/register');
    expect(response.statusCode).toBe(404);
  });


  test('Auth Route returns error response with post request missing object', async () => {
    const response = await request(app).post('/api/auth/register');
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toEqual('"email" is required');
  });

  test('Auth Route returns error response with post request missing email field', async () => {
    const user = {
      password: 'testpass',
    };

    const response = await request(app).post('/api/auth/register').send(user);
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toEqual('"email" is required');
  });

  test('Auth Route returns error response with post request missing password field', async () => {
    const user = {
      email: 'loginuser@test.com',
    };
    const response = await request(app).post('/api/auth/register').send(user);
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toEqual('"password" is required');
  });


  test('Auth route returns an object matching email registered', async () => {
    const user = {
      email: 'heyjp@test.com',
      password: 'testpass',
    };

    // No entry in db before API test runs
    const dbEntry = await User.findOne({ email: user.email });
    expect(dbEntry).toBe(null);

    const response = await request(app).post('/api/auth/register').send(user);
    expect(response.body).toEqual(user.email);
  });

  test('Register route returns an error if email already exists', async () => {
    const user = {
      email: 'registeruser@test.com',
      password: 'ilikepasswords',
    };

    const response = await request(app).post('/api/auth/register').send(user);
    expect(response.statusCode).toEqual(200);
    expect(response.body.message).toBe('User exists');
  });

  test('Register route returns an error message if email is not valid', async () => {
    const emailShort = {
      email: 'email@.com',
      password: 'newpass',
    };

    const response = await request(app).post('/api/auth/register').send(emailShort);
    expect(response.statusCode).toEqual(200);
    expect(response.body).toHaveProperty('message');
  });

  test('Register route returns an error if password is too short', async () => {
    const emailShort = {
      email: 'abcdef@test.com',
      password: 'short',
    };

    const response = await request(app).post('/api/auth/register').send(emailShort);
    expect(response.statusCode).toEqual(200);
    expect(response.body).toHaveProperty('message');
  });

  test('Register route returns an error message if email contains spaces', async () => {
    const emailSpace = {
      email: 'abc@test.com def',
      password: 'testpass',
    };

    const response = await request(app).post('/api/auth/register').send(emailSpace);
    expect(response.statusCode).toEqual(200);
    expect(response.body).toHaveProperty('message');
  });

  test('Register route returns an error message if email contains symbols', async () => {
    const emailSymbol = {
      email: '{]`,.;;@test.com',
      password: 'testpass',
    };

    const response = await request(app).post('/api/auth/register').send(emailSymbol);
    expect(response.statusCode).toEqual(200);
    expect(response.body).toHaveProperty('message');
  });

  test('Register route returns an error message if password contains symbols', async () => {
    const passwordSymbol = {
      email: 'testuser@test.com',
      password: '=_£$@%^&',
    };

    const response = await request(app).post('/api/auth/register').send(passwordSymbol);
    expect(response.statusCode).toEqual(200);
    expect(response.body).toHaveProperty('message');
  });
});

describe('Login Route', () => {
  beforeAll(async () => {
    const testUser = {
      email: 'loginuser@test.com',
      password: 'loginpass',
    };

    const newLoginUser = new User(testUser);
    await newLoginUser.save();
  });

  afterAll(async () => {
    await User.remove({});
  });

  test('Login route returns an error when a get request is made', async () => {
    const response = await request(app).get('/api/auth/login');
    expect(response.statusCode).toBe(404);
  });

  test('Login route returns an error message when a post request is made with no object', async () => {
    const response = await request(app).post('/api/auth/login');
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('message');
  });

  test('Login route returns an error when a post request is made without a email ', async () => {
    const noEmail = {
      email: '',
      password: 'testpass',
    };

    const response = await request(app).post('/api/auth/login').send(noEmail);
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toEqual('"email" is not allowed to be empty');
  });

  test('Login route returns an errormessage  when a post request is made without a password ', async () => {
    const noPassword = {
      email: 'withoutpass@test.com',
      password: '',
    };
    const response = await request(app).post('/api/auth/login').send(noPassword);
    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toEqual('"password" is not allowed to be empty');
  });

  test('Login route returns an error when a post request is made with a email that does not exist ', async () => {
    const userDoesNotExist = {
      email: 'notexist@email.com',
      password: 'randompass',
    };
    const response = await request(app).post('/api/auth/login').send(userDoesNotExist);
    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toEqual('Email does not exist');
  });


  test('Login route returns an error when a post request is made with a correct user but password that does not match ', async () => {
    // duplicate of user in beforeEach without hashed pass and wrong pass
    const existingUser = {
      email: 'loginuser@test.com',
      password: 'abcdefgh',
    };

    const response = await request(app).post('/api/auth/login').send(existingUser);
    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toEqual('Password does not match');
  });


  test('Login route returns a user object when both password and email match database object ', async () => {
    const correctUser = {
      email: 'loginuser@test.com',
      password: 'loginpass',
    };

    const response = await request(app).post('/api/auth/login').send(correctUser);
    expect(response.body).toHaveProperty('email');
    expect(response.body.email).toEqual(correctUser.email);
  });
});
