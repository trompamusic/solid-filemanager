"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var FileSublist_1 = require("../../File/FileSublist/FileSublist");
var Loader_1 = require("../../Loader/Loader");
var FileListEmptyMessage_1 = require("../FileListEmptyMessage");
require("./FileListSublist.css");
function FileListSublist(props) {
    var items = props.items, isLoading = props.isLoading, handleOpenFolder = props.handleOpenFolder;
    var itemComponents = items.map(function (item, key) {
        return react_1.default.createElement(FileSublist_1.default, { item: item, isSelected: false, handleClick: function () { return handleOpenFolder(item); }, handleDoubleClick: function () { return handleOpenFolder(item); }, key: key });
    });
    return react_1.default.createElement("div", { className: "FileListSublist" }, isLoading ?
        react_1.default.createElement(Loader_1.default, null) :
        itemComponents.length ? itemComponents : react_1.default.createElement(FileListEmptyMessage_1.default, null));
}
exports.default = FileListSublist;
