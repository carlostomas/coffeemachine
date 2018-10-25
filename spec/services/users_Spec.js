'use strict';
const proxyquire = require('proxyquire').noCallThru();

let jasmineWrapper;

const debug = false;
if (debug) {
    const Jasmine = require('jasmine');// eslint-disable-line global-require
    jasmineWrapper = new Jasmine();
    global.jasmine = jasmineWrapper.jasmine;
}
const USER = {
    username: 'pepe',
    password: 'pass',
    role: 'role'
};

const usersModelMock = jasmine.createSpyObj('Coffee model', ['create','read','update','del']);
usersModelMock.create = jasmine.createSpy('create').and.callFake((coffee) => Promise.resolve(true));
usersModelMock.findById = jasmine.createSpy('findById').and.callFake((id) => Promise.resolve(true));
usersModelMock.findOneAndUpdate = jasmine.createSpy('findOneAndUpdate').and.callFake((name) => Promise.resolve(true));
usersModelMock.deleteOne= jasmine.createSpy('deleteOne').and.callFake((user) => Promise.resolve(true));

const oauthLibMock = jasmine.createSpyObj('Oauth lib', ['gen','authenticate']);
oauthLibMock.gen = jasmine.createSpy('gen').and.callFake((user, pass) => Promise.resolve(true));
oauthLibMock.authenticate = jasmine.createSpy('authenticate').and.callFake((token) => Promise.resolve(true));

const sut = proxyquire('../../services/users', {
    '../models/users': usersModelMock,
    '../lib/oauth': oauthLibMock
});


describe('Users service', () => {
    it('create', done => {
        sut.create(USER).then(res => {
            expect(res).not.toBe(null);
            expect(usersModelMock.create).toHaveBeenCalledTimes(1);
            done();
        });
    });
    
    it('read', done => {
        sut.read(1).then(res => {
            expect(res).not.toBe(null);
            expect(usersModelMock.findById).toHaveBeenCalledTimes(1);
            done();
        });
    });
    
    it('update', done => {
        sut.update(1).then(res => {
            expect(res).not.toBe(null);
            expect(usersModelMock.findOneAndUpdate).toHaveBeenCalledTimes(1);
            done();
        });
    });
    
    it('del', done => {
        sut.del(1).then(res => {
            expect(res).not.toBe(null);
            expect(usersModelMock.deleteOne).toHaveBeenCalledTimes(1);
            done();
        });
    });
    
    it('login', done => {
        sut.login(USER).then(res => {
            expect(res).not.toBe(null);
            expect(oauthLibMock.gen).toHaveBeenCalledTimes(1);
            done();
        });
    });
    
    it('check', done => {
        sut.check(1).then(res => {
            expect(res).not.toBe(null);
            expect(oauthLibMock.authenticate).toHaveBeenCalledTimes(1);
            done();
        });
    });
});

if (debug) {
    jasmineWrapper.execute();
}
