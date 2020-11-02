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
exports.upload = void 0;
var actionTypes_1 = require("../Actions/actionTypes");
var initialUploadState = {
    fileList: null,
    progress: 0,
};
exports.upload = function (state, action) {
    if (state === void 0) { state = initialUploadState; }
    switch (action.type) {
        case actionTypes_1.SET_UPLOAD_FILE_LIST:
            return __assign(__assign({}, state), { fileList: action.value });
        case actionTypes_1.SET_UPLOAD_FILE_PROGRESS:
            return __assign(__assign({}, state), { progress: action.value });
        default:
            return state;
    }
};
