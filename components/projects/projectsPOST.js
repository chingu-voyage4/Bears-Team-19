const debug = require('debug')('bears-team-19:server');
const Project = require('./projectmodel');

function postProject(req, res, next) {
  // make sure we have the correct Content-Type
  if (!req.is('json')) {
    debug(`415: ${req.get('Content-Type')}`);
    res.status(415).send('Unsupported media type: expecting "application/json"');
    return;
  }

  // authenticate user
  if (!req.user) {
    res.status(401).send('Authentication failed: Please log in');
    return;
  }

  // validate data - reject if invalid
  if (!req.body || !req.body.project || !req.body.project.title) {
    debug(`400: body: ${req.body} project: ${req.body.project}`);
    res.sendStatus(400);
    return;
  }

  // insert into database
  // for the time being, we're automatically publishing the project
  const newProject = new Project({
    authorId: req.user._id,
    authorName: req.user.username,
    draft: req.body.project,
    published: req.body.project,
  });
  newProject.save((err, project) => {
    if (err) {
      debug(`Save failed: ${err}`);
      return next(err, req, res);
    }

    return res.status(200).send(project);
  });
}

module.exports = postProject;
