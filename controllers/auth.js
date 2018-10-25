'use strict';
const usersService = require('../services/users');

module.exports = {
    checkToken: (req, res, next) => {
        if (req.headers.hasOwnProperty('x_access_token') || req.headers.hasOwnProperty('x-access-token')) {
            return usersService.check(req.headers.x_access_token || req.headers['x-access-token'])
                .then(result => {
                    req.user = result.user;
                    next();
                }).catch(err => next(err));
        } else {
            next();
        }
    },
    
    login: (user) => usersService.login(user)
};
