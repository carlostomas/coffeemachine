'use strict';

const Router = require('restify-router').Router;
const router = new Router();

const ordersController = require('../controllers/orders');
const adminRole = require('../config').adminrole;

function post (req, res, next) {
    if (!req.user) {
        res.send(401,'Unauthorized');
        next();
        return;
    }

    if (!req.body.coffee_id || !req.body.quantity) {
        res.send(401, 'Missing order data!');
        next();
        return;
    }

    ordersController.create(req)
        .then(result => {
            if (!result) {
                res.send(400, 'No enough coffee at stock!');
                next();
                return;
            }
            res.send(201, result);
            next();
        })
        .catch(err => {
            res.send(500, err);
            next();
        });
}

function del (req, res, next) {
    if (!req.user) {
        res.send(401,'Unauthorized');
        next();
        return;
    }

    if (req.user.role !== adminRole) {
        res.send(401, 'Must be admin role!');
        next();
        return;
    }

    ordersController.del(req.params.id)
    .then(result => {
        res.send(200, result);
        next();
    })
    .catch(err => {
        res.send(500, err);
        next();
    });
}
router.post('/orders', post);
router.del('/orders/:id', del);

module.exports = router;
