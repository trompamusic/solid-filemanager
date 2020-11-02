"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loading = void 0;
var actionTypes_1 = require("../Actions/actionTypes");
var initialLoadingState = false;
exports.loading = function (state, action) {
    if (state === void 0) { state = initialLoadingState; }
    switch (action.type) {
        case actionTypes_1.DISPLAY_LOADING:
            return true;
        case actionTypes_1.STOP_LOADING:
            return false;
        default:
            return state;
    }
};
