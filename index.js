const ping = require('ping');
const util = require('util');
const event = require('events').EventEmitter;

class PingObserver {
    constructor(options) {
        this.host = options.host;
        this.interval = options.interval || 5000;
        this.timeout = options.timeout || 3000;
        this.arguments = options.arguments || [];
        this.handle = null;
    }
    start() {
        var self = this;
        var timer = function () {
            pingUrl.call(self, self.host);
            self.handle = setTimeout(timer, self.interval);
        };
        timer();
    }
    stop() {
        clearTimeout(this.handle);
        this.handle = null;
    }
}

async function pingUrl(host) {
    let self = this;
    let config = getConfig(self);

    console.log(config);

    let res = await ping.promise.probe(host, config);
    if (res.alive) {
        self.emit('available', message(host, res.alive, res.time));
    } else {
        self.emit('unavailable', message(host, res.alive, res.time));
    }
}

function getConfig(self) {
    let config = {
        timeout: self.timeout,
    };

    if (self.arguments.length > 0) {
        config.extra = self.arguments;
    }

    return config;
}

util.inherits(PingObserver, event);

function message(host, alive, time) {
    var res = null;
    if (!isNaN(time)) {
        res = {
            alive: alive,
            host: host,
            time: time
        }
    } else {
        res = {
            alive: alive,
            url: host,
            time: "Unknown"
        }
    }
    return res;
}

module.exports = PingObserver;