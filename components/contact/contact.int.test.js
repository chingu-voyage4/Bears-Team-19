require('dotenv').config();
const nodemailer = require('nodemailer');

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

// Email data
describe('Emails', () => {
  test.only('Email returns a 250 response code accepted', async () => {
    const sentMessage = await transporter.sendMail(mail);
    console.log(sentMessage);

    expect(sentMessage.response).toMatch('250');
    expect(sentMessage.envelope.from).toEqual('q2qwv34vgtex34yl@ethereal.email');
  });
});
