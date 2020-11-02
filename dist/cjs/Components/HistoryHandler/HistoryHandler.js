"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLocationObjectFromUrl = void 0;
var react_1 = require("react");
var react_redux_1 = require("react-redux");
var history_1 = require("history");
var Actions_1 = require("../../Actions/Actions");
var HistoryHandler = /** @class */ (function (_super) {
    __extends(HistoryHandler, _super);
    function HistoryHandler(props) {
        var _this = _super.call(this, props) || this;
        _this.states = [];
        _this.stateIndex = -1;
        _this.history = history_1.createBrowserHistory();
        _this.history.listen(function (location, action) {
            switch (action) {
                case 'POP':
                    _this.handlePop(location);
                    break;
                case 'REPLACE':
                    _this.handleReplace(location);
                    break;
                case 'PUSH':
                    _this.handlePush(location);
                    break;
            }
        });
        return _this;
    }
    HistoryHandler.prototype.componentDidUpdate = function () {
        var _a = this.props, host = _a.host, path = _a.path;
        // Don't update history when the host is invalid
        if (host === null)
            return;
        if (this.states.length === 0 || this.stateIndex < 0)
            return this.updateBrowserHistory();
        var prevState = this.states[this.stateIndex];
        if (!locationsEqual({ host: host, path: path }, prevState))
            this.updateBrowserHistory();
    };
    HistoryHandler.prototype.updateBrowserHistory = function () {
        var _a = this.props, host = _a.host, path = _a.path;
        var url = encodeURI(host + "/" + path.join('/'));
        var newState = {
            host: host || '',
            path: path,
            index: this.stateIndex + 1,
        };
        this.history.push("?url=" + url, newState);
    };
    HistoryHandler.prototype.handlePop = function (location) {
        this.stateIndex = location.state.index;
        this.props.handlePop(location);
    };
    HistoryHandler.prototype.handleReplace = function (location) {
        this.states[this.stateIndex] = location.state;
    };
    HistoryHandler.prototype.handlePush = function (location) {
        this.states = __spreadArrays(this.states.slice(0, ++this.stateIndex), [location.state]);
    };
    HistoryHandler.prototype.render = function () {
        // This Component doesn't provide anything to the DOM
        // The only reason it is a component is to get access to the state and dispatch
        return react_1.default.createElement(react_1.default.Fragment, null);
    };
    return HistoryHandler;
}(react_1.Component));
var mapStateToProps = function (state) { return ({
    host: state.account.host,
    path: state.path
}); };
var mapDispatchToProps = function (dispatch) {
    return {
        handlePop: function (location) {
            var _a, _b;
            var host = '';
            var path = [];
            if (location && typeof location.state !== typeof undefined) {
                (_a = location.state, host = _a.host, path = _a.path);
            }
            else {
                var params = new URLSearchParams(location.search.substr(1));
                var url = params.get('url');
                if (url !== null) {
                    (_b = exports.getLocationObjectFromUrl(url), host = _b.host, path = _b.path);
                }
            }
            dispatch(Actions_1.setHost(host));
            dispatch(Actions_1.enterFolder(path));
        }
    };
};
exports.getLocationObjectFromUrl = function (urlString) {
    var url = new URL(urlString);
    var host = url.origin;
    var path = url.pathname.split('/').filter(function (val) { return val !== ''; });
    return {
        host: host,
        path: path
    };
};
var locationsEqual = function (first, second) {
    return first.host === second.host
        && first.path.length === second.path.length
        && first.path.every(function (val, index) { return val === second.path[index]; });
};
exports.default = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(HistoryHandler);
