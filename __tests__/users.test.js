import request from 'supertest';
import app from '../src/backend/app.js';
import { testtoken } from '../src/config/env.js';

describe('GET /v1/users', () => {
    it('responds with JSON containing a list of users', async () => {
        const response = await request(app).get('/v1/user');
        expect(response.status).toBe(200);
    });
});

// Test to get a user's information
describe("GET /v1/user/:id", () => {
    it("Should return a user's information", async () => {
        const response = await request(app).get('/v1/user/1').set('Authorization', `Bearer ${testtoken}`)
        expect(response.status).toBe(200)
        console.log(response.body)
        expect(response.body.user.username).toBe('test')
        expect(response.body.user.id).toBe(1)
    })
})