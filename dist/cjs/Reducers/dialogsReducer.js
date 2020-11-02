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
exports.contextMenu = exports.visibleDialogs = void 0;
var actionTypes_1 = require("../Actions/actionTypes");
// Initialize state with values of DIALOGS as keys and false (closed) as value
var initialVisibleDialogs = Object.values(actionTypes_1.DIALOGS)
    .map(function (name) {
    var _a;
    return (_a = {}, _a[name] = false, _a);
})
    .reduce(function (prev, cur) { return (__assign(__assign({}, prev), cur)); });
exports.visibleDialogs = function (state, action) {
    var _a, _b;
    if (state === void 0) { state = initialVisibleDialogs; }
    switch (action.type) {
        case actionTypes_1.OPEN_DIALOG:
            return __assign(__assign({}, state), (_a = {}, _a[action.value] = true, _a));
        case actionTypes_1.CLOSE_DIALOG:
            return __assign(__assign({}, state), (_b = {}, _b[action.value] = false, _b));
        default:
            return state;
    }
};
var initialContextMenuState = {
    open: false,
    x: 0,
    y: 0,
};
exports.contextMenu = function (state, action) {
    if (state === void 0) { state = initialContextMenuState; }
    switch (action.type) {
        case actionTypes_1.OPEN_CONTEXT_MENU:
            return __assign(__assign({}, state), { open: true, x: action.value.x, y: action.value.y });
        case actionTypes_1.CLOSE_CONTEXT_MENU:
            return __assign(__assign({}, state), { open: false });
        default:
            return state;
    }
};
