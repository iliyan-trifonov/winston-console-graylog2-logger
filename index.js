'use strict';

var config,
    winston = require('winston'),
    moment = require('moment'),
    log2console,
    log2graylog;

function Logger (cnf) {
    if (!cnf) {
        throw new Error('Invalid configuration!');
    }
    config = cnf;
    if (config.enable) {
        winston.loggers.add('log2console', {
            console: {
                colorize: true,
                timestamp: function () {
                    return moment().format("D MMM HH:mm:ss")
                },
                handleExceptions: true,
                humanReadableUnhandledException: true
            }
        });
        log2console = winston.loggers.get('log2console');
        if (config.graylog2 && config.graylog2.enable) {
            var WinstonGraylog2 = require('winston-graylog2');
            winston.loggers.add('log2graylog', {
                transports: [
                    new (WinstonGraylog2)({
                        name: 'Chat',
                        handleExceptions: true,
                        graylog: {
                            facility: config.graylog2.facility,
                            servers: [{
                                host: config.graylog2.host,
                                port: config.graylog2.port
                            }]
                        }
                    })
                ]
            });
            log2graylog = winston.loggers.get('log2graylog');
            log('info', 'Using graylog2', config.graylog2);
        }
    }
}

function log(level, msg, meta) {
    if (!config.enable) {
        return false;
    }
    if (!meta) {
        meta = {};
    }
    if (log2console) {
        log2console.log(level, msg, meta);
    }
    if (log2graylog) {
        log2graylog.log(level, msg + ' ' + JSON.stringify(meta), meta);
    }
}

Logger.prototype.info = function (msg, meta) {
    log('info', msg, meta);
};

Logger.prototype.error = function (msg, meta) {
    log('error', msg, meta);
};

module.exports = Logger;
