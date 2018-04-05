const request = require('supertest');
const app = require('../../app.js');

const User = require('../user/usermodel.js');


describe('Create users route', () => {
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

  test('/api/users/create route returns a 404 status with get request', async () => {
    const response = await request(app).get('/api/users/create');
    expect(response.statusCode).toBe(404);
  });

  // Missing Fields

  test('Auth Route returns error response with post request missing object', async () => {
    const response = await request(app).post('/api/users/create');
    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toEqual('"username" is required');
    expect(response.statusCode).toEqual(400);
  });

  test('Create users route returns 400 error when post request has a missing username field', async () => {
    const response = await request(app).post('/api/users/create');
    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toEqual('"username" is required');
    expect(response.statusCode).toEqual(400);
  });

  test('Create users route returns 400 error when post request has a missing email field', async () => {
    const user = {
      username: 'loginuser',
      password: 'testpass',
    };

    const response = await request(app).post('/api/users/create').send(user);
    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toEqual('"email" is required');
  });

  test('Create users route returns 400 error when post request has a missing password field', async () => {
    const user = {
      username: 'loginuser',
      email: 'loginuser@test.com',
      password: '',
    };
    const response = await request(app).post('/api/users/create').send(user);
    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toEqual('"password" is not allowed to be empty');
  });

  // Empty Fields

  test('Create users route returns 400 error when post request has an empty username field', async () => {
    const user = {
      username: '',
      password: 'testpass',
      email: 'loginuser@loginemail.com',
    };

    const response = await request(app).post('/api/users/create').send(user);
    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toEqual('"username" is not allowed to be empty');
    expect(response.statusCode).toEqual(400);
  });

  test('Create users route returns 400 error when post request has an empty email field', async () => {
    const user = {
      username: 'loginuser',
      password: 'testpass',
      email: '',
    };

    const response = await request(app).post('/api/users/create').send(user);
    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toEqual('"email" is not allowed to be empty');
    expect(response.statusCode).toEqual(400);
  });

  test('Create users route returns 400 error when post request has an empty password field', async () => {
    const user = {
      username: 'loginuser',
      password: '',
      email: 'loginuser@loginemail.com',
    };

    const response = await request(app).post('/api/users/create').send(user);
    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toEqual('"password" is not allowed to be empty');
    expect(response.statusCode).toEqual(400);
  });

  // Valid fields

  test('Create users route returns 400 status code if username is too short < 5 chars ', async () => {
    const user = {
      username: 'abcd',
      email: 'loginuser@test.com',
      password: 'loginuserpass',
    };
    const response = await request(app).post('/api/users/create').send(user);
    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty('message');
  });

  test('Create users route returns 400 status code if username is too long > 15 chars', async () => {
    const user = {
      username: 'abcdefghijklmnop',
      email: 'loginuser@test.com',
      password: 'loginuserpass',
    };
    const response = await request(app).post('/api/users/create').send(user);
    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toEqual('"username" length must be less than or equal to 15 characters long');
  });

  test('Create users route returns 400 status code if username contains symbols', async () => {
    const user = {
      username: 'abcd{}-',
      email: 'loginuser@test.com',
      password: 'loginuserpass',
    };
    const response = await request(app).post('/api/users/create').send(user);
    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty('message');
  });

  test('Create users route returns 400 status code if username contains spaces', async () => {
    const user = {
      username: 'abcd abcd',
      email: 'loginuser@test.com',
      password: 'loginuserpass',
    };
    const response = await request(app).post('/api/users/create').send(user);
    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty('message');
  });

  test('Create users route returns 400 status code if username already exists', async () => {
    const user = {
      username: 'testuser',
      email: 'loginuser@test.com',
      password: 'loginuserpass',
    };
    const response = await request(app).post('/api/users/create').send(user);
    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toEqual('User exists');
  });

  // passwords

  test('Create users route returns an error if password is too short', async () => {
    const emailShort = {
      username: 'testuser',
      email: 'abcdef@test.com',
      password: 'short',
    };

    const response = await request(app).post('/api/users/create').send(emailShort);
    expect(response.statusCode).toEqual(400);
    expect(response.body).toHaveProperty('message');
  });

  test('Create users route returns an error if password is too long', async () => {
    const emailShort = {
      username: 'testuser',
      email: 'abcdef@test.com',
      password: 'abcdefghijklmnop',
    };

    const response = await request(app).post('/api/users/create').send(emailShort);
    expect(response.statusCode).toEqual(400);
    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toEqual('"password" length must be less than or equal to 15 characters long');
  });

  // email

  test('Create users route returns 400 status and an error message if email is not valid', async () => {
    const emailShort = {
      username: 'testuser',
      email: 'email@.com',
      password: 'newpass',
    };

    const response = await request(app).post('/api/users/create').send(emailShort);
    expect(response.statusCode).toEqual(400);
    expect(response.body).toHaveProperty('message');
  });

  test('Create users route returns 400 status and an error message if email contains spaces', async () => {
    const emailSpace = {
      username: 'testuser',
      email: 'abc@test.com def',
      password: 'testpass',
    };

    const response = await request(app).post('/api/users/create').send(emailSpace);
    expect(response.statusCode).toEqual(400);
    expect(response.body).toHaveProperty('message');
  });

  test('Create users route returns 400 status and error message if email contains symbols', async () => {
    const emailSymbol = {
      username: 'testuser',
      email: '{]`,.;;@test.com',
      password: 'testpass',
    };

    const response = await request(app).post('/api/users/create').send(emailSymbol);
    expect(response.statusCode).toEqual(400);
    expect(response.body).toHaveProperty('message');
  });

  test('Create users route returns a 400 status code and error messge if email already exists', async () => {
    const user = {
      username: 'testuser',
      email: 'registeruser@test.com',
      password: 'ilikepasswords',
    };

    const response = await request(app).post('/api/users/create').send(user);
    expect(response.statusCode).toEqual(400);
    expect(response.body.message).toBe('User exists');
  });

  test('Create users route returns a 200 status code and object matching email registered', async () => {
    const user = {
      username: 'heyjp',
      email: 'heyjp@test.com',
      password: 'testpass',
    };

    // No entry in db before API test runs
    const dbEntry = await User.findOne({ email: user.email });
    expect(dbEntry).toBe(null);

    const response = await request(app).post('/api/users/create').send(user);
    expect(response.statusCode).toEqual(201);
    expect(response.body).toHaveProperty('success');
    expect(response.body.success).toEqual('User successfully registered.');
  });
});
