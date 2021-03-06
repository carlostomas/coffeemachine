'use strict';

const Tokens = require('./tokens'),
    Users = require('./users');

const config = require('../config');

module.exports = {
    getAccessToken: bearerToken => Tokens.find({accessToken: bearerToken})
            .then(res => {
                if (!res[0]) {
                    return;
                }
                return res[0];
            }),

    getClient: (clientId, clientSecret) => {
        if (config.oauth.client_id === clientId && config.oauth.client_secret === clientSecret) {
            return Promise.resolve({
                clientId: clientId,
                clientSecret: clientSecret,
                grants: ['password']
            })
        }
        Promise.reject();
    },

    getUser: (username, password) => Users.find({username: username})
            .then(result => {
                if (result.length === 0) {
                    return;
                }
                if (password === result[0]._doc.password) {
                    return {
                        _id: result[0]._doc._id,
                        username: result[0]._doc.username,
                        role: result[0]._doc.role
                    };
                }
            })
            .catch(err => err),

    saveToken: (token, client, user) => {
        const data = {
            accessToken: token.accessToken,
            accessTokenExpiresAt: token.accessTokenExpiresAt,
            client: client,
            user: user
        };
        return Tokens.update({'user.username': user.username},data,{upsert: true}).then(() => data)
    }
};
