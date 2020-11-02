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
var actionTypes_1 = require("../../../Actions/actionTypes");
var FormDialog = /** @class */ (function (_super) {
    __extends(FormDialog, _super);
    function FormDialog() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            lastBlobUrl: null,
            content: '...',
            loading: false
        };
        return _this;
    }
    FormDialog.prototype.componentDidUpdate = function () {
        if (this.props.blobUrl !== this.state.lastBlobUrl) {
            this.setState({
                lastBlobUrl: this.props.blobUrl
            });
            this.setState({
                loading: true
            });
        }
    };
    FormDialog.prototype.render = function () {
        var _a = this.props, handleClose = _a.handleClose, open = _a.open;
        return (react_1.default.createElement("div", { style: { marginLeft: '1em' } },
            react_1.default.createElement(Dialog_1.default, { open: open, onClose: handleClose, "aria-labelledby": "form-dialog-content", fullWidth: true, maxWidth: 'sm' },
                react_1.default.createElement(DialogTitle_1.default, { id: "form-dialog-content" }, "Viewing file "),
                react_1.default.createElement(DialogContent_1.default, null,
                    react_1.default.createElement("img", { src: this.props.blobUrl, alt: "", style: { maxWidth: '100%' } })),
                react_1.default.createElement(DialogActions_1.default, null,
                    react_1.default.createElement(Button_1.default, { onClick: handleClose, color: "primary", type: "button" }, "Close")))));
    };
    return FormDialog;
}(react_1.Component));
var mapStateToProps = function (state) {
    return {
        open: state.visibleDialogs.CONTENT,
        blobUrl: state.blob || undefined
    };
};
var mapDispatchToProps = function (dispatch) {
    return {
        handleClose: function () {
            dispatch(Actions_1.closeDialog(actionTypes_1.DIALOGS.CONTENT));
        }
    };
};
exports.default = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(FormDialog);
