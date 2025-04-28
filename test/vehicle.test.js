const request = require('supertest');
const app = require('./app'); // Your Express app

describe('GET /vehicles', () => {
  it('should return all vehicles', async () => {
    const response = await request(app).get('/vehicles');
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });
});
