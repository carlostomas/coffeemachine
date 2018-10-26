'use strict';

const userDefault = {
    username: 'admin',
    role: 'admin',
    password: 'admin'
};

const usersService = require('./services/users');

function createUser () {
    return usersService.create(userDefault)
        .then(res => {
            console.log('Default user created' + res);
            return Promise.resolve(res);
        })
        .catch(err => {
            console.log('ERROR ' + err);
            return Promise.reject(err);
        });
    }
createUser();
