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
var Menu_1 = require("@material-ui/core/Menu");
var IconButton_1 = require("@material-ui/core/IconButton");
var MoreVert_1 = require("@material-ui/icons/MoreVert");
var react_redux_1 = require("react-redux");
var CreateFolderAction_1 = require("../ContextMenu/ContextMenuActions/CreateFolderAction");
var CreateFileAction_1 = require("../ContextMenu/ContextMenuActions/CreateFileAction");
var UploadFileAction_1 = require("../ContextMenu/ContextMenuActions/UploadFileAction");
var ChooseLocationAction_1 = require("../ContextMenu/ContextMenuActions/ChooseLocationAction");
var ThreeDotsMenu = /** @class */ (function (_super) {
    __extends(ThreeDotsMenu, _super);
    function ThreeDotsMenu() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            anchorEl: null,
        };
        _this.handleClick = function (event) {
            _this.setState({ anchorEl: event.currentTarget });
        };
        _this.handleClose = function () {
            _this.setState({ anchorEl: null });
        };
        return _this;
    }
    ThreeDotsMenu.prototype.render = function () {
        var anchorEl = this.state.anchorEl;
        return (react_1.default.createElement("div", { style: { marginLeft: '1em' } },
            react_1.default.createElement(IconButton_1.default, { color: "inherit", "aria-label": "More", "aria-owns": Boolean(anchorEl) ? 'long-menu' : undefined, "aria-haspopup": "true", onClick: this.handleClick },
                react_1.default.createElement(MoreVert_1.default, null)),
            react_1.default.createElement(Menu_1.default, { anchorEl: anchorEl, open: Boolean(anchorEl), onClose: this.handleClose },
                react_1.default.createElement(CreateFolderAction_1.default, { handleClose: this.handleClose }),
                react_1.default.createElement(CreateFileAction_1.default, { handleClose: this.handleClose }),
                react_1.default.createElement(UploadFileAction_1.default, { handleClose: this.handleClose }),
                react_1.default.createElement(ChooseLocationAction_1.default, { handleClose: this.handleClose }))));
    };
    return ThreeDotsMenu;
}(react_1.default.Component));
var mapStateToProps = function () { return ({}); };
var mapDispatchToProps = function () { return ({}); };
exports.default = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(ThreeDotsMenu);
