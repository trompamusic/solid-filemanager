"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var host = null;
exports.default = {
    getHost: function () {
        return host;
    },
    setHost: function (newHost) {
        host = newHost;
        while (host.endsWith('/'))
            host = host.slice(0, -1);
    }
};
