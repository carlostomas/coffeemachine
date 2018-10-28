'use strict';

const Router = require('restify-router').Router;
const router = new Router();

const usersService = require('../services/users');
const adminRole = require('../config').adminrole;

function byId (req, res, next) {
    if (!req.user) {
        res.send(401,'Unauthorized');
        next();
        return;
    }
    usersService.read(req.params.id)
        .then(result => {
            if (!result || result === {}) {
                res.send(404, 'Not found');
                next();
                return;
            }
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
        res.send(401,'Unauthorized');
        next();
        return;
    }

    if (req.user.role !== adminRole) {
        res.send(401, 'Must be admin role!');
        next();
        return;
    }

    if (!req.body.username || !req.body.password || !req.body.role) {
        res.send(401, 'Missing user data!');
        next();
        return;
    }

    usersService.create(req.body)
        .then(result => {
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

    usersService.del(req.params.id)
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
        res.send(401,'Unauthorized');
        next();
        return;
    }

    if (req.user.role !== adminRole) {
        res.send(401, 'Must be admin role!');
        next();
        return;
    }

    usersService.update(req.body)
    .then(result => {
        res.send(200, result);
        next();
    })
    .catch(err => {
        res.send(500, err);
        next();
    });
}

router.get('/users/:id', byId);
router.post('/users', post);
router.put('/users', update);
router.del('/users/:id', del);

module.exports = router;
