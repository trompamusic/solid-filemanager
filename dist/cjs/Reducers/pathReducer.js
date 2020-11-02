"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.path = void 0;
var actionTypes_1 = require("../Actions/actionTypes");
var initialPath = [];
exports.path = function (state, action) {
    if (state === void 0) { state = initialPath; }
    switch (action.type) {
        case actionTypes_1.ENTER_FOLDER:
            return __spreadArrays(state, [action.value]);
        case actionTypes_1.MOVE_FOLDER_UPWARDS:
            return action.value > 0 ?
                state.slice(0, -action.value)
                : state;
        case actionTypes_1.SET_PATH:
            return __spreadArrays(action.value);
        default:
            return state;
    }
};
