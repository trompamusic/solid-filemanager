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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var Button_1 = require("@material-ui/core/Button");
var Dialog_1 = require("@material-ui/core/Dialog");
var DialogActions_1 = require("@material-ui/core/DialogActions");
var DialogContent_1 = require("@material-ui/core/DialogContent");
var DialogTitle_1 = require("@material-ui/core/DialogTitle");
var FileListSublist_1 = require("../../FileList/FileListSublist/FileListSublist");
var KeyboardArrowLeft_1 = require("@material-ui/icons/KeyboardArrowLeft");
var Item_1 = require("../../../Api/Item");
var ApiHandler = require("../../../Api/ApiHandler");
var FormDialog = /** @class */ (function (_super) {
    __extends(FormDialog, _super);
    function FormDialog(props) {
        var _this = _super.call(this, props) || this;
        var initialPath = props.initialPath, initialHost = props.initialHost;
        _this.host = initialHost;
        _this.path = initialPath;
        _this.state = {
            items: [],
            isLoading: true,
        };
        return _this;
    }
    FormDialog.prototype.componentDidUpdate = function (prevProps) {
        if (prevProps.initialHost !== this.props.initialHost
            || prevProps.initialPath.join('') !== this.props.initialPath.join('')) {
            this.host = this.props.initialHost;
            this.path = this.props.initialPath;
            this.updateItems();
        }
    };
    FormDialog.prototype.handleGoBack = function () {
        this.path = this.path.slice(0, -1);
        this.updateItems();
    };
    FormDialog.prototype.handleOpenFolder = function (folder) {
        this.path = __spreadArrays(folder.path, [folder.name]);
        this.updateItems();
    };
    FormDialog.prototype.updateItems = function () {
        return __awaiter(this, void 0, void 0, function () {
            var items;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.setState({ isLoading: true });
                        return [4 /*yield*/, ApiHandler.getItemList(this.path.join('/'))];
                    case 1:
                        items = (_a.sent())
                            .filter(function (item) { return item instanceof Item_1.FolderItem; });
                        this.setState({ isLoading: false, items: items });
                        return [2 /*return*/];
                }
            });
        });
    };
    FormDialog.prototype.render = function () {
        var _a = this.props, open = _a.open, handleClose = _a.handleClose, handleSubmit = _a.handleSubmit, actionName = _a.actionName;
        var _b = this.state, items = _b.items, isLoading = _b.isLoading;
        var host = this.host;
        var path = this.path;
        var url = host + "/" + path.join('/');
        var canGoBack = path.length > 0;
        return (react_1.default.createElement(Dialog_1.default, { open: open, onClose: handleClose, "aria-labelledby": "form-dialog-move", fullWidth: true, maxWidth: 'sm' },
            react_1.default.createElement("form", null,
                react_1.default.createElement(DialogTitle_1.default, { id: "form-dialog-move" },
                    actionName,
                    " items to ",
                    react_1.default.createElement("small", { style: { color: 'grey' } }, url)),
                react_1.default.createElement(DialogContent_1.default, null,
                    react_1.default.createElement(FileListSublist_1.default, { items: items, isLoading: isLoading, handleOpenFolder: this.handleOpenFolder.bind(this) })),
                react_1.default.createElement(DialogActions_1.default, null,
                    react_1.default.createElement(Button_1.default, { onClick: this.handleGoBack.bind(this), color: "primary", type: "button", disabled: !canGoBack },
                        react_1.default.createElement(KeyboardArrowLeft_1.default, null),
                        " Go back directory"),
                    react_1.default.createElement(Button_1.default, { onClick: handleClose, color: "primary", type: "button" }, "Cancel"),
                    react_1.default.createElement(Button_1.default, { color: "primary", onClick: function (e) { return handleSubmit({ host: host, path: path }); }, type: "submit" }, actionName)))));
    };
    return FormDialog;
}(react_1.Component));
exports.default = FormDialog;
