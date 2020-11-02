"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var MenuItem_1 = require("@material-ui/core/MenuItem");
var react_redux_1 = require("react-redux");
var Actions_1 = require("../../../Actions/Actions");
var ListItemIcon_1 = require("@material-ui/core/ListItemIcon");
var Typography_1 = require("@material-ui/core/Typography");
var Link_1 = require("@material-ui/icons/Link");
function OpenInNewTabAction(props) {
    var handleClick = props.handleClick, selectedItems = props.selectedItems;
    return (react_1.default.createElement(MenuItem_1.default, { onClick: function () { return handleClick(selectedItems); } },
        react_1.default.createElement(ListItemIcon_1.default, null,
            react_1.default.createElement(Link_1.default, null)),
        react_1.default.createElement(Typography_1.default, { variant: "inherit" }, "Open in new Tab")));
}
var mapStateToProps = function (state) {
    return {
        selectedItems: state.items.selected
    };
};
var mapDispatchToProps = function (dispatch) {
    return {
        handleClick: function (selectedItems) {
            dispatch(Actions_1.openInNewTab(selectedItems[0]));
        }
    };
};
exports.default = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(OpenInNewTabAction);
