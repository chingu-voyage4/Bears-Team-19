const express = require('express');

// Models

const Projects = require('../projects/projectmodel.js');
const User = require('../user/usermodel.js');

const Mailer = require('./mailer/mailer.js');

const router = express.Router();

function findWordBoundary(body, start, end) {
  let chunk = body.slice(start, end);
  let counter = 0;

  while (chunk[chunk.length - 1].match(/[a-zA-Z]/)) {
    counter += 1;
    chunk = body.slice(start, end + counter);
  }
  return [chunk, counter];
}

function escapeBody(body, lineLimit) {
  let text = '';

  // if entire message length is under linelimit return message
  if (body.length < lineLimit) {
    return body;
  }

  for (let i = 0; i < body.length; i += lineLimit) {
    const endPoint = i + lineLimit;
    const [chunk, incrementIndex] = findWordBoundary(body, i, endPoint);

    i += incrementIndex;

    // there are less than 60 chars left return rest of body
    if (endPoint >= body.length) {
      text += `${chunk} \n`;
      return text;
    }
    text += `${chunk}\n`;
  }
  return text;
}


function createEmailObject(
  subject,
  body,
  username,
  email,
  projectOwner,
  projectOwnerEmail,
  project,
) {
  const { _id: projectId, published } = project;
  const { title: projectTitle } = published;
  const plainBody = escapeBody(body, 65);

  const mail = {
    from: `BearsTeam19: ${process.env.MAIL_USER}`,
    to: `${projectOwner} <${projectOwnerEmail}`,
    subject,
    text: `${username} ${email} is trying to contact you about - ${projectTitle}. \n
      ${plainBody}`,
    html: `<div style="width: 400px"> 
              <br/>
              <p>${username} ${email} is trying to contact you about  ${projectId}: ${projectTitle}</p>
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
  if (project.message || !project) return res.status(400).json({ message: 'Project does not exist.' });

  const user = await User.findById(project.authorId)
    .then(res => res)
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
    if (err) return res.status(500).json({ message: 'Error whilst sending email', err });

    console.log('Message sent successfully');
    console.log(info);
    return res.status(200).json({ message: 'Message Successfuly sent.' });
  });
}

router.post('/:id', filterRequest, contactUser);

module.exports = router;
