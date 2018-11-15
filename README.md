AJJ-Logger
===
# Usage
```js
const AjjLogger = require('../src/ajj-logger')({ level: 'info', app: 'DemoApp' });

AjjLogger.info('info from global scope')

function info() {
    AjjLogger.info('info from function scope');
}

info();

function TestClass() {
    this.error = () => {
        AjjLogger.error('error from method');
    }

    this.debug = () => {
        AjjLogger.debug('debug from method');
    }

    this.warn = () => {
        AjjLogger.warn('warn from method');
    }

    this.log = () => {
        AjjLogger.log('log from method');
    }

    this.info = () => {
        AjjLogger.info('info from method');
    }
}

const t = new TestClass();
t.error();
t.warn();
t.debug();
t.log();
t.info();
```