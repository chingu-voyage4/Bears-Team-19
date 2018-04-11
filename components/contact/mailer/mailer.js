const nodemailer = require('nodemailer');

// Generate test SMTP service
let transporter;

if (process.env.NODE_ENV === 'test') {
  transporter = nodemailer.createTransport({
    host: process.env.TEST_MAIL_HOST,
    port: process.env.TEST_MAIL_PORT,
    auth: {
      user: process.env.TEST_MAIL_USER,
      pass: process.env.TEST_MAIL_PASS,
    },
  });
} else {
  transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });
}

module.exports = transporter;
