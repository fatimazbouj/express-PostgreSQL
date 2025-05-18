const request = require('supertest');
const app = require('../index');
const { sequelize } = require('../models');

describe('Auth Routes', () => {
    beforeAll(async () => {
        await sequelize.sync({ force: true });
    });

    let userId = null;
    let token = null;

    it('should register a new user', async () => {
        const res = await request(app)
            .post('/users/register')
            .send({
                firstname: 'Fatima',
                lastname: 'Zahra',
                countryCode: '+212',
                phone: '601010101',
                password: '123456'
            });

        expect(res.statusCode).toEqual(201);
        expect(res.body.userId).toBeDefined();
        userId = res.body.userId;
    });

    it('should login and return JWT token', async () => {
        const res = await request(app)
            .post('/users/login')
            .send({
                countryCode: '+212',
                phone: '684279502',
                password: '123'
            });

        expect(res.statusCode).toEqual(200);
        expect(res.body.accessToken).toBeDefined();
        token = res.body.accessToken;
    });

    it('should reject login with wrong password', async () => {
        const res = await request(app)
            .post('/users/login')
            .send({
                countryCode: '+212',
                phone: '601010101',
                password: 'wrongpassword'
            });

        expect(res.statusCode).toEqual(401);
    });

    it('should deny access to /users/:id without token', async () => {
        const res = await request(app)
            .get(`/users/${userId}`);

        expect(res.statusCode).toBe(401);
    });

    it('should access /users/:id with valid token', async () => {
        const res = await request(app)
            .get(`/users/${userId}`)
            .set('Authorization', `Bearer ${token}`);

        expect(res.statusCode).toBe(200);
        expect(res.body.firstname).toBe('Fatima');
    });
});
