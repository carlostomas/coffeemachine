'use strict';

const Coffee = require('../models/coffees');

module.exports = {
    create: coffee => Coffee.create(coffee)
        .then(result => {
            const data = {
                id: result._id,
                name: result.name,
                intensity: result.intensity,
                price: result.price,
                stock: result.stock
            };
            console.log('SET COFFEE -> ' + JSON.stringify(data));
            return data;
        })
        .catch(err => err),

    read: id => Coffee.findById(id)
        .then(result => {
            if (!result) {
                return;
            }
            return {
                id: result._id,
                name: result.name,
                intensity: result.intensity,
                price: result.price,
                stock: result.stock

            }
        }),

    update: coffee => Coffee.findOneAndUpdate({'name': coffee.name},coffee)
            .then(result => {
                const data = {
                    id: result._id,
                    name: result.name,
                    intensity: result.intensity,
                    price: result.price,
                    stock: result.stock
                };
                return data;
        }),

    del: id => Coffee.deleteOne({'_id': id})
};
