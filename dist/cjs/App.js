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
var FileList_1 = require("./Components/FileList/FileList");
var Navbar_1 = require("./Components/Navbar/Navbar");
var ContextMenu_1 = require("./Components/ContextMenu/ContextMenu");
var Dialogs_1 = require("./Components/Dialogs/Dialogs");
var styles_1 = require("@material-ui/core/styles");
var blue_1 = require("@material-ui/core/colors/blue");
var react_redux_1 = require("react-redux");
var Actions_1 = require("./Actions/Actions");
var DynamicSnackbar_1 = require("./Components/Notification/DynamicSnackbar");
var HistoryHandler_1 = require("./Components/HistoryHandler/HistoryHandler");
var Item_1 = require("./Api/Item");
var theme = styles_1.createMuiTheme({
    palette: {
        primary: blue_1.default,
    },
    typography: {
        useNextVariants: true,
    }
});
var App = /** @class */ (function (_super) {
    __extends(App, _super);
    function App() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            dialogOpen: false,
        };
        return _this;
    }
    App.prototype.componentDidMount = function () {
        this.props.init();
    };
    ;
    App.prototype.searchFile = function (val) {
        this.setState({ dialogOpen: val });
    };
    App.prototype.render = function () {
        var selectedItem = this.props.selectedItem;
        var isFileSelected = selectedItem instanceof Item_1.FileItem;
        console.log(isFileSelected, selectedItem);
        return (react_1.default.createElement("div", { className: "App" },
            react_1.default.createElement("div", { onClick: this.props.handleHideContextMenu, onContextMenu: this.props.handleHideContextMenu },
                react_1.default.createElement(Navbar_1.default, null),
                react_1.default.createElement(FileList_1.default, null),
                react_1.default.createElement(ContextMenu_1.default, null),
                react_1.default.createElement(DynamicSnackbar_1.default, null),
                react_1.default.createElement(Dialogs_1.default, null)),
            react_1.default.createElement(HistoryHandler_1.default, null)));
    };
    return App;
}(react_1.Component));
;
var mapStateToProps = function (state) {
    var selectedItem = state.items.selected[0];
    return {
        selectedItem: selectedItem,
    };
};
var mapDispatchToProps = function (dispatch) {
    return {
        init: function () {
            dispatch(Actions_1.initApp());
        },
        handleHideContextMenu: function (event) {
            var element = event.target;
            if (!(element.tagName === 'INPUT' || /label/i.test(element.className))) {
                event.preventDefault();
            }
            dispatch(Actions_1.closeContextMenu());
        },
    };
};
exports.default = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(App);
