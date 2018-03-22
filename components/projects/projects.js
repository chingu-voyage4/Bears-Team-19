const express = require('express');
const debug = require('debug')('bears-team-19:server');
const Project = require('./projectmodel');

const router = express.Router();

function getAllProjects(req, res, next) {
  Project.find({ isPublic: true }, (err, projects) => {
    if (err) {
      debug(`Find projects failed: ${err}`);
      return next(err, req, res);
    }

    // success: return the data as json
    return res.json(projects);
  });
}

function postProject(req, res /* , next */) {
  // display data in console
  debug(req.body);

  // make sure we have the correct Content-Type
  if (req.get('Content-Type') !== 'application/json') {
    res.status(415).send('Unsupported media type: expecting "application/json"');
    return;
  }

  // TO DO:
  // validate data - reject if invalid
  // insert into database
}

router.get('/', getAllProjects);
router.post('/', postProject);

module.exports = router;
