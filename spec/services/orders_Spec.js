'use strict';
const proxyquire = require('proxyquire').noCallThru();

let jasmineWrapper;

const debug = false;
if (debug) {
    const Jasmine = require('jasmine');// eslint-disable-line global-require
    jasmineWrapper = new Jasmine();
    global.jasmine = jasmineWrapper.jasmine;
}

const orderModelMock = jasmine.createSpyObj('Coffee model', ['create','del']);

orderModelMock.create = jasmine.createSpy('create').and.callFake(coffee => Promise.resolve(true));
orderModelMock.deleteOne = jasmine.createSpy('deleteOne').and.callFake(user => Promise.resolve(true));

const sut = proxyquire('../../services/orders', {
    '../models/orders': orderModelMock
});

describe('Order service', () => {
    it('create', done => {
        sut.create({}).then(res => {
            expect(res).not.toBe(null);
            expect(orderModelMock.create).toHaveBeenCalledTimes(1);
            done();
        });
    });

    it('del', done => {
        sut.del(1).then(res => {
            expect(res).not.toBe(null);
            expect(orderModelMock.deleteOne).toHaveBeenCalledTimes(1);
            done();
        });
    })
});

if (debug) {
    jasmineWrapper.execute();
}
