import request from 'supertest';
import app from '../src/backend/app.js';
import { testtoken } from '../src/config/env.js';

// Test to get a list of all items in the library db.
describe('GET /v1/library', () => {
    it("Should return a list of items in the library", async () => {
        const response = await request(app).get('/v1/library')
        expect(response.status).toBe(200)
        expect(Array.isArray(response.body.library)).toBe(true)
    })
})

// Test to get an item in the library db by it's id.
describe("GET /v1/library/:id", () => {
    it("Should return an item found by it's id", async () => {
        const response = await request(app).get('/v1/library/1')
        expect(response.status).toBe(200)
        expect(Array.isArray(response.body.item)).toBe(true)
    })
})

// Test to get a user's list of items.
describe("GET /v1/library/user/:id", () => {
    it("Should return a user's list of items", async () => {
        const response = await request(app).get('/v1/library/user/1')
        expect(response.status).toBe(200)
        expect(Array.isArray(response.body.items)).toBe(true)
    })
})

// Test to create an item in the library for a user
describe("POST /v1/library/:id", () => {
    it("Should post an item in the library", async () => {
        const newItem = {
            name: 'test jest name',
            description: 'test jest description',
            imageURL: "test jest url",
            rating: 4
        };
        const response = await request(app)
        .post('/v1/library/1')
        .send(newItem)
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${testtoken}`);

        expect(response.status).toBe(200)
    })

    it("Should reject with missing parameters", async () => {
        const newItem = {
            name: 'test jest name'
        }

        const response = await request(app)
        .post('/v1/library/1')
        .send(newItem)
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${testtoken}`);
        expect(response.status).toBe(400)
    })
})