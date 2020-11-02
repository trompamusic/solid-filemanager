"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorMessage = void 0;
var actionTypes_1 = require("../Actions/actionTypes");
exports.errorMessage = function (state, action) {
    if (state === void 0) { state = ''; }
    switch (action.type) {
        case actionTypes_1.SET_ERROR_MESSAGE:
            return action.value;
        default:
            return state;
    }
};
