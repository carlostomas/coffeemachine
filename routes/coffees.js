'use strict';

const Router = require('restify-router').Router;
const router = new Router();

const coffeesService = require('../services/coffees');
const adminRole = require('../config').adminrole;
function byId (req, res, next) {
    if (!req.user) {
        res.send(401, 'Unauthorized');
        next();
        return;
    }
    coffeesService.read(req.params.id)
        .then(result => {
            res.send(200, result);
            next();
        })
        .catch(err => {
            res.send(500, err);
            next();
        });
}

function post (req, res, next) {
    if (!req.user) {
        res.send(401, 'Unauthorized');
        next();
        return;
    }

    if (req.user.role !== adminRole) {
        res.send(401, 'Must be admin role!');
        next();
        return;
    }

    if (!req.body.name || !req.body.intensity || !req.body.price || !req.body.stock) {
        res.send(401, 'Missing coffee data!');
        next();
        return;
    }

    coffeesService.create(req.body)
        .then(result => {
            if (result.errmsg) {
                res.send(400, 'Coffee duplicated')
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
        res.send(401, 'Unauthorized');
        next();
        return;
    }

    if (req.user.role !== adminRole) {
        res.send(401, 'Must be admin role!');
        next();
        return;
    }

    coffeesService.del(req.params.id)
    .then(result => {
        res.send(200, result);
        next();
    })
    .catch(err => {
        res.send(500, err);
        next();
    });
}

function update (req, res, next) {
    if (!req.user) {
        res.send(401, 'Unauthorized');
        next();
        return;
    }

    if (req.user.role !== adminRole) {
        res.send(401, 'Must be admin role!');
        next();
        return;
    }

    coffeesService.update(req.body)
    .then(result => {
        res.send(200, result);
        next();
    })
    .catch(err => {
        res.send(500, err);
        next();
    });
}

router.get('/coffees/:id', byId);
router.post('/coffees', post);
router.put('/coffees', update);
router.del('/coffees/:id', del);

module.exports = router;
