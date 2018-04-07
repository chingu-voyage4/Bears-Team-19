const express = require('express');
const getAllProjects = require('./projectsGET.js');
const postProject = require('./projectsPOST.js');

const router = express.Router();

router.get('/', getAllProjects);
router.post('/', postProject);

module.exports = router;
