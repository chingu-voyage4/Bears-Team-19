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
    title: 'Ultimate to-do list',
    authorId,
    authorName,
    keywords: ['web', 'react', 'js'],
    description: 'We want to create the ultimate to-do list! The project is already started and we need more developers.\nContact me for more info.',
    lastSaved: new Date(Date.UTC(2018, 3, 15, 11, 32, 45)),
    lastPublished: new Date(Date.UTC(2018, 3, 15, 11, 32, 45)),
    isPublic: true,
  },
  {
    title: 'Mario-inspired game for the web',
    authorId,
    authorName,
    keywords: ['web', 'react', 'js'],
    description: 'The idea is to create a platformer inspired by Mario and have it run in the browser. We need artists, javascript developers, level designers...',
    lastSaved: new Date(Date.UTC(2018, 2, 27, 18, 3, 2)),
    lastPublished: new Date(Date.UTC(2018, 3, 15, 11, 32, 45)),
    isPublic: true,
  },
  {
    title: 'Test project',
    authorId,
    authorName,
    keywords: ['web', 'game', 'python'],
    description: 'Not sure what this is about yet.',
    lastSaved: new Date(Date.UTC(2018, 2, 27, 18, 3, 2)),
    lastPublished: new Date(Date.UTC(2018, 3, 15, 11, 32, 45)),
    isPublic: true,
  },
];

const privateProjects = [
  {
    title: 'A project with two paragraphs',
    authorId,
    authorName,
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
    lastSaved: new Date(Date.UTC(2018, 2, 27, 18, 3, 2)),
    lastPublished: new Date(Date.UTC(2018, 3, 15, 11, 32, 45)),
    isPublic: false,
  },
  {
    title: 'A project with lots of short paragraphs',
    authorId,
    authorName,
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
    lastSaved: new Date(Date.UTC(2018, 2, 27, 18, 3, 2)),
    lastPublished: new Date(Date.UTC(2018, 3, 15, 11, 32, 45)),
    isPublic: false,
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
      });


      test('it only returns projects with the isPublic flag set', async () => {
        const response = await request(app)
          .get('/api/projects')
          .set('Accept', 'application/json');

        expect(response.type).toMatch(/json/);
        expect(response.status).toEqual(200);
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body).not.toHaveLength(allProjects.length);
        expect(response.body).toHaveLength(publicProjects.length);
        expect(response.body[0].isPublic).toBe(true);
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
    test('it replies with a 415 status if the Content-Type is anything other than "application/json"');
  });
});
