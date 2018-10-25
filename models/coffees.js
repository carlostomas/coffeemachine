'use strict';

const config  = require('../config'),
    mongoose = require('mongoose'),
    Schema = mongoose.Schema;

mongoose.connect(config.db.uri + '/' + config.db.dbName,{useNewUrlParser: true});

const userSchema = new Schema({
    name: { type: String, required: true, unique: true },
    intensity: { type: Number, required: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true }
});

const Coffee = mongoose.model('Coffee', userSchema);
module.exports = Coffee;

