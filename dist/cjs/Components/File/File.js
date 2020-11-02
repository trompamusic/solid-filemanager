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
var Actions_1 = require("../../Actions/Actions");
require("./File.css");
var ListItem_1 = require("@material-ui/core/ListItem");
var ListItemAvatar_1 = require("@material-ui/core/ListItemAvatar");
var ListItemText_1 = require("@material-ui/core/ListItemText");
var Avatar_1 = require("@material-ui/core/Avatar");
var Folder_1 = require("@material-ui/icons/Folder");
var InsertDriveFile_1 = require("@material-ui/icons/InsertDriveFile");
var blue_1 = require("@material-ui/core/colors/blue");
var Item_1 = require("../../Api/Item");
var File = /** @class */ (function (_super) {
    __extends(File, _super);
    function File() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    File.prototype.render = function () {
        var _a = this.props, isSelected = _a.isSelected, item = _a.item, handleClick = _a.handleClick, handleDoubleClick = _a.handleDoubleClick, handleContextMenu = _a.handleContextMenu;
        var avatarStyle = {
            backgroundColor: isSelected ? blue_1.default['A200'] : undefined
        };
        var realSize = (item instanceof Item_1.FileItem) ? item.getDisplaySize() : null;
        return (react_1.default.createElement("div", { className: "File", onClick: handleClick, onDoubleClick: handleDoubleClick, onContextMenu: handleContextMenu, "data-selected": isSelected },
            react_1.default.createElement(ListItem_1.default, null,
                react_1.default.createElement(ListItemAvatar_1.default, null,
                    react_1.default.createElement(Avatar_1.default, { style: avatarStyle }, (item instanceof Item_1.FileItem) ? react_1.default.createElement(InsertDriveFile_1.default, null) : react_1.default.createElement(Folder_1.default, null))),
                react_1.default.createElement(ListItemText_1.default, { className: "filename", primary: item.getDisplayName(), secondary: realSize }))));
    };
    return File;
}(react_1.Component));
var mapStateToProps = function (state, ownProps) {
    return {
        isSelected: state.items.selected.includes(ownProps.item)
    };
};
var mapDispatchToProps = function (dispatch, ownProps) {
    return {
        handleDoubleClick: function () {
            var item = ownProps.item;
            if (item instanceof Item_1.FileItem) {
                if (item.isEditable())
                    dispatch(Actions_1.loadAndEditFile(item.name));
                else if (item.isImage())
                    dispatch(Actions_1.loadAndDisplayFile(item.name));
                else if (item.isMedia())
                    dispatch(Actions_1.displaySelectedMediaFile());
            }
            else
                dispatch(Actions_1.enterFolderByItem(item));
        },
        handleContextMenu: function (event) {
            event.preventDefault();
            event.stopPropagation();
            var x = 0;
            var y = 0;
            if (event.nativeEvent instanceof MouseEvent) {
                x = event.nativeEvent.clientX;
                y = event.nativeEvent.clientY;
            }
            else if (event.nativeEvent instanceof TouchEvent) {
                x = event.nativeEvent.touches[0].pageX;
                y = event.nativeEvent.touches[0].pageY;
            }
            else {
                console.warn("Unknown click event", event);
            }
            if (event.shiftKey) {
                dispatch(Actions_1.setSelectedItemsFromLastTo(ownProps.item));
            }
            else {
                dispatch(Actions_1.rightClickOnFile(ownProps.item));
            }
            dispatch(Actions_1.openContextMenu({ x: x, y: y }));
        },
        handleClick: function (event) {
            event.stopPropagation();
            if (event.ctrlKey) {
                dispatch(Actions_1.toggleSelectedItem(ownProps.item));
            }
            else if (event.shiftKey) {
                dispatch(Actions_1.setSelectedItemsFromLastTo(ownProps.item));
            }
            else {
                dispatch(Actions_1.selectItems([ownProps.item]));
            }
        }
    };
};
exports.default = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(File);
