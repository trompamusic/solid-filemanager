"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var MenuItem_1 = require("@material-ui/core/MenuItem");
var react_redux_1 = require("react-redux");
var ListItemIcon_1 = require("@material-ui/core/ListItemIcon");
var Typography_1 = require("@material-ui/core/Typography");
var FileCopy_1 = require("@material-ui/icons/FileCopy");
var Actions_1 = require("../../../Actions/Actions");
var actionTypes_1 = require("../../../Actions/actionTypes");
function CopyAction(props) {
    var handleClick = props.handleClick;
    return (react_1.default.createElement(MenuItem_1.default, { onClick: handleClick },
        react_1.default.createElement(ListItemIcon_1.default, null,
            react_1.default.createElement(FileCopy_1.default, null)),
        react_1.default.createElement(Typography_1.default, { variant: "inherit" }, "Copy")));
}
var mapStateToProps = function (state) {
    return {};
};
var mapDispatchToProps = function (dispatch) {
    return {
        handleClick: function () {
            dispatch(Actions_1.openDialog(actionTypes_1.DIALOGS.COPY));
        }
    };
};
exports.default = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(CopyAction);
