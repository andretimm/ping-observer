const ping = require('ping');
const util = require('util');
const event = require('events').EventEmitter;

class PingObserver {
    constructor(options) {
        this.host = options.host;
        this.interval = options.interval || 5000;
        this.timeout = options.timeout || 3000;
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
    let res = await ping.promise.probe(host, {
        timeout: self.timeout,
    });
    if (res.alive) {
        self.emit('available', message(host, res.alive, res.time));
    } else {
        self.emit('unavailable', message(host, res.alive, res.time));
    }
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