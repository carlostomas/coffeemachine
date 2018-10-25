'use strict';
const OAuth2Server = require('oauth2-server'),
    Request = OAuth2Server.Request,
    Response = OAuth2Server.Response;

const model = require('../models/oauth');

const oauth = new OAuth2Server({
    model: model,
    grants: ['password'],
    debug: true
});

const config = require('../config');

module.exports = {
    gen: (username, password) => {
        const request = new Request({
            headers: {
                'Transfer-Encoding': 'chunked',
                'Content-Type': 'application/x-www-form-urlencoded'
            } ,
            body: {
                username: username,
                password: password,
                client_id: config.oauth.client_id,
                client_secret: config.oauth.client_secret,
                grant_type: 'password'
            },
            method: 'POST',
            query: {}
        });
        const response = new Response({});
        return oauth.token(request, response).then(res => {
            return {
                token: {
                    access_token: res.accessToken,
                    expiresIn: res.accessTokenExpiresAt,
                    user: {
                        id: res.user._id,
                        username: res.user.username,
                        role: res.user.role
                    }
                }
            }
        });
    },
    
    authenticate: (token) => {
        const request = new Request({
            headers: {
                'Transfer-Encoding': 'chunked',
                'Content-Type': 'application/x-www-form-urlencoded'
            } ,
            body: {
                access_token: token,
                client_id: config.oauth.client_id,
                client_secret: config.oauth.client_secret
            },
            method: 'POST',
            query: {}
        });
        const response = new Response({});
        return oauth.authenticate(request, response)
            .then(res => {
                return {
                    token: {
                        accessToken: res.accessToken,
                    },
                    user: res.user
                }
            })
    }
};
