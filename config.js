'use strict';
module.exports = {
    name: 'CoffeeMachine',
    version: '0.0.1',
    env: process.env.NODE_ENV || 'development',
    port: process.env.PORT || 3000,
    adminrole: 'admin',
    db: {
        uri: 'mongodb://172.17.0.2:27017',
        dbName: 'mydb'
    },
    oauth: {
        client_id: 'clientId',
        client_secret: 'clientSecret'
    }
};