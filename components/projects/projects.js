const express = require('express');
const { getAllProjects, getSingleProject } = require('./projectsGET.js');
const postProject = require('./projectsPOST.js');

const router = express.Router();

router.get('/', getAllProjects);
router.get('/:id', getSingleProject);
router.post('/', postProject);

module.exports = router;
