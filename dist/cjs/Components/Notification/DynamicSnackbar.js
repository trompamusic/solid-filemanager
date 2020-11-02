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
var styles_1 = require("@material-ui/core/styles");
var Snackbar_1 = require("@material-ui/core/Snackbar");
var IconButton_1 = require("@material-ui/core/IconButton");
var Close_1 = require("@material-ui/icons/Close");
var react_redux_1 = require("react-redux");
var Actions_1 = require("../../Actions/Actions");
var styles = function (theme) { return styles_1.createStyles({
    close: {
        padding: theme.spacing.unit / 2,
    },
}); };
var DynamicSnackbar = /** @class */ (function (_super) {
    __extends(DynamicSnackbar, _super);
    function DynamicSnackbar() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DynamicSnackbar.prototype.render = function () {
        var _a = this.props, classes = _a.classes, errorMsg = _a.errorMsg, handleClose = _a.handleClose, open = _a.open, notificationDuration = _a.notificationDuration;
        return (react_1.default.createElement("div", null,
            react_1.default.createElement(Snackbar_1.default, { anchorOrigin: {
                    vertical: 'bottom',
                    horizontal: 'left',
                }, open: open, autoHideDuration: notificationDuration, onClose: handleClose, ContentProps: {
                    'aria-describedby': 'message-id',
                }, message: react_1.default.createElement("span", { id: "message-id" }, errorMsg), action: [
                    react_1.default.createElement(IconButton_1.default, { key: "close", "aria-label": "Close", color: "inherit", className: classes.close, onClick: handleClose },
                        react_1.default.createElement(Close_1.default, null)),
                ] })));
    };
    return DynamicSnackbar;
}(react_1.default.Component));
var mapStateToProps = function (state) {
    return {
        open: !!state.errorMessage,
        errorMsg: state.errorMessage,
        notificationDuration: 60000
    };
};
var mapDispatchToProps = function (dispatch) {
    return {
        handleClose: function () {
            dispatch(Actions_1.resetErrorMessage());
        }
    };
};
exports.default = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(styles_1.withStyles(styles)(DynamicSnackbar));
