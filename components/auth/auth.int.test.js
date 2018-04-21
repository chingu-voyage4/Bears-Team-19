const request = require('supertest');
const app = require('../../app.js');
const User = require('../user/usermodel.js');

describe('Login Route', () => {
  beforeEach(async () => {
    const testUser = {
      username: 'loginuser',
      email: 'login@test.com',
      password: 'loginpass',
    };

    const newLoginUser = new User(testUser);
    await newLoginUser.save();
  });

  afterEach(async () => {
    await User.remove({});
  });

  test('Login route returns an error when a get request is made', async () => {
    const response = await request(app).get('/api/auth/login');
    expect(response.statusCode).toBe(404);
  });

  test('Login route returns an error message when a post request is made with no object', async () => {
    const response = await request(app).post('/api/auth/login');
    expect(response.statusCode).toEqual(400);
    expect(response.body).toHaveProperty('message');
  });

  test('Login route returns an error when a post request is made without a username ', async () => {
    const noUsername = {
      username: '',
      password: 'testpass',
    };

    const response = await request(app).post('/api/auth/login').send(noUsername);
    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toEqual('Missing credentials');
  });

  test('Login route returns an error message  when a post request is made without a password ', async () => {
    const noPassword = {
      username: 'testuser',
      password: '',
    };
    const response = await request(app).post('/api/auth/login').send(noPassword);
    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toEqual('Missing credentials');
  });

  test('Login route returns an error when a post request is made with a username that does not exist ', async () => {
    const userDoesNotExist = {
      username: 'testuser',
      password: 'randompass',
    };

    const response = await request(app).post('/api/auth/login').send(userDoesNotExist);
    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toEqual('Username does not exist');
  });


  test('Login route returns an error when a post request is made with a correct user but password that does not match ', async () => {
    const existingUser = {
      username: 'loginuser',
      password: 'abcdefgh',
    };

    const response = await request(app).post('/api/auth/login').send(existingUser);
    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toEqual('Password does not match');
  });


  test('Login route returns a user object when both password and username match database object ', async () => {
    const correctUser = {
      username: 'loginuser',
      password: 'loginpass',
    };

    const response = await request(app).post('/api/auth/login').send(correctUser);
    expect(response.statusCode).toEqual(200);
    expect(response.body).toHaveProperty('dateJoined');
    expect(response.body).toHaveProperty('email');
    expect(response.body).toHaveProperty('updatedAt');
    expect(response.body).toHaveProperty('username');
    expect(response.body).not.toHaveProperty('password');
  });
});

describe('Logout route', async () => {
  it('Should return an error if a user attempts to logout with no login session');
  it('Should return a message if a user successfully logs out');
});
