const request = require('supertest');
const app = require('../index');
const { sequelize } = require('../models');

it('should search kiosks near location', async () => {
    const res = await request(app)
        .post('/kiosks/search')
        .set('Authorization', `Bearer ${token}`)
        .send({
            geolocation: { lat: 34.01, lng: -6.83 },
            maxDistance: 10
        });

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
});
