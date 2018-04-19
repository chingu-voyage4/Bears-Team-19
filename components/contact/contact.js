const express = require('express');
const debug = require('debug')('bears-team-19:server');

// Models

const Projects = require('../projects/projectmodel.js');
const User = require('../user/usermodel.js');

const Mailer = require('./mailer/mailer.js');

const router = express.Router();

function createEmailObject(
  subject,
  body,
  username,
  email,
  projectOwner,
  projectOwnerEmail,
  project,
) {

  const { published } = project;
  const { title: projectTitle } = published;

  const mail = {
    from: `BearsTeam19: ${process.env.MAIL_USER}`,
    to: `${projectOwner} <${projectOwnerEmail}`,
    subject,
    text: `${username} ${email} is trying to contact you about - ${projectTitle}. \n
      ${body}`,
    html: `<div style="width: 400px"> 
              <br/>
              <p>${username} ${email} is trying to contact you about ${projectTitle}</p>
              <p style="white-space: pre-wrap">${body}</p>.
           </div>`,
  };

  return mail;
}

function filterRequest(req, res, next) {
  // user not logged in
  if (!req.user) {
    return res.status(401).json({ message: 'Please login before contacting users.' });
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

  const project = await Projects.findById(projectId)
    .then(doc => doc)
    .catch(err => err);

  // if an error is thrown object gets a message property
  if (!project) return res.status(400).json({ message: 'Project does not exist.' });
  if (project.message) return res.status(404).json({ message: 'Invalid document id.' });

  const user = await User.findById(project.authorId)
    .then(doc => doc)
    .catch(err => err);

  if (!user) return res.status(400).json({ message: 'User not found.' });

  const message = createEmailObject(
    subject,
    body,
    username,
    email,
    user.username,
    user.email,
    project,
  );

  return Mailer.sendMail(message, (err, info) => {
    if (err) {
      debug(info);
      return res.status(500).json({ message: 'Error whilst sending email.', err });
    }
    return res.status(200).json({ message: 'Message Successfully sent.' });
  });
}

router.post('/:id', filterRequest, contactUser);

module.exports = router;
