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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var Button_1 = require("@material-ui/core/Button");
var Dialog_1 = require("@material-ui/core/Dialog");
var DialogActions_1 = require("@material-ui/core/DialogActions");
var DialogContent_1 = require("@material-ui/core/DialogContent");
var DialogContentText_1 = require("@material-ui/core/DialogContentText");
var DialogTitle_1 = require("@material-ui/core/DialogTitle");
var react_redux_1 = require("react-redux");
var Actions_1 = require("../../../Actions/Actions");
var actionTypes_1 = require("../../../Actions/actionTypes");
var FormDialog = /** @class */ (function (_super) {
    __extends(FormDialog, _super);
    function FormDialog() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.textField = react_1.createRef();
        _this.state = {
            lastBlobUrl: null,
            content: null,
            contentType: null,
            loading: false
        };
        return _this;
    }
    FormDialog.prototype.componentDidUpdate = function () {
        var _this = this;
        if (this.props.blobUrl !== this.state.lastBlobUrl) {
            this.setState({
                lastBlobUrl: this.props.blobUrl
            });
            this.setState({
                loading: true
            });
            this.props.blobUrl && fetch(this.props.blobUrl).then(function (r) { return __awaiter(_this, void 0, void 0, function () {
                var _a, _b;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            _a = this.setState;
                            _b = {};
                            return [4 /*yield*/, r.text()];
                        case 1:
                            _a.apply(this, [(_b.content = _c.sent(),
                                    _b.contentType = r.headers.get('content-type'),
                                    _b)]);
                            this.setState({
                                loading: false
                            });
                            return [2 /*return*/];
                    }
                });
            }); });
        }
    };
    FormDialog.prototype.handleSave = function (event) {
        event.preventDefault();
        var textField = this.textField.current;
        var item = this.props.item;
        if (textField && item) {
            var content = textField.value;
            var contentType = this.state.contentType ? this.state.contentType : 'text/plain';
            this.props.handleSubmit(event, {
                itemName: item.name,
                content: content,
                contentType: contentType
            });
        }
    };
    FormDialog.prototype.render = function () {
        var _a = this.props, handleClose = _a.handleClose, open = _a.open, item = _a.item;
        var itemName = item ? item.getDisplayName() : 'No item selected';
        var textAreaStyle = {
            width: '100%',
            minHeight: '300px'
        };
        var textArea = react_1.default.createElement("textarea", { style: textAreaStyle, defaultValue: this.state.content || '', ref: this.textField });
        return (react_1.default.createElement("div", null,
            react_1.default.createElement(Dialog_1.default, { open: open, onClose: handleClose, "aria-labelledby": "form-dialog-edit", fullWidth: true, maxWidth: 'sm' },
                react_1.default.createElement("form", null,
                    react_1.default.createElement(DialogTitle_1.default, { id: "form-dialog-edit" },
                        "Editing file: ",
                        itemName,
                        " "),
                    react_1.default.createElement(DialogContent_1.default, null,
                        react_1.default.createElement(DialogContentText_1.default, null, this.state.loading ? 'Loading...' : textArea)),
                    react_1.default.createElement(DialogActions_1.default, null,
                        react_1.default.createElement(Button_1.default, { onClick: handleClose, color: "primary", type: "button" }, "Close"),
                        react_1.default.createElement(Button_1.default, { color: "primary", onClick: this.handleSave.bind(this), type: "submit" }, "Update"))))));
    };
    return FormDialog;
}(react_1.Component));
var mapStateToProps = function (state) {
    return {
        open: state.visibleDialogs.EDIT,
        item: state.items.selected[0],
        blobUrl: state.blob || ''
    };
};
var mapDispatchToProps = function (dispatch) {
    return {
        handleClose: function () {
            dispatch(Actions_1.closeDialog(actionTypes_1.DIALOGS.EDIT));
        },
        handleSubmit: function (event, _a) {
            var itemName = _a.itemName, content = _a.content, contentType = _a.contentType;
            dispatch(Actions_1.updateTextFile(itemName, content, contentType));
        }
    };
};
exports.default = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(FormDialog);
