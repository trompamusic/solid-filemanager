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
var LinearProgress_1 = require("@material-ui/core/LinearProgress");
var react_redux_1 = require("react-redux");
var Actions_1 = require("../../../Actions/Actions");
var FileUploader_1 = require("../../FileUploader/FileUploader");
var FormDialog = /** @class */ (function (_super) {
    __extends(FormDialog, _super);
    function FormDialog() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FormDialog.prototype.render = function () {
        var _a = this.props, handleClose = _a.handleClose, handleReset = _a.handleReset, handleSubmit = _a.handleSubmit, open = _a.open, canUpload = _a.canUpload, progress = _a.progress, fileList = _a.fileList, handleSelectedFiles = _a.handleSelectedFiles;
        return (react_1.default.createElement(Dialog_1.default, { open: open, onClose: handleClose, "aria-labelledby": "form-dialog-upload", fullWidth: true, maxWidth: 'sm' },
            react_1.default.createElement("form", null,
                react_1.default.createElement(DialogTitle_1.default, { id: "form-dialog-upload" }, "Upload files"),
                react_1.default.createElement(DialogContent_1.default, null,
                    react_1.default.createElement(FileUploader_1.default, { fileList: fileList, handleSelectedFiles: handleSelectedFiles, handleReset: handleReset }),
                    canUpload ? react_1.default.createElement(LinearProgress_1.default, { variant: "determinate", value: progress }) : null),
                react_1.default.createElement(DialogActions_1.default, null,
                    react_1.default.createElement(Button_1.default, { onClick: handleClose, color: "primary", type: "button" }, "Cancel"),
                    react_1.default.createElement(Button_1.default, { color: "primary", onClick: handleSubmit, disabled: !canUpload, type: "submit" }, "Upload")))));
    };
    return FormDialog;
}(react_1.Component));
var mapStateToProps = function (state) {
    return {
        open: state.visibleDialogs.UPLOAD_FILE,
        canUpload: state.upload.fileList ? state.upload.fileList.length > 0 : false,
        fileList: state.upload.fileList,
        progress: state.upload.progress,
    };
};
var mapDispatchToProps = function (dispatch) {
    return {
        handleClose: function (event) {
            dispatch(Actions_1.resetFileUploader());
        },
        handleSubmit: function (event) {
            event.preventDefault();
            dispatch(Actions_1.uploadFiles());
        },
        handleSelectedFiles: function (event) {
            var files = event.target.files;
            dispatch(Actions_1.setFileUploadList(files));
        },
        handleReset: function () {
            dispatch(Actions_1.resetFileUploadList());
        }
    };
};
exports.default = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(FormDialog);
