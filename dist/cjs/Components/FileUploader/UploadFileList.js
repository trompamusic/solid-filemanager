"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var List_1 = require("@material-ui/core/List");
var ListItem_1 = require("@material-ui/core/ListItem");
var ListItemIcon_1 = require("@material-ui/core/ListItemIcon");
var ListItemText_1 = require("@material-ui/core/ListItemText");
var InsertDriveFile_1 = require("@material-ui/icons/InsertDriveFile");
var Item_1 = require("../../Api/Item");
function UploadFileList(props) {
    var files = props.files;
    files[0];
    var list = Array.from(files).map(function (f, i) {
        return react_1.default.createElement(ListItem_1.default, { dense: true, key: i },
            react_1.default.createElement(ListItemIcon_1.default, null,
                react_1.default.createElement(InsertDriveFile_1.default, null)),
            react_1.default.createElement(ListItemText_1.default, { primary: f.name + " (" + Item_1.getHumanFileSize(f.size) + ")" }));
    });
    return (react_1.default.createElement("div", null,
        react_1.default.createElement(List_1.default, { component: "nav" }, list)));
}
exports.default = UploadFileList;
