const debug = require('debug')('bears-team-19:server');
const Project = require('./projectmodel');

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

module.exports = getAllProjects;
