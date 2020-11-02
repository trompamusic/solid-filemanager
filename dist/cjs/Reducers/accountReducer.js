"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.account = void 0;
var actionTypes_1 = require("../Actions/actionTypes");
var config_1 = require("../config");
var initialState = {
    loggedIn: false,
    host: null,
    webId: null
};
exports.account = function (state, action) {
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case actionTypes_1.SET_LOGGED_IN:
            return __assign(__assign({}, state), { loggedIn: true });
        case actionTypes_1.SET_LOGGED_OUT:
            return __assign(__assign({}, state), { loggedIn: false });
        case actionTypes_1.SET_HOST:
            config_1.default.setHost(action.value); // TODO
            return __assign(__assign({}, state), { host: action.value });
        case actionTypes_1.RESET_HOST:
            return __assign(__assign({}, state), { host: null });
        case actionTypes_1.SET_WEB_ID:
            return __assign(__assign({}, state), { webId: action.value });
        case actionTypes_1.RESET_WEB_ID:
            return __assign(__assign({}, state), { webId: null });
        default:
            return state;
    }
};
