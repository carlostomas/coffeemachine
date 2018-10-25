'use strict';

const Coffee = require('../models/coffees');

module.exports = {
    create: coffee => {
        return Coffee.create(coffee)
        .then(result => {
            const data = {
                id: result._id,
                name: result.name,
                intensity: result.intensity,
                price: result.price,
                stock: result.stock,
            };
            console.log('SET COFFEE -> ' + JSON.stringify(data));
            return data;
        })
        .catch(err => err)
    },
    
    read: id => {
        return Coffee.findById(id)
        .then(result => {
            return {
                id: result._id,
                name: result.name,
                intensity: result.intensity,
                price: result.price,
                stock: result.stock,
            
            }
        });
    },
    
    update: coffee => {
        return Coffee.findOneAndUpdate({'name': coffee.name},coffee)
            .then(result => {
                const data = {
                    id: result._id,
                    name: result.name,
                    intensity: result.intensity,
                    price: result.price,
                    stock: result.stock,
                };
                return data;
        })
    },
    
    del: id => {
        return Coffee.deleteOne({'_id': id});
    }
};
