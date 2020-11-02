"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var MenuItem_1 = require("@material-ui/core/MenuItem");
var react_redux_1 = require("react-redux");
var ListItemIcon_1 = require("@material-ui/core/ListItemIcon");
var Typography_1 = require("@material-ui/core/Typography");
var InsertDriveFile_1 = require("@material-ui/icons/InsertDriveFile");
var Actions_1 = require("../../../Actions/Actions");
var actionTypes_1 = require("../../../Actions/actionTypes");
function CreateFileAction(props) {
    var handleClick = props.handleClick, handleClose = props.handleClose;
    var handleCloseAfter = function (callback) { return function () {
        callback();
        handleClose();
    }; };
    return (react_1.default.createElement(MenuItem_1.default, { onClick: handleCloseAfter(handleClick) },
        react_1.default.createElement(ListItemIcon_1.default, null,
            react_1.default.createElement(InsertDriveFile_1.default, null)),
        react_1.default.createElement(Typography_1.default, { variant: "inherit" }, "Create file")));
}
var mapStateToProps = function (state) {
    return {};
};
var mapDispatchToProps = function (dispatch) {
    return {
        handleClick: function () {
            dispatch(Actions_1.openDialog(actionTypes_1.DIALOGS.CREATE_FILE));
        }
    };
};
exports.default = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(CreateFileAction);
