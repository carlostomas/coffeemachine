'use strict';

const User = require('../models/users');
const crypto = require('crypto');
const oauth = require('../lib/oauth');

module.exports = {
    create: user => {
        const pass = crypto.createHash('md5').update(user.password).digest('hex');
        user.password = pass;
        return User.create(user)
        .then(result => ({
                id: result._id,
                username: result.username,
                role: result.role
            }));
    },

    read: id => User.findById(id)
        .then(result => {
            if (!result) {
                return;
            }

            return {
                id: result._id,
                username: result.username,
                role: result.role
            }
        }),

    update: user => User.findOneAndUpdate({'username': user.username},user).then(result => ({
                id: result._id,
                username: result.username,
                role: result.role
            })),

    del: id => User.deleteOne({'_id': id}),

    login: user => oauth.gen(user.username, crypto.createHash('md5').update(user.password).digest('hex')),

    check: token => oauth.authenticate(token)

};
