'use strict';

const request = require('request');
const server = require('../bootstrap');

const userAdmin = {
    username: 'adminTest',
    role: 'admin',
    password: 'admin'
};

const userUser = {
    username: 'user',
    role: 'user',
    password: 'user'
};

const coffee = {
    name: 'new coffee',
    intensity: 10,
    price: 1.9,
    quantity: 10
};

const usersService = require('../services/users');
const ordersService = require('../services/orders');
const coffeesService = require('../services/coffees');

let adminId, userId, orderId, coffeeId, adminToken, userToken;

describe('Coffee Machine Test', () => {
    beforeAll(done => {
        server.listen(3000, () => {
            usersService.create(userAdmin).then(res => {
                adminId = res.id;
                done();
            });
        });
    });

    describe('As admin user, wants to', () => {
        it('log in', done => {
            request.post({
                url: 'http://localhost:3000/users/login',
                json: true,
                headers: {
                    'Cache-Control': 'no-cache',
                    'Content-Type': 'application/json;charset=UTF-8'
                },
                body: {username: 'adminTest', password: 'admin'}
            }, (error, response, body) => {
                expect(error).toBe(null);
                expect(response.statusCode).toBe(200);
                adminToken = body.token.access_token;
                done();
            });
        });

        it('create new user', done => {
            request.post({
                url: 'http://localhost:3000/users',
                json: true,
                headers: {
                    'Cache-Control': 'no-cache',
                    'Content-Type': 'application/json;charset=UTF-8',
                    'x-access-token': adminToken
                },
                body: {
                    username: 'user',
                    role: 'user',
                    password: 'user'
                }
            }, (error, response, body) => {
                expect(error).toBe(null);
                expect(response.statusCode).toBe(201);
                userId = body.id;
                done();
            })
        });

        it('create new coffee', done => {
            request.post({
                url: 'http://localhost:3000/coffees',
                json: true,
                headers: {
                    'Cache-Control': 'no-cache',
                    'Content-Type': 'application/json;charset=UTF-8',
                    'x-access-token': adminToken
                },
                body: {
                    name: 'new coffee',
                    intensity: 10,
                    price: 1.9,
                    stock: 10
                }
            }, (error, response, body) => {
                expect(error).toBe(null);
                expect(response.statusCode).toBe(201);
                coffeeId = body.id;
                done();
            })
        });
    });

    describe('As user wants to', () => {
        it('log in', done => {
            request.post({
                url: 'http://localhost:3000/users/login',
                json: true,
                headers: {
                    'Cache-Control': 'no-cache',
                    'Content-Type': 'application/json;charset=UTF-8'
                },
                body: {username: 'user', password: 'user'}
            }, (error, response, body) => {
                expect(error).toBe(null);
                expect(response.statusCode).toBe(200);
                userToken = body.token.access_token;
                done();
            });
        });

        it('create new order', done => {
            request.post({
                url: 'http://localhost:3000/orders',
                json: true,
                headers: {
                    'Cache-Control': 'no-cache',
                    'Content-Type': 'application/json;charset=UTF-8',
                    'x-access-token': userToken
                },
                body: {
                    coffee_id: coffeeId,
                    user_id: userId,
                    quantity: 5
                }
            }, (error, response, body) => {
                expect(error).toBe(null);
                expect(response.statusCode).toBe(201);
                done();
            })
        });

        it('check coffee stock', done => {
            request.get({
                url: 'http://localhost:3000/coffees/' + coffeeId,
                json: true,
                headers: {
                    'Cache-Control': 'no-cache',
                    'Content-Type': 'application/json;charset=UTF-8',
                    'x-access-token': userToken
                }
            }, (error, response, body) => {
                expect(error).toBe(null);
                expect(response.statusCode).toBe(200);
                expect(body.stock).toBe(5);
                done();
            })
        });

        it('dont able to create a new order with quantity bigger than stock', done => {
            request.post({
                url: 'http://localhost:3000/orders',
                json: true,
                headers: {
                    'Cache-Control': 'no-cache',
                    'Content-Type': 'application/json;charset=UTF-8',
                    'x-access-token': userToken
                },
                body: {
                    coffee_id: coffeeId,
                    user_id: userId,
                    quantity: 6
                }
            }, (error, response, body) => {
                expect(error).toBe(null);
                expect(response.statusCode).toBe(400);
                done();
            })
        });
    });

    afterAll(done => {
        Promise.all([
            usersService.del(adminId),
            usersService.del(userId),
            coffeesService.del(coffeeId)
        ]).then(res => {
            done();
        })
    });
});

