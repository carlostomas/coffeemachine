'use strict';

const Router = require('restify-router').Router;
const router = new Router();

function test (req, res, next) {
    console.log('Test service');
    res.send(200,'Service is running');
    next();
}
router.get('/test', test);
module.exports = router;


