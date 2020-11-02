"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var MenuItem_1 = require("@material-ui/core/MenuItem");
var react_redux_1 = require("react-redux");
var Actions_1 = require("../../../Actions/Actions");
var ListItemIcon_1 = require("@material-ui/core/ListItemIcon");
var Typography_1 = require("@material-ui/core/Typography");
var OpenInBrowser_1 = require("@material-ui/icons/OpenInBrowser");
var Item_1 = require("../../../Api/Item");
function OpenAction(props) {
    var handleClick = props.handleClick, selectedItems = props.selectedItems;
    return (react_1.default.createElement(MenuItem_1.default, { onClick: function () { return handleClick(selectedItems); } },
        react_1.default.createElement(ListItemIcon_1.default, null,
            react_1.default.createElement(OpenInBrowser_1.default, null)),
        react_1.default.createElement(Typography_1.default, { variant: "inherit" }, "Open")));
}
var mapStateToProps = function (state) {
    return {
        selectedItems: state.items.selected
    };
};
var mapDispatchToProps = function (dispatch) {
    return {
        handleClick: function (selectedItems) {
            var item = selectedItems[0];
            if (item instanceof Item_1.FolderItem)
                dispatch(Actions_1.enterFolderByItem(item));
            else if (item instanceof Item_1.FileItem) {
                if (item.isEditable())
                    dispatch(Actions_1.loadAndEditFile(item.name));
                else if (item.isImage())
                    dispatch(Actions_1.loadAndDisplayFile(item.name));
                else if (item.isMedia())
                    dispatch(Actions_1.displaySelectedMediaFile());
            }
        }
    };
};
exports.default = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(OpenAction);
