'use strict';

const config = require('./config'),
    restify = require('restify'),
    auth = require('./controllers/auth'),
    usersRoute = require('./routes/users'),
    coffeesRoute = require('./routes/coffees'),
    ordersRoute = require('./routes/orders'),
    testRoute = require('./routes/test'),
    loginRoute = require('./routes/users/login');

const server = restify.createServer({
    name: config.name,
    version: config.version
});

server.use(restify.plugins.jsonBodyParser({ mapParams: true }));
server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser({ mapParams: true }));
server.use(restify.plugins.fullResponse());


server.use(auth.checkToken);

usersRoute.applyRoutes(server);
testRoute.applyRoutes(server);
loginRoute.applyRoutes(server);
coffeesRoute.applyRoutes(server);
ordersRoute.applyRoutes(server);

server.listen(config.port, () => {
    console.log('Corner Coffee Marketpalce service is ready on %s', server.url);
});

module.exports = server;
