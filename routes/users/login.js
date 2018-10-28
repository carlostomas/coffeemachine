'use strict';

const Router = require('restify-router').Router;
const router = new Router();
const auth = require('../../controllers/auth');

function login (req, res, next) {
    if(!req.body.username || !req.body.password) {
        res.send(400,'Username and password required');
        next();
        return;
    }
    auth.login(req.body).then(result => {
        res.send(200,result);
        next();
    }).catch(err => {
        if (err && err.name === 'invalid_grant') {
            res.send(400, err.message);
            next();
            return;
        }
        res.send(500, err);
        next();
    });
}

router.post('/users/login', login);

module.exports = router;


