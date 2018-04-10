const express = require('express');

// Models

const Projects = require('../projects/projectmodel.js');
const User = require('../user/usermodel.js');

const Mailer = require('./mailer/mailer.js');

const router = express.Router();


function createEmailObject(subject, body, username, email, projectOwner, projectOwnerEmail) {
  const mail = {
    from: `BearsTeam19: ${process.env.MAIL_USER}`,
    to: `${projectOwner} <${projectOwnerEmail}`,
    subject,
    text: body,
    html: `<p>${username} ${email} is trying to contact you about your project</p><p>${body}</p>`,
  };

  return mail;
}

function filterRequest(req, res, next) {
  // user not logged in
  if (!req.user) {
    return res.status(400).json({ message: 'Please login before contacting users.' });
  }


  // incomplete form fields
  if (!req.body || !req.body.subject || !req.body.body) {
    return res.status(400).json({ message: 'incomplete fields please complete message with a subject and body' });
  }

  return next();
}

async function contactUser(req, res) {
  const { id: projectId } = req.params;
  const { subject, body } = req.body;
  const { email, username } = req.user;

  // First find if the project exist on the database

  const project = await Projects.findById(projectId);
  if (!project) return res.status(400).json({ message: 'Project does not exist' });
  const user = await User.findById(project.authorId);
  if (!user) return res.status(400).json({ message: 'User does not exist' });

  const message = createEmailObject(
    subject,
    body,
    username,
    email,
    user.username,
    user.email,
  );

  return Mailer.sendMail(message, (err, info) => {
    if (err) return res.status(500).json({ message: 'Error whilst sending email', err });

    console.log('Message sent successfully');
    console.log(info);
    return res.status(200).json({ message: 'Message Successfuly sent.' });
  });
}

router.post('/:id', filterRequest, contactUser);

module.exports = router;
