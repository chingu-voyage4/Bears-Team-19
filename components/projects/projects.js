const express = require('express');
const url = require('url');
const debug = require('debug')('bears-team-19:server');
const Project = require('./projectmodel');

const router = express.Router();

function getAllProjects(req, res, next) {
  // make sure the user agent accepts json
  if (!req.accepts('json')) {
    res.status(406).send('Not acceptable: This API supports only json');
    return;
  }

  // check that we haven't got query parameters since we don't support them for now
  if (JSON.stringify(req.query) !== '{}') {
    res.status(422).send('Unprocessable entity: query parameters are not supported at this time');
    return;
  }

  Project.where('published')
    .exists()
    .sort({ 'published.updatedAt': -1 })
    .select('authorId authorName published')
    .exec((err, data) => {
      if (err) {
        debug(`Find projects failed: ${err}`);
        return next(err, req, res);
      }

      // flatten the result
      const projects = data.map(el => ({
        id: el._id,
        authorId: el.authorId,
        authorName: el.authorName,
        title: el.published.title,
        keywords: el.published.keywords,
        description: el.published.description,
        lastPublished: el.published.updatedAt,
        created: el.published.createdAt,
      }));

      // success: return the data as json
      return res.json(projects);
    });
}

function postProject(req, res, next) {
  // display data in console
  debug(req.body);

  // make sure we have the correct Content-Type
  if (req.get('Content-Type') !== 'application/json') {
    res.status(415).send('Unsupported media type: expecting "application/json"');
    return;
  }

  // authenticate user
  /*
  if (!req.user) {
    res.status(401).send('Authentication failed: Please log in');
    return;
  }
  const authorName = req.user.username;
  const authorId = req.user._id;
  */

  // validate data - reject if invalid
  if (!req.body || !req.body.user || !req.body.user.name || !req.body.user.id ||
    !req.body.project || !req.body.project.title) {
    res.sendStatus(400);
    return;
  }

  // insert into database
  // for the time being, we're automatically publishing the project
  const newProject = new Project({
    authorId: req.body.user.id,
    authorName: req.body.user.name,
    draft: req.body.project,
    published: req.body.project,
  });
  newProject.save((err, project) => {
    if (err) {
      return next(err, req, res);
    }

    const location = url.format({
      protocol: req.protocol,
      host: req.get('host'),
      pathname: `${req.originalUrl}/${project._id}`,
    });
    return res.location(location).status(201).send(project);
  });
}

router.get('/', getAllProjects);
router.post('/', postProject);

module.exports = router;
