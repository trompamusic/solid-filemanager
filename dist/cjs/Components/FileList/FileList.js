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
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var react_redux_1 = require("react-redux");
var Typography_1 = require("@material-ui/core/Typography");
var List_1 = require("@material-ui/core/List");
var File_1 = require("../File/File");
var FileListEmptyMessage_1 = require("./FileListEmptyMessage");
var Loader_1 = require("../Loader/Loader");
require("./FileList.css");
var FileList = /** @class */ (function (_super) {
    __extends(FileList, _super);
    function FileList() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FileList.prototype.render = function () {
        var _a = this.props, items = _a.items, isLoading = _a.isLoading;
        return react_1.default.createElement("div", { className: "FileList" },
            isLoading && react_1.default.createElement(Loader_1.default, null),
            !items.length && react_1.default.createElement(FileListEmptyMessage_1.default, null),
            items.length && (react_1.default.createElement("div", null,
                react_1.default.createElement(Typography_1.default, { variant: "h6" }, "Avatar with text"),
                react_1.default.createElement("div", null,
                    react_1.default.createElement(List_1.default, { dense: true }, items.map(function (item, key) {
                        return react_1.default.createElement(File_1.default, { item: item, key: key });
                    }))))));
    };
    return FileList;
}(react_1.Component));
;
var mapStateToProps = function (state) {
    var items = state.items.inCurFolder
        .filter(function (item) { return filterMatch(item.getDisplayName(), state.items.filter); });
    return {
        items: items,
        isLoading: state.loading,
    };
};
var mapDispatchToProps = function () { return ({}); };
var filterMatch = function (first, second) {
    return first.toLocaleLowerCase().match(second.toLocaleLowerCase());
};
exports.default = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(FileList);
