'use strict';
const ordersService = require('../services/orders');
const coffeesService = require('../services/coffees');
module.exports = {
    create: (req) => {
        return coffeesService.read(req.body.coffee_id)
            .then(coffee => {
                if(coffee === {} || coffee.stock === 0){
                    console.log('ERROR SET ORDER -> out of stock');
                    return;
                }
                
                if((coffee.stock - req.body.quantity) <= 0) {
                    console.log('ERROR SET ORDER -> out of stock');
                    return;
                }
                
                const newOrder = {
                    user_id: req.user._id,
                    coffee_id: req.body.coffee_id,
                    amount: req.body.quantity * coffee.price,
                    quantity: req.body.quantity
                };
                
                const newCoffee = {
                    name: coffee.name,
                    stock: coffee.stock - req.body.quantity
                };
                return Promise.all([
                    ordersService.create(newOrder),
                    coffeesService.update(newCoffee)
                ]).then(result => {
                    console.log('SET ORDER -> order ' + result[0].quantity +
                        ' units of coffee -> ' + JSON.stringify(result[0]));
                    console.log('UPDATED COFFEE ' + result[1].id + ' -> ' + result[0].quantity +
                        ' units of coffee consumed -> ' + JSON.stringify(result[1]));
                    return result[1];
                });
        })
    },
    
    del: (id) => ordersService.del(id)
};
