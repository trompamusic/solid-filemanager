"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var react_redux_1 = require("react-redux");
var Actions_1 = require("../../../Actions/Actions");
var actionTypes_1 = require("../../../Actions/actionTypes");
var ChooseLocation_1 = require("../ChooseLocation/ChooseLocation");
function CopyDialog(props) {
    var initialHost = props.initialHost, initialPath = props.initialPath, selectedItems = props.selectedItems, open = props.open, handleClose = props.handleClose, copy = props.copy;
    return react_1.default.createElement(ChooseLocation_1.default, { open: open, actionName: "Copy", initialHost: initialHost, initialPath: initialPath, handleClose: handleClose, handleSubmit: function (location) { return copy(selectedItems, location); } });
}
var mapStateToProps = function (state) {
    return {
        open: state.visibleDialogs.COPY,
        initialHost: state.account.host || '',
        initialPath: state.path,
        selectedItems: state.items.selected,
    };
};
var mapDispatchToProps = function (dispatch) {
    return {
        handleClose: function () {
            dispatch(Actions_1.closeDialog(actionTypes_1.DIALOGS.COPY));
        },
        copy: function (selectedItems, targetLocation) {
            dispatch(Actions_1.copyItems(selectedItems, targetLocation));
        },
    };
};
exports.default = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(CopyDialog);
