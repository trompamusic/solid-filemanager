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
var TextField_1 = require("@material-ui/core/TextField");
var Typography_1 = require("@material-ui/core/Typography");
var react_redux_1 = require("react-redux");
var Actions_1 = require("../../../Actions/Actions");
var HistoryHandler_1 = require("../../HistoryHandler/HistoryHandler");
var actionTypes_1 = require("../../../Actions/actionTypes");
var FormDialog = /** @class */ (function (_super) {
    __extends(FormDialog, _super);
    function FormDialog() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            location: '',
        };
        return _this;
    }
    FormDialog.prototype.componentWillReceiveProps = function (props) {
        var isLoggedIn = props.isLoggedIn, webId = props.webId;
        var params = new URLSearchParams(document.location.search.substr(1));
        var encodedUrl = params.get('url');
        if (encodedUrl !== null) {
            var location_1 = decodeURI(encodedUrl);
            this.setState({ location: location_1 });
        }
        else if (isLoggedIn && webId) {
            var location_2 = (new URL(webId)).origin;
            this.setState({ location: location_2 });
        }
    };
    FormDialog.prototype.handleChange = function (event) {
        var targetForm = event.currentTarget.form;
        if (targetForm) {
            var input = targetForm.querySelector('input');
            if (input) {
                var location_3 = input.value;
                this.setState({ location: location_3 });
                return;
            }
        }
        console.log("Couldn't find location input");
    };
    FormDialog.prototype.handleSubmit = function (event) {
        this.props.handleSubmit(event, { location: this.state.location });
    };
    FormDialog.prototype.render = function () {
        var location = this.state.location;
        location = location ? location : '';
        var _a = this.props, handleClose = _a.handleClose, handleLogin = _a.handleLogin, handleLogout = _a.handleLogout, open = _a.open, isLoggedIn = _a.isLoggedIn, webId = _a.webId;
        return (react_1.default.createElement(Dialog_1.default, { open: open, onClose: handleClose, "aria-labelledby": "form-dialog-choose-location", fullWidth: true, maxWidth: 'sm' },
            react_1.default.createElement("form", null,
                react_1.default.createElement(DialogTitle_1.default, { id: "form-dialog-choose-location" }, "Choose the storage location"),
                react_1.default.createElement(DialogContent_1.default, null,
                    react_1.default.createElement(Typography_1.default, { variant: "body1", gutterBottom: true }, !isLoggedIn ?
                        "If you want to access private resources, please login with the button below."
                        : "Logged in as " + webId + "."),
                    !isLoggedIn ?
                        react_1.default.createElement(Button_1.default, { variant: "outlined", color: "primary", onClick: handleLogin }, "Login")
                        : react_1.default.createElement(Button_1.default, { variant: "outlined", onClick: handleLogout }, "Logout"),
                    react_1.default.createElement(Typography_1.default, { variant: "body1" }, "Please enter the directory you want to open below."),
                    react_1.default.createElement(TextField_1.default, { autoFocus: true, fullWidth: true, margin: "normal", label: "Storage Location", variant: "outlined", onChange: this.handleChange.bind(this), value: location })),
                react_1.default.createElement(DialogActions_1.default, null,
                    react_1.default.createElement(Button_1.default, { onClick: handleClose, color: "primary", type: "button" }, "Cancel"),
                    react_1.default.createElement(Button_1.default, { color: "primary", type: "submit", onClick: this.handleSubmit.bind(this) }, "Open directory")))));
    };
    return FormDialog;
}(react_1.Component));
var mapStateToProps = function (state) {
    return {
        open: state.visibleDialogs.CHOOSE_LOCATION,
        webId: state.account.webId,
        isLoggedIn: state.account.loggedIn
    };
};
var mapDispatchToProps = function (dispatch) {
    return {
        handleClose: function () {
            dispatch(Actions_1.closeDialog(actionTypes_1.DIALOGS.CHOOSE_LOCATION));
        },
        handleLogin: function (event) {
            event.preventDefault();
            dispatch(Actions_1.solidLogin());
        },
        handleLogout: function (event) {
            event.preventDefault();
            dispatch(Actions_1.solidLogout());
        },
        handleSubmit: function (event, _a) {
            var location = _a.location;
            event.preventDefault();
            if (!location)
                return dispatch(Actions_1.setErrorMessage("Please enter the folder which should be opened"));
            var _b = HistoryHandler_1.getLocationObjectFromUrl(location), host = _b.host, path = _b.path;
            dispatch(Actions_1.closeDialog(actionTypes_1.DIALOGS.CHOOSE_LOCATION));
            dispatch(Actions_1.setHost(host));
            dispatch(Actions_1.clearCache());
            dispatch(Actions_1.enterFolder(path));
        }
    };
};
exports.default = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(FormDialog);
