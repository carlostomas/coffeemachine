'use strict';

const config  = require('../config'),
    mongoose = require('mongoose'),
    Schema = mongoose.Schema;

mongoose.connect(config.db.uri + '/' + config.db.dbName,{useNewUrlParser: true});

const orderSchema = new Schema({
    user_id: { type: String, required: true},
    coffee_id: { type: String, required: true },
    amount: { type: Number, required: true },
    quantity: { type: Number, required: true }
});

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;

