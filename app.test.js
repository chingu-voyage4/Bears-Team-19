const request = require('supertest');
const app = require('./app.js');

describe('Routes return data', () => {
    test('Get request to route path returns a response', (done) => {
        request(app).get('/')
            .then(res => {
                expect(res.statusCode).toBe(200);
                done();
            });
    })

    test('Get JSON response when requesting projects', async () => {
        const response = await request(app).get('/api/projects');
        expect(response.type).toEqual('application/json');
        expect(response.body.length).toEqual(5);
        expect(response.body).toMatchSnapshot();
    })
});
