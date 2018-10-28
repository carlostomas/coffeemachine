'use strict';
const proxyquire = require('proxyquire').noCallThru();

let jasmineWrapper;

const debug = false;
if (debug) {
    const Jasmine = require('jasmine');// eslint-disable-line global-require
    jasmineWrapper = new Jasmine();
    global.jasmine = jasmineWrapper.jasmine;
}

const ordersServiceMock = jasmine.createSpyObj('Orders service', ['create']);
const coffeesServiceMock = jasmine.createSpyObj('Coffees service', ['read','update']);

ordersServiceMock.create = jasmine.createSpy('create').and.callFake(coffee => Promise.resolve(true));
coffeesServiceMock.update = jasmine.createSpy('update').and.callFake(order => Promise.resolve(
    [{},{id: 1}]
));


const sut = proxyquire('../../controllers/orders',{
    '../services/orders': ordersServiceMock,
    '../services/coffees': coffeesServiceMock
});

coffeesServiceMock.read = jasmine.createSpy('read').and.callFake(coffee => Promise.resolve({
    stock: 10,
    price: 0.9
}));

let coffeeReq;

describe('Orders controller', () => {
    describe('create order', () => {
        it('Stock is enough', done => {
            coffeeReq = {
                body: {
                    coffee_id: 1,
                    quantity: 5
                },
                user: 1
            };
            
            sut.create(coffeeReq).then(res => {
                expect(ordersServiceMock.create).toHaveBeenCalledTimes(1);
                expect(coffeesServiceMock.update).toHaveBeenCalledTimes(1);
                done();
            })
        });
        
        it('Stock is not enough', done => {
            coffeeReq = {
                body: {
                    coffee_id: 1,
                    quantity: 10
                },
                user: 1
            };
            
            sut.create(coffeeReq).then(res => {
                ordersServiceMock.create.calls.reset();
                coffeesServiceMock.update.calls.reset();
                expect(ordersServiceMock.create).toHaveBeenCalledTimes(0);
                expect(coffeesServiceMock.update).toHaveBeenCalledTimes(0);
                done();
            })
        });
    });
});

if (debug) {
    jasmineWrapper.execute();
}
