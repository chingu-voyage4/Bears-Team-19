require('dotenv').config();
const request = require('supertest');
const nodemailer = require('nodemailer');
const app = require('../../app.js');
const User = require('../user/usermodel.js');
const Project = require('../projects/projectmodel.js');

const agent = request.agent(app);

const transporter = nodemailer.createTransport({
  host: process.env.TEST_MAIL_HOST,
  port: process.env.TEST_MAIL_PORT,
  auth: {
    user: process.env.TEST_MAIL_USER,
    pass: process.env.TEST_MAIL_PASS,
  },
});

const mail = {
  from: `BearsTeam19: ${process.env.TEST_MAIL_USER}`,
  to: 'testperson <test@testproject.com>',
  subject: 'Test email]',
  text: 'test body',
  html: '<p>Test HTML</p>',
};

async function authenticatedRequest(done) {
  const testUser = {
    username: 'testuser',
    email: 'test@test.com',
    password: 'testpass',
  };
  const newUser = new User(testUser);
  await newUser.save()
    .then(() => {
      agent.post('/api/auth/login')
        .send({
          username: 'testuser',
          password: 'testpass',
        })
        .then(() => done());
    });
}

// Email data
describe('Emails', () => {
  beforeAll(async done => authenticatedRequest(done));

  afterAll(async () => {
    await User.remove({});
  });

  test('Email returns a 250 response code accepted', async () => {
    const sentMessage = await transporter.sendMail(mail);

    expect(sentMessage.response).toMatch('250');
    expect(sentMessage.envelope.from).toEqual('q2qwv34vgtex34yl@ethereal.email');
  });

  test('Get contact page returns a 404', async () => {
    const response = await request(app).get('/api/contact');
    expect(response.statusCode).toBe(404);
  });
  test('Post to contact requires returns 404 without query parameter', async () => {
    const response = await request(app).post('/api/contact/');
    expect(response.statusCode).toEqual(404);
  });
  test('Post to contact requires user is logged in', async () => {
    const message = {
      message: 'test subject',
      body: 'test message',
    };

    // object ID doesn't exist but should check login before id
    const response = await request(app).post('/api/contact/5ad081ed1ffc65330082cc48').send(message);
    expect(response.statusCode).toEqual(401);
    expect(response.body).toHaveProperty('message');
  });

  test('Post to contact requires a subject and description to exist', async () => {
    // using the persistent session
    const response = await agent.post('/api/contact/5ad081ed1ffc65330082cc48').send({ subject: '', body: '' });
    expect(response.statusCode).toBe(400);
  });

  test('Post to contact requires an existing user to contact', async () => {
    const message = {
      subject: 'test subject',
      body: 'test message',
    };
    const projectObj = {
      project: {
        title: 'test title',
        description: 'test desc',
        keywords: ['one'],
      },
    };

    const pRes = await agent
      .post('/api/projects')
      .send(projectObj)
      .expect(200);

    const response = await agent.post(`/api/contact/${pRes.body._id}`).send(message);
    expect(response.statusCode).toEqual(200);
    expect(response.body).toHaveProperty('message');
    expect(response.body.message).toEqual('Message Successfuly sent.');
  });
});
