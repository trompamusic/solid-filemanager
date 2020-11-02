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
var react_1 = require("react");
var react_redux_1 = require("react-redux");
var styles_1 = require("@material-ui/core/styles");
var KeyboardArrowLeft_1 = require("@material-ui/icons/KeyboardArrowLeft");
var Button_1 = require("@material-ui/core/Button");
require("./BreadcrumbText.css");
var styles = function (theme) {
    var _a, _b;
    return styles_1.createStyles({
        lastPath: (_a = {
                display: 'block'
            },
            _a[theme.breakpoints.up('sm')] = {
                display: 'none'
            },
            _a),
        paths: (_b = {
                display: 'none'
            },
            _b[theme.breakpoints.up('sm')] = {
                display: 'block',
            },
            _b)
    });
};
var BreadcrumbText = /** @class */ (function (_super) {
    __extends(BreadcrumbText, _super);
    function BreadcrumbText() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BreadcrumbText.prototype.render = function () {
        var _a = this.props, classes = _a.classes, handleClickPath = _a.handleClickPath, path = _a.path, rootTitle = _a.rootTitle, handleGoBack = _a.handleGoBack, canGoBack = _a.canGoBack;
        var separator = react_1.default.createElement("span", null, ">");
        var rootPath = react_1.default.createElement("span", { onClick: function () { return handleClickPath(-1); }, "data-index": 0 },
            rootTitle,
            " ",
            path.length ? separator : '');
        var lastPath = __spreadArrays(path).pop() || rootTitle;
        var directories = path.map(function (dir, index) {
            return react_1.default.createElement("span", { key: index, "data-index": index, onClick: function (e) { return handleClickPath(index); } },
                react_1.default.createElement("span", null, dir),
                " ",
                path.length - 1 !== index ? separator : '',
                "\u00A0");
        });
        return (react_1.default.createElement("div", { className: "BreadcrumbText" },
            react_1.default.createElement("div", { className: classes.lastPath },
                react_1.default.createElement(Button_1.default, { onClick: handleGoBack, color: "inherit", type: "button", style: { display: canGoBack ? 'inline-flex' : 'none' } },
                    react_1.default.createElement(KeyboardArrowLeft_1.default, null)),
                lastPath),
            react_1.default.createElement("div", { className: classes.paths },
                rootPath,
                " ",
                directories)));
    };
    return BreadcrumbText;
}(react_1.Component));
var mapDispatchToProps = function () { return ({}); };
var mapStateToProps = function () { return ({}); };
exports.default = styles_1.withStyles(styles)(react_redux_1.connect(mapStateToProps, mapDispatchToProps)(BreadcrumbText));
