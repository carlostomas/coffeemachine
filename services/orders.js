'use strict';

const Order = require('../models/orders');

module.exports = {
    create: order => {
        return Order.create(order)
        .then(result => {
            return {
                id: result._id,
                user_id: result.user_id,
                coffee_id: result.coffee_id,
                amount: result.amount,
                quantity: result.quantity
            
            }
        });
    },
    
    del: id => {
        return Order.deleteOne({'_id': id});
    }
};
