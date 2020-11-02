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
require("./ContextMenu.css");
var Menu_1 = require("@material-ui/core/Menu");
var OpenAction_1 = require("./ContextMenuActions/OpenAction");
var RemoveAction_1 = require("./ContextMenuActions/RemoveAction");
var MoveAction_1 = require("./ContextMenuActions/MoveAction");
var CopyAction_1 = require("./ContextMenuActions/CopyAction");
var EditAction_1 = require("./ContextMenuActions/EditAction");
var RenameAction_1 = require("./ContextMenuActions/RenameAction");
var ZipAction_1 = require("./ContextMenuActions/ZipAction");
var ExtractAction_1 = require("./ContextMenuActions/ExtractAction");
var DownloadAction_1 = require("./ContextMenuActions/DownloadAction");
var OpenInNewTabAction_1 = require("./ContextMenuActions/OpenInNewTabAction");
var Item_1 = require("../../Api/Item");
var ContextMenu = /** @class */ (function (_super) {
    __extends(ContextMenu, _super);
    function ContextMenu() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ContextMenu.prototype.render = function () {
        var _a = this.props, acts = _a.acts, open = _a.open, x = _a.x, y = _a.y;
        return (react_1.default.createElement("div", null,
            react_1.default.createElement(Menu_1.default, { anchorReference: "anchorPosition", anchorPosition: { top: y, left: x }, transformOrigin: {
                    vertical: 'top',
                    horizontal: 'left',
                }, open: open, onClose: function () { }, PaperProps: { style: { width: 190 } } },
                acts.includes('open') && react_1.default.createElement(OpenAction_1.default, null),
                acts.includes('openInNewTab') && react_1.default.createElement(OpenInNewTabAction_1.default, null),
                acts.includes('download') && react_1.default.createElement(DownloadAction_1.default, null),
                acts.includes('compress') && react_1.default.createElement(ZipAction_1.default, null),
                acts.includes('extract') && react_1.default.createElement(ExtractAction_1.default, null),
                acts.includes('edit') && react_1.default.createElement(EditAction_1.default, null),
                acts.includes('copy') && react_1.default.createElement(CopyAction_1.default, null),
                acts.includes('move') && react_1.default.createElement(MoveAction_1.default, null),
                acts.includes('rename') && react_1.default.createElement(RenameAction_1.default, null),
                acts.includes('remove') && react_1.default.createElement(RemoveAction_1.default, null))));
    };
    return ContextMenu;
}(react_1.Component));
var mapStateToProps = function (state) {
    return {
        x: state.contextMenu.x,
        y: state.contextMenu.y,
        open: state.contextMenu.open,
        acts: getActionsForMultipleItems(state.items.selected),
    };
};
var mapDispatchToProps = function () { return ({}); };
/**
 * Get available actions for multiple items
 */
var getActionsForMultipleItems = function (items) {
    return items.length === 1 ?
        getActionsForItem(items[0])
        : [
            'copy',
            'move',
            'remove',
            'download',
            'compress',
        ];
};
/**
 * Get available actions for an item
 */
var getActionsForItem = function (item) {
    var commonActions = [
        'openInNewTab',
        'copy',
        'move',
        'rename',
        'remove',
        'download',
    ];
    return __spreadArrays(commonActions, ((item instanceof Item_1.FileItem) ?
        getActionsForFile(item)
        : getActionsForFolder(item)));
};
/**
 * Get available file specific actions
 */
var getActionsForFile = function (file) {
    var actions = [];
    file.isEditable() && actions.push('edit');
    file.isExtractable() && actions.push('extract');
    (file.isImage() || file.isMedia()) && actions.push('open');
    return actions;
};
/**
 * Get available folder specific actions
 */
var getActionsForFolder = function (folder) {
    return [
        'open',
        'compress'
    ];
};
exports.default = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(ContextMenu);
