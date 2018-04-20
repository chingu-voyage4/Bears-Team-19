const request = require('supertest');
const app = require('../../app.js');
const UserModel = require('../user/usermodel.js');
const ProjectModel = require('./projectmodel.js');

// to persist a session in Supertest
const agent = request.agent(app);

// database set up functions
async function removeAllProjects() {
  await ProjectModel.remove();
}

async function setupUser(done) {
  // create a test user
  const testUser = {
    username: 'testuser',
    email: 'test@example.com',
    password: 'qwertypoiu',
  };
  const newUser = new UserModel(testUser);
  newUser.save()
    .then(() => {
      // log in
      agent.post('/api/auth/login')
        .send({
          username: 'testuser',
          password: 'qwertypoiu',
        })
        .then(() => done())
        .catch(err => console.log(`Login failed: ${err}`));
    })
    .catch(err => console.log(`Save user failed: ${err}`));
}

// the tests
describe('Projects POST route', () => {
  beforeAll(async () => {
    await removeAllProjects();
  });

  afterAll(async () => {
    await removeAllProjects();
  });

  describe('User is logged in', () => {
    beforeAll(done => setupUser(done));

    afterAll(async () => {
      // delete test user
      await UserModel.remove({});
    });

    test('it replies with a 415 status if the Content-Type does not match "json"', async () => {
      await agent
        .post('/api/projects')
        .type('form')
        .send({ title: 'Example' })
        .expect(415);
    });

    test('it does not reply with a 415 status if the Content-Type is "json" with something else', async () => {
      await agent
        .post('/api/projects')
        .type('application/json;charset=UTF-8')
        .send({
          project: {
            title: 'Example',
            description: 'this is a description',
            keywords: ['one', 'two'],
          },
        })
        .expect(200);
    });

    test('it returns a 200 status when a project was successfully created', async () => {
      const response = await agent
        .post('/api/projects')
        .send({
          project: {
            title: 'Example',
            description: 'this is a description',
            keywords: ['one', 'two'],
          },
        })
        .expect(200);
      expect(response.body).toBeDefined();
      expect(response.body).toHaveProperty('authorName');
      expect(response.body).toHaveProperty('authorId');
      expect(response.body).toHaveProperty('_id');
      expect(response.body).toHaveProperty('draft');
      expect(response.body.draft).toHaveProperty('title');
      expect(response.body.draft).toHaveProperty('keywords');
      expect(response.body.draft).toHaveProperty('description');
      expect(response.body.draft).toHaveProperty('_id');
      expect(response.body.draft).toHaveProperty('createdAt');
    });

    test('it returns a 200 status when a project is created without a description or keywords', async () => {
      const response = await agent
        .post('/api/projects')
        .send({
          project: {
            title: 'Example',
          },
        })
        .expect(200);
      expect(response.body).toBeDefined();
      expect(response.body).toHaveProperty('authorName');
      expect(response.body).toHaveProperty('authorId');
      expect(response.body).toHaveProperty('_id');
      expect(response.body).toHaveProperty('draft');
      expect(response.body.draft).toHaveProperty('title');
      // keywords is an array - by default Mongoose creates an empty array
      expect(response.body.draft).toHaveProperty('keywords');
      expect(response.body.draft.keywords).toHaveLength(0);
      expect(response.body.draft).not.toHaveProperty('description');
      expect(response.body.draft).toHaveProperty('_id');
      expect(response.body.draft).toHaveProperty('createdAt');
    });

    test('it returns a 400 status when no data is provided', async () => {
      await agent
        .post('/api/projects')
        .set('Content-Type', 'application/json')
        .send()
        .expect(400);
    });

    test('it returns a 400 status when an empty object is provided', async () => {
      await agent
        .post('/api/projects')
        .send({})
        .expect(400);
    });

    test('it returns a 400 status when the project data is not provided', async () => {
      await agent
        .post('/api/projects')
        .send({
          something: 'irrelevant',
        })
        .expect(400);
    });

    test('it returns a 400 status when the project title is not provided', async () => {
      await agent
        .post('/api/projects')
        .send({
          project: {
            description: 'this is a description',
            keywords: ['one', 'two'],
          },
        })
        .expect(400);
    });

    test('it publishes the project (temporary behaviour)', async () => {
      const response = await agent
        .post('/api/projects')
        .send({
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
      const response = await agent
        .post('/api/projects')
        .send({
          project: {
            title: 'Example',
            description: 'this is a description',
            keywords: ['one', 'two'],
            otherstuff: 'This shouln\'t be here',
          },
        })
        .expect(200);
      expect(response.body).toBeDefined();
      expect(response.body).not.toHaveProperty('email');
      expect(response.body.draft).not.toHaveProperty('otherstuff');
      expect(response.body.published).not.toHaveProperty('otherstuff');
    });
  });

  describe('User is not logged in', () => {
    test('it returns a 401 status when the user is not logged in', async () => {
      await agent
        .post('/api/projects')
        .send({
          project: {
            title: 'Example',
            description: 'this is a description',
            keywords: ['one', 'two'],
          },
        })
        .expect(401);
    });
  });
});
