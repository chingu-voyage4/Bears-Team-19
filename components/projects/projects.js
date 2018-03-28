const express = require('express');
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

  Project.find({ isPublic: true }, (err, projects) => {
    if (err) {
      debug(`Find projects failed: ${err}`);
      return next(err, req, res);
    }

    // success: return the data as json
    return res.json(projects);
  });
}

function postProject(req /* , res, next */) {
  // display data in console
  debug(req.body);

  // make sure we have the correct Content-Type
  /*
  if (req.get('Content-Type') !== 'application/json') {
    res.status(415).send('Unsupported media type: expecting "application/json"');
    return;
  }
  */

  // TO DO:
  // validate data - reject if invalid
  // insert into database
}

router.get('/', getAllProjects);
router.post('/', postProject);

module.exports = router;
