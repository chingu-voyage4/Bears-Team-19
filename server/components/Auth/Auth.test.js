const request = require('supertest');
const app = require('../../app.js');
const User = require('../User/UserModel.js');


describe('Register Route', () => {
  beforeEach(async () => {
    // pass hashed === 'testpass' - hashed with https://bcrypt-generator.com/
    const testUser = {
      displayName: 'registeruser',
      password: 'registerpass',
    };

    const newUser = new User(testUser);
    await newUser.save();
  });

  afterEach(async () => {
    await User.remove({});
  });

  test('Authentication route return false with get request', async () => {
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
      username: 'loginuser',
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
      username: 'registeruser',
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

describe('Login Route', () => {
  beforeAll(async () => {
    // pass hashed === 'testpass' - hashed with https://bcrypt-generator.com/
    const testUser = {
      displayName: 'loginuser',
      password: 'loginpass',
    };

    const newLoginUser = new User(testUser);
    await newLoginUser.save();
  });

  afterAll(async () => {
    await User.remove({});
  });

  test('Login route returns an error when a get request is made', async () => {
    const response = await request(app).get('/auth/login');
    expect(response.statusCode).toBe(404);
  });

  test('Login route returns an error message when a post request is made with no object', async () => {
    const response = await request(app).post('/auth/login');
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('message');
  });

  test('Login route returns an error when a post request is made without a username ', async () => {
    const noUsername = {
      username: '',
      password: 'testpass',
    };

    const response = await request(app).post('/auth/login').send(noUsername);
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toEqual('"username" is not allowed to be empty');
  });

  test('Login route returns an errormessage  when a post request is made without a password ', async () => {
    const noPassword = {
      username: 'withoutpass',
      password: '',
    };
    const response = await request(app).post('/auth/login').send(noPassword);
    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toEqual('"password" is not allowed to be empty');
  });

  test('Login route returns an error when a post request is made with a username that does not exist ', async () => {
    const userDoesNotExist = {
      username: 'notExists',
      password: 'randompass',
    };
    const response = await request(app).post('/auth/login').send(userDoesNotExist);
    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toEqual('Username does not exist');
  });


  test('Login route returns an error when a post request is made with a correct user but password that does not match ', async () => {
    // duplicate of user in beforeEach without hashed pass and wrong pass
    const existingUser = {
      username: 'loginuser',
      password: 'abcdefgh',
    };

    const response = await request(app).post('/auth/login').send(existingUser);
    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toEqual('Password does not match');
  });


  test('Login route returns a user object when both password and username match database object ', async () => {
    const correctUser = {
      username: 'loginuser',
      password: 'loginpass',
    };

    const response = await request(app).post('/auth/login').send(correctUser);
    expect(response.body).toHaveProperty('displayName');
    expect(response.body.displayName).toEqual(correctUser.username);
  });
});
