# winston-console-graylog2-logger

A small wrapper around the winston's console and graylog2 transports.

## Install

    npm install git://github.com/iliyan-trifonov/winston-console-graylog2-logger

#### or in package.json:

    "dependencies": {
        ...
        "winston-console-graylog2-logger": "iliyan-trifonov/winston-console-graylog2-logger"
    }

## Usage

    Logger = require('winston-console-graylog2-logger'),
    log = new Logger({
        enable: true,
        graylog2: {
            enable: true,
            host: "127.0.0.1",
            port: "12201"
        }
    });
    
#### After that you can log with:

    log.info('custom message', 'Hello, World!');
    log.info('custom message', obj);
    log.info('custom message', { field1: "value1", field2: "value2 });
    log.error('app error', error);

## Reason

I needed a small wrapper around the 2 winston's transports important to me: console and graylog2.
There was also a need to format the message sent to Graylog2 in a different way.
Custom timestamp and colors are used for the console logging.
I want to use this small module in more than one of my own projects without copy-pasting the same code/files everywhere.
If the need arises I will change some parts of the code here or change it completely.
