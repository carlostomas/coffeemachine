'use strict';

const config  = require('../config'),
    mongoose = require('mongoose'),
    Schema = mongoose.Schema;

mongoose.connect(config.db.uri + '/' + config.db.dbName,{useNewUrlParser: true});

const userSchema = new Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, required: true },
    created_at: Date,
    updated_at: Date
});

const User = mongoose.model('User', userSchema);
module.exports = User;

