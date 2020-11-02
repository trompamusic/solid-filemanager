"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var ListItem_1 = require("@material-ui/core/ListItem");
var ListItemAvatar_1 = require("@material-ui/core/ListItemAvatar");
var ListItemText_1 = require("@material-ui/core/ListItemText");
var Avatar_1 = require("@material-ui/core/Avatar");
var Folder_1 = require("@material-ui/icons/Folder");
var InsertDriveFile_1 = require("@material-ui/icons/InsertDriveFile");
var blue_1 = require("@material-ui/core/colors/blue");
require("../File.css");
var Item_1 = require("../../../Api/Item");
// TODO: Check main differences between normal File.tsx component
function FileSublist(props) {
    var item = props.item, isSelected = props.isSelected, handleClick = props.handleClick, handleDoubleClick = props.handleDoubleClick;
    var avatarStyle = {
        backgroundColor: isSelected ? blue_1.default['A200'] : undefined
    };
    return (react_1.default.createElement("div", { className: "File", onClick: handleClick, "data-selected": isSelected, onDoubleClick: handleDoubleClick },
        react_1.default.createElement(ListItem_1.default, null,
            react_1.default.createElement(ListItemAvatar_1.default, null,
                react_1.default.createElement(Avatar_1.default, { style: avatarStyle }, (item instanceof Item_1.FileItem) ? react_1.default.createElement(InsertDriveFile_1.default, null) : react_1.default.createElement(Folder_1.default, null))),
            react_1.default.createElement(ListItemText_1.default, { primary: item.name, secondary: "" }))));
}
exports.default = FileSublist;
