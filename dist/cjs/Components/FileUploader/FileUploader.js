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
var UploadFileList_1 = require("./UploadFileList");
var FileUploader = /** @class */ (function (_super) {
    __extends(FileUploader, _super);
    function FileUploader() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.inputRef = react_1.createRef();
        return _this;
    }
    FileUploader.prototype.handleReset = function (event) {
        var inputElement = this.inputRef.current;
        if (inputElement) {
            inputElement.value = '';
            this.props.handleReset(event);
        }
    };
    FileUploader.prototype.render = function () {
        var _a = this.props, fileList = _a.fileList, handleSelectedFiles = _a.handleSelectedFiles;
        var styles = {
            inputfile: {
            // TODO: Change this to display none as soon, as the label button works
            // display: 'none'
            }, inputreset: {
                display: (fileList && fileList.length) ? 'inline-flex' : 'none'
            }
        };
        return (react_1.default.createElement("div", null,
            react_1.default.createElement("label", { htmlFor: "button-file" },
                react_1.default.createElement("input", { style: styles.inputfile, id: "button-file", ref: this.inputRef, multiple: true, type: "file", onChange: handleSelectedFiles })),
            react_1.default.createElement(Button_1.default, { style: styles.inputreset, component: "span", type: "reset", onClick: this.handleReset.bind(this) }, "Clear"),
            fileList && react_1.default.createElement(UploadFileList_1.default, { files: fileList })));
    };
    return FileUploader;
}(react_1.Component));
exports.default = FileUploader;
