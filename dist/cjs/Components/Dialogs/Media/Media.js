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
var Button_1 = require("@material-ui/core/Button");
var Dialog_1 = require("@material-ui/core/Dialog");
var DialogActions_1 = require("@material-ui/core/DialogActions");
var DialogContent_1 = require("@material-ui/core/DialogContent");
var DialogTitle_1 = require("@material-ui/core/DialogTitle");
var react_redux_1 = require("react-redux");
var Actions_1 = require("../../../Actions/Actions");
var react_plyr_1 = require("react-plyr");
require("plyr/dist/plyr.css");
var Item_1 = require("../../../Api/Item");
var actionTypes_1 = require("../../../Actions/actionTypes");
var FormDialog = /** @class */ (function (_super) {
    __extends(FormDialog, _super);
    function FormDialog() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FormDialog.prototype.render = function () {
        var _a = this.props, file = _a.file, handleClose = _a.handleClose, open = _a.open;
        var fileName = file ? file.name : undefined;
        var url = file ? file.url : undefined;
        var provider = file ? (file.isVideo() ? 'html5' : 'audio') : '';
        var type = file ? (file.isVideo() ? 'video' : 'audio') : undefined;
        return (react_1.default.createElement(Dialog_1.default, { open: open, onClose: handleClose, "aria-labelledby": "form-dialog-display-media", fullWidth: true, maxWidth: 'lg' },
            react_1.default.createElement(DialogTitle_1.default, { id: "form-dialog-display-media" }, "Display Media"),
            react_1.default.createElement(DialogContent_1.default, null, file ?
                (react_1.default.createElement("div", null,
                    react_1.default.createElement("p", null,
                        "Playing ",
                        file.name),
                    react_1.default.createElement(react_plyr_1.default, { type: type, url: url, iconUrl: "./vendor/plyr/plyr.svg" })))
                : react_1.default.createElement("p", null, "No media file opened")),
            react_1.default.createElement(DialogActions_1.default, null,
                react_1.default.createElement(Button_1.default, { onClick: handleClose, color: "primary", type: "button" }, "Close"))));
    };
    return FormDialog;
}(react_1.Component));
var mapStateToProps = function (state) {
    var open = state.visibleDialogs.MEDIA;
    var file = state.items.selected[0];
    if (file instanceof Item_1.FileItem) {
        return {
            open: open,
            file: file,
        };
    }
    return { open: open };
};
var mapDispatchToProps = function (dispatch) {
    return {
        handleClose: function () {
            dispatch(Actions_1.closeDialog(actionTypes_1.DIALOGS.MEDIA));
        }
    };
};
exports.default = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(FormDialog);
