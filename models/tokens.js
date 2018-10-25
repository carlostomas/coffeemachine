'use strict';

const config  = require('../config'),
    mongoose = require('mongoose'),
    Schema = mongoose.Schema;

mongoose.connect(config.db.uri + '/' + config.db.dbName,{useNewUrlParser: true});

const clientSchema = new Schema({
    clientId: { type: String, required: true},
    clientSecret: { type: String, required: true}
});

const userSchema = new Schema({
    username: { type: String, required: true},
    role: { type: String, required: true}
});

const tokenSchema = new Schema({
    accessToken: { type: String, required: true},
    accessTokenExpiresAt: { type: Date, required: true},
    client: clientSchema,
    user: userSchema
});

const Token = mongoose.model('Token', tokenSchema);
module.exports = Token;

