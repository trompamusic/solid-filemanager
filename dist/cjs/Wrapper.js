"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var redux_thunk_1 = require("redux-thunk");
var react_redux_1 = require("react-redux");
var redux_1 = require("redux");
var reducer_1 = require("./Reducers/reducer");
var App_1 = require("./App");
// import './index.css';
var store = redux_1.createStore(reducer_1.default, redux_1.applyMiddleware(redux_thunk_1.default));
function Wrapper() {
    return (react_1.default.createElement(react_redux_1.Provider, { store: store },
        react_1.default.createElement(App_1.default, null)));
}
exports.default = Wrapper;
