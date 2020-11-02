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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.items = void 0;
var actionTypes_1 = require("../Actions/actionTypes");
var initialItemsState = {
    inCurFolder: [],
    filter: '',
    selected: [],
};
exports.items = function (state, action) {
    if (state === void 0) { state = initialItemsState; }
    switch (action.type) {
        case actionTypes_1.SET_ITEMS:
            return __assign(__assign({}, state), { inCurFolder: action.value });
        case actionTypes_1.SELECT_ITEMS:
            return __assign(__assign({}, state), { selected: action.value });
        case actionTypes_1.DESELECT_ITEM:
            return __assign(__assign({}, state), { selected: removeItem(state.selected, action.value) });
        case actionTypes_1.TOGGLE_SELECTED_ITEM:
            return __assign(__assign({}, state), { selected: state.selected.includes(action.value) ?
                    removeItem(state.selected, action.value)
                    : addItem(state.selected, action.value) });
        case actionTypes_1.FILTER_ITEMS:
            return __assign(__assign({}, state), { filter: action.value });
        case actionTypes_1.RESET_FILTER:
            return __assign(__assign({}, state), { filter: '' });
        default:
            return state;
    }
};
var removeItem = function (items, item) {
    return items.filter(function (selectedItem) { return !selectedItem.equals(item); });
};
var addItem = function (items, item) {
    return __spreadArrays(items, [item]);
};
