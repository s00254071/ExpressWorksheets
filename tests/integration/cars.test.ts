import request from "supertest";
import { app } from "../../src/app";

describe('GET /cars', () => {

    it('returns all cars', async () => {

        const response = await request(app)
            .get('/api/v1/cars')
            .set('x-api-key', 'blahblah');

        expect(response.status).toBe(200);

    });
});

describe('POST /cars, then GET, then DELETE', () => {

    it('creates a car, fetches it, deletes it, then cannot find it', async () => {

        const createResponse = await request(app)
            .post('/api/v1/cars')
            .set('x-api-key', 'blahblah')
            .send({ make: 'Toyota', model: 'Corolla', year: 2020 });

        expect(createResponse.status).toBe(201);
        expect(createResponse.body.make).toBe('Toyota');
        expect(createResponse.body.model).toBe('Corolla');
        expect(createResponse.body.year).toBe(2020);

        const id = createResponse.body._id;

        const getResponse = await request(app)
            .get(`/api/v1/cars/${id}`)
            .set('x-api-key', 'blahblah');

        expect(getResponse.status).toBe(200);
        expect(getResponse.body.make).toBe('Toyota');

        const deleteResponse = await request(app)
            .delete(`/api/v1/cars/${id}`)
            .set('x-api-key', 'blahblah');

        expect(deleteResponse.status).toBe(200);

        const getAfterDeleteResponse = await request(app)
            .get(`/api/v1/cars/${id}`)
            .set('x-api-key', 'blahblah');

        expect(getAfterDeleteResponse.status).toBe(404);

    });
});