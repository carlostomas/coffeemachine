'use strict';

const includes = require('./wallabyInclude');


module.exports = function () {
    return {
        files: includes,

        tests: [
            'spec/**/*[sS]pec.js'
        ],
        env: {
            type: 'node',
            runner: 'node',
            params: {
                env: 'CONFIG_LOGGER_PATH=config/logger.js'
            }
        },

        testFramework: 'jasmine'
    };
};
