const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../../app.js');
const ProjectModel = require('./projectmodel.js');

// test data
const { ObjectId } = mongoose.Types;
const authorId = new ObjectId();
const authorName = 'Bears 19';

const publicProjects = [
  {
    authorId,
    authorName,
    draft: {
      title: 'Ultimate to-do list',
      keywords: ['web', 'react', 'js'],
      description: 'We want to create the ultimate to-do list! The project is already started and we need more developers.\nContact me for more info.',
    },
    published: {
      title: 'Ultimate to-do list',
      keywords: ['web', 'react', 'js'],
      description: 'We want to create the ultimate to-do list! The project is already started and we need more developers.\nContact me for more info.',
    },
  },
  {
    authorId,
    authorName,
    draft: {
      title: 'Mario-inspired game for the web',
      keywords: ['web', 'react', 'js'],
      description: 'The idea is to create a platformer inspired by Mario and have it run in the browser. We need artists, javascript developers, level designers...',
    },
    published: {
      title: 'Mario-inspired game for the web',
      keywords: ['web', 'react', 'js'],
      description: 'The idea is to create a platformer inspired by Mario and have it run in the browser. We need artists, javascript developers, level designers...',
    },
  },
  {
    authorId,
    authorName,
    draft: {
      title: 'Test project',
      keywords: ['web', 'game', 'python'],
      description: 'Not sure what this is about yet.',
    },
    published: {
      title: 'Test project',
      keywords: ['web', 'game', 'python'],
      description: 'Not sure what this is about yet.',
    },
  },
];

const privateProjects = [
  {
    authorId,
    authorName,
    draft: {
      title: 'A project with two paragraphs',
      keywords: ['web', 'react', 'js'],
      description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna 
      aliqua. Est lorem ipsum dolor sit amet consectetur adipiscing elit. Odio euismod lacinia at quis. Gravida dictum fusce ut placerat 
      orci nulla pellentesque. Nullam ac tortor vitae purus faucibus ornare. Ut eu sem integer vitae justo eget magna fermentum. Viverra 
      vitae congue eu consequat ac felis donec et odio. Lacus viverra vitae congue eu consequat ac felis donec. Et ligula ullamcorper 
      malesuada proin libero nunc consequat interdum varius. Mattis nunc sed blandit libero volutpat sed. Pretium viverra suspendisse 
      potenti nullam ac tortor vitae purus. Diam donec adipiscing tristique risus nec feugiat in fermentum posuere. Lectus nulla at 
      volutpat diam ut venenatis tellus in metus. Praesent semper feugiat nibh sed pulvinar proin. Id faucibus nisl tincidunt eget nullam. 
      Adipiscing tristique risus nec feugiat in fermentum posuere urna.\r\n
      \r\n
      Amet luctus venenatis lectus magna. Ac tortor dignissim convallis aenean et tortor at risus. Nunc sed augue lacus viverra vitae. 
      Arcu risus quis varius quam quisque id diam. Elit ullamcorper dignissim cras tincidunt lobortis. Massa vitae tortor condimentum 
      lacinia quis vel eros. Mauris in aliquam sem fringilla ut morbi tincidunt augue. Ornare lectus sit amet est. Ut tellus elementum 
      sagittis vitae et leo duis. Id venenatis a condimentum vitae sapien pellentesque. Pellentesque elit eget gravida cum sociis 
      natoque. Id porta nibh venenatis cras sed felis eget velit.`,
    },
  },
  {
    authorId,
    authorName,
    draft: {
      title: 'A project with lots of short paragraphs',
      keywords: ['web', 'react', 'js'],
      description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna 
      aliqua. Est lorem ipsum dolor sit amet consectetur adipiscing elit.\r\n
      \r\n
      Odio euismod lacinia at quis. Gravida dictum fusce ut placerat orci nulla pellentesque. Nullam ac tortor vitae purus faucibus 
      ornare.\r\n
      \r\n
      Ut eu sem integer vitae justo eget magna fermentum. Viverra vitae congue eu consequat ac felis donec et odio. Lacus viverra vitae 
      congue eu consequat ac felis donec.\r\n
      Et ligula ullamcorper malesuada proin libero nunc consequat interdum varius. Mattis nunc sed blandit libero volutpat sed.\r\n
      Pretium viverra suspendisse potenti nullam ac tortor vitae purus. Diam donec adipiscing tristique risus nec feugiat in fermentum 
      posuere.\r\n
      \r\n
      Lectus nulla at volutpat diam ut venenatis tellus in metus. Praesent semper feugiat nibh sed pulvinar proin. Id faucibus nisl 
      tincidunt eget nullam.\r\n
      \r\n
      Adipiscing tristique risus nec feugiat in fermentum posuere urna.`,
    },
  },
];

const allProjects = publicProjects.concat(privateProjects);

// database set up functions
async function removeAllProjects() {
  await ProjectModel.remove();
}

async function setupProjects(projects) {
  await removeAllProjects();
  const promises = projects.map((el) => {
    const obj = new ProjectModel(el);
    return obj.save();
  });
  await Promise.all(promises);
}

// the actual tests
describe('Projects routes', () => {
  describe('GET route', () => {
    describe('on a table with data', () => {
      beforeAll(async () => {
        await setupProjects(allProjects);
      });
      afterAll(async () => {
        await removeAllProjects();
      });

      test('it returns a 406 status when the client doesn\'t accept json', async () => {
        await request(app)
          .get('/api/projects')
          .set('Accept', 'text/plain')
          .expect(406);
      });

      test('it returns a 200 status and data in json format when there are no query parameters', async () => {
        const response = await request(app)
          .get('/api/projects')
          .set('Accept', 'application/json');

        expect(response.type).toMatch(/json/);
        expect(response.status).toEqual(200);
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body).toHaveLength(publicProjects.length);

        // check the object structure
        expect(response.body[0]).toHaveProperty('id');
        expect(response.body[0]).toHaveProperty('title');
        expect(response.body[0]).toHaveProperty('authorId');
        expect(response.body[0]).toHaveProperty('authorName');
        expect(response.body[0]).toHaveProperty('keywords');
        expect(response.body[0]).toHaveProperty('description');
        expect(response.body[0]).toHaveProperty('lastPublished');
        expect(response.body[0]).toHaveProperty('created');
      });


      test('it only returns published projects', async () => {
        const response = await request(app)
          .get('/api/projects')
          .set('Accept', 'application/json');

        expect(response.type).toMatch(/json/);
        expect(response.status).toEqual(200);
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body).not.toHaveLength(allProjects.length);
        expect(response.body).toHaveLength(publicProjects.length);

        const titles = publicProjects.map(el => el.published.title);
        expect(titles).toContain(response.body[0].title);
        expect(titles).toContain(response.body[1].title);
        expect(titles).toContain(response.body[2].title);
      });

      // 422 rather than 404 so that there is no confusion if the parameters would actually be valid
      // if parameters were accepted
      test('it returns a 422 status when query parameters are supplied', async () => {
        await request(app)
          .get('/api/projects')
          .set('Accept', 'application/json')
          .query('authorName=Joe')
          .expect(422);
      });
    });

    describe('on an empty table', () => {
      beforeAll(async () => {
        await removeAllProjects();
      });

      test('it returns a 200 status and an empty array when there are no projects in the database', async () => {
        const response = await request(app)
          .get('/api/projects')
          .set('Accept', 'application/json');

        expect(response.type).toMatch(/json/);
        expect(response.status).toEqual(200);
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body).toHaveLength(0);
      });
    });

    describe('on a table with no published projects', async () => {
      beforeAll(async () => {
        await setupProjects(privateProjects);
      });

      afterAll(async () => {
        await removeAllProjects();
      });

      test('it returns a 200 status and an empty array when there are no public projects in the database', async () => {
        const response = await request(app)
          .get('/api/projects')
          .set('Accept', 'application/json');

        expect(response.type).toMatch(/json/);
        expect(response.status).toEqual(200);
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body).toHaveLength(0);
      });
    });
  });

  describe('POST route', () => {
    beforeAll(async () => {
      await removeAllProjects();
    });

    afterAll(async () => {
      await removeAllProjects();
    });

    test('it replies with a 415 status if the Content-Type is anything other than "application/json"', async () => {
      await request(app)
        .post('/api/projects')
        .type('form')
        .send({ title: 'Example' })
        .expect(415);
    });

    test('it returns a 201 status when a project was successfully created', async () => {
      await request(app)
        .post('/api/projects')
        .send({
          user: {
            name: authorName,
            id: authorId,
          },
          project: {
            title: 'Example',
            description: 'this is a description',
            keywords: ['one', 'two'],
          },
        })
        .expect(201)
        .expect('Location', /http.+\/api\/projects\/\d+/);
    });

    test('it returns a 201 status when a project is created without a description or keywords', async () => {
      await request(app)
        .post('/api/projects')
        .send({
          user: {
            name: authorName,
            id: authorId,
          },
          project: {
            title: 'Example',
          },
        })
        .expect(201)
        .expect('Location', /http.+\/api\/projects\/\d+/);
    });

    test('it returns a 400 status when no data is provided', async () => {
      await request(app)
        .post('/api/projects')
        .set('Content-Type', 'application/json')
        .send()
        .expect(400);
    });

    test('it returns a 400 status when an empty object is provided', async () => {
      await request(app)
        .post('/api/projects')
        .send({})
        .expect(400);
    });

    test('it returns a 400 status when the user data is not provided', async () => {
      await request(app)
        .post('/api/projects')
        .send({
          project: {
            title: 'Example',
            description: 'this is a description',
            keywords: ['one', 'two'],
          },
        })
        .expect(400);
    });

    test('it returns a 400 status when the user name is not provided', async () => {
      await request(app)
        .post('/api/projects')
        .send({
          user: {
            id: authorId,
          },
          project: {
            title: 'Example',
            description: 'this is a description',
            keywords: ['one', 'two'],
          },
        })
        .expect(400);
    });

    test('it returns a 400 status when the user id is not provided', async () => {
      await request(app)
        .post('/api/projects')
        .send({
          user: {
            name: authorName,
          },
          project: {
            title: 'Example',
            description: 'this is a description',
            keywords: ['one', 'two'],
          },
        })
        .expect(400);
    });

    test('it returns a 400 status when the project data is not provided', async () => {
      await request(app)
        .post('/api/projects')
        .send({
          user: {
            name: authorName,
            id: authorId,
          },
        })
        .expect(400);
    });

    test('it returns a 400 status when the project title is not provided', async () => {
      await request(app)
        .post('/api/projects')
        .send({
          user: {
            name: authorName,
            id: authorId,
          },
          project: {
            description: 'this is a description',
            keywords: ['one', 'two'],
          },
        })
        .expect(400);
    });

    test('it publishes the project (temporary behaviour)', async () => {
      const response = await request(app)
        .post('/api/projects')
        .send({
          user: {
            name: authorName,
            id: authorId,
          },
          project: {
            title: 'Example',
            description: 'this is a description',
            keywords: ['one', 'two'],
          },
        });
      expect(response.body.published).toBeDefined();
      expect(response.body.published.title).toEqual(response.body.draft.title);
      expect(response.body.published.description).toEqual(response.body.draft.description);
      expect(response.body.published.keywords).toEqual(response.body.draft.keywords);
    });

    test('it ignores any extra fields', async () => {
      const response = await request(app)
        .post('/api/projects')
        .send({
          user: {
            name: authorName,
            id: authorId,
            email: 'nobody@example.com',
          },
          project: {
            title: 'Example',
            description: 'this is a description',
            keywords: ['one', 'two'],
            otherstuff: 'This shouln\'t be here',
          },
        })
        .expect(201);
      expect(response.body).toBeDefined();
      expect(response.body).not.toHaveProperty('email');
      expect(response.body.draft).not.toHaveProperty('otherstuff');
      expect(response.body.published).not.toHaveProperty('otherstuff');
    });

    test('it returns a 401 status when the user is not authenticated');
  });
});
