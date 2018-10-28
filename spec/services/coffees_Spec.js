'use strict';
const proxyquire = require('proxyquire').noCallThru();

let jasmineWrapper;

const debug = false;
if (debug) {
    const Jasmine = require('jasmine');// eslint-disable-line global-require
    jasmineWrapper = new Jasmine();
    global.jasmine = jasmineWrapper.jasmine;
}

const coffeeModelMock = jasmine.createSpyObj('Coffee model', ['create','read','update','del']);

coffeeModelMock.create = jasmine.createSpy('create').and.callFake(coffee => Promise.resolve(true));
coffeeModelMock.findById = jasmine.createSpy('findById').and.callFake(id => Promise.resolve(true));
coffeeModelMock.findOneAndUpdate = jasmine.createSpy('findOneAndUpdate').and.callFake(name => Promise.resolve(true));
coffeeModelMock.deleteOne = jasmine.createSpy('deleteOne').and.callFake(user => Promise.resolve(true));

const sut = proxyquire('../../services/coffees', {
    '../models/coffees': coffeeModelMock
});

describe('Coffee service', () => {
    it('create', done => {
        sut.create({}).then(res => {
            expect(res).not.toBe(null);
            expect(coffeeModelMock.create).toHaveBeenCalledTimes(1);
            done();
        });
    });

    it('read', done => {
        sut.read(1).then(res => {
            expect(res).not.toBe(null);
            expect(coffeeModelMock.findById).toHaveBeenCalledTimes(1);
            done();
        });
    });

    it('update', done => {
        sut.update(1).then(res => {
            expect(res).not.toBe(null);
            expect(coffeeModelMock.findOneAndUpdate).toHaveBeenCalledTimes(1);
            done();
        });
    });

    it('del', done => {
        sut.del(1).then(res => {
            expect(res).not.toBe(null);
            expect(coffeeModelMock.deleteOne).toHaveBeenCalledTimes(1);
            done();
        });
    })
});

if (debug) {
    jasmineWrapper.execute();
}
