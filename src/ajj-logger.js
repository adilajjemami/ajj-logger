const libCaller = require('./caller');

const levels = {
    error: {
        error: true,
        warn: false,
        debug: false,
        log: false,
        info: false
    },
    warn: {
        error: true,
        warn: true,
        debug: false,
        log: false,
        info: false
    },
    debug: {
        error: true,
        warn: true,
        debug: true,
        log: false,
        info: false
    },
    log: {
        error: true,
        warn: true,
        debug: true,
        log: true,
        info: false
    },
    info: {
        error: true,
        warn: true,
        debug: true,
        log: true,
        info: true
    }
};

/**
 * Get current date YYYY-MM-DD hh:mm:ss
 *
 * @return {string}
 */
function getCurrentDate() {
    return new Date().toISOString().
        replace(/T/, ' ').      // replace T with a space
        replace(/\..+/, '')
}

/**
 * AjjLogger class
 *
 * @param {string} level Log level
 *
 * @return {AjjLogger}
 */
function AjjLogger(config) {
    const self = this;

    self.config = {
        app: 'myApp',
        level: levels.info
    };

    if(config) {
        if (config.app) {
            self.config.app = config.app;
        }

        if (config.level && levels[config.level]) {
            self.config.level = levels[config.level];
        }
    }

    self.error = (...args) => {
        self.invoke('error', args, libCaller.getDetailedString());
    }

    self.warn = (...args) => {
        self.invoke('warn', args);
    }

    self.debug = (...args) => {
        self.invoke('debug', args);
    }

    self.log = (...args) => {
        self.invoke('log', args);
    }

    self.info = (...args) => {
        self.invoke('info', args);
    }

    self.invoke = (method, args, infos) => {
        if(self.config.level[method] === true) {
            if (infos) {
                console[method](
                    getCurrentDate() + ' - ' + self.config.app,
                    '- ' + method.toUpperCase() + ':',
                    args.toString(),
                    '- ' + infos
                );
            } else {
                console[method](
                    getCurrentDate() + ' - ' + self.config.app,
                    '- ' + method.toUpperCase() + ' :',
                    args.toString()
                );
            }
        }
    }

    return self;
}

module.exports = AjjLogger;