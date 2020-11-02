"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blob = void 0;
var actionTypes_1 = require("../Actions/actionTypes");
exports.blob = function (state, action) {
    if (state === void 0) { state = null; }
    switch (action.type) {
        case actionTypes_1.SET_LOADED_BLOB:
            return URL.createObjectURL(action.value);
        case actionTypes_1.RESET_LOADED_BLOB:
            if (state !== null)
                URL.revokeObjectURL(state);
            return null;
        default:
            return state;
    }
};
