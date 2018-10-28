'use strict';

const Order = require('../models/orders');

module.exports = {
    create: order => Order.create(order)
        .then(result => ({
                id: result._id,
                user_id: result.user_id,
                coffee_id: result.coffee_id,
                amount: result.amount,
                quantity: result.quantity

            })),

    del: id => Order.deleteOne({'_id': id})
};
