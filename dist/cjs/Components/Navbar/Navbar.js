"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var AppBar_1 = require("@material-ui/core/AppBar");
var Toolbar_1 = require("@material-ui/core/Toolbar");
var Typography_1 = require("@material-ui/core/Typography");
var InputBase_1 = require("@material-ui/core/InputBase");
var IconButton_1 = require("@material-ui/core/IconButton");
var colorManipulator_1 = require("@material-ui/core/styles/colorManipulator");
var styles_1 = require("@material-ui/core/styles");
var Search_1 = require("@material-ui/icons/Search");
var Refresh_1 = require("@material-ui/icons/Refresh");
var react_redux_1 = require("react-redux");
var Actions_1 = require("../../Actions/Actions");
var ThreeDotsMenu_1 = require("./ThreeDotsMenu");
var BreadcrumbText_1 = require("../Breadcrumb/BreadcrumbText");
var styles = function (theme) {
    var _a, _b, _c;
    return styles_1.createStyles({
        root: {
            width: '100%',
            marginBottom: '4.3em'
        },
        grow: {
            flexGrow: 1,
        },
        menuButton: {
            marginLeft: -12,
            marginRight: 20,
        },
        title: (_a = {
                display: 'block'
            },
            _a[theme.breakpoints.up('sm')] = {
                display: 'block',
            },
            _a),
        search: (_b = {
                position: 'relative',
                borderRadius: theme.shape.borderRadius,
                backgroundColor: colorManipulator_1.fade(theme.palette.common.white, 0.15),
                '&:hover': {
                    backgroundColor: colorManipulator_1.fade(theme.palette.common.white, 0.25),
                },
                marginLeft: 0,
                width: '100%',
                display: 'none'
            },
            _b[theme.breakpoints.up('sm')] = {
                marginLeft: theme.spacing.unit,
                width: 'auto',
                display: 'block'
            },
            _b),
        searchIcon: {
            width: theme.spacing.unit * 9,
            height: '100%',
            position: 'absolute',
            pointerEvents: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        inputRoot: {
            color: 'inherit',
            width: '100%',
        },
        inputInput: (_c = {
                paddingTop: theme.spacing.unit,
                paddingRight: theme.spacing.unit,
                paddingBottom: theme.spacing.unit,
                paddingLeft: theme.spacing.unit * 10,
                transition: theme.transitions.create('width'),
                width: '100%'
            },
            _c[theme.breakpoints.up('sm')] = {
                width: 100,
                '&:focus': {
                    width: 200,
                },
            },
            _c),
    });
};
function SearchAppBar(props) {
    var classes = props.classes, path = props.path, filter = props.filter, moveUpwards = props.moveUpwards, canGoBack = props.canGoBack, handleChange = props.handleChange, handleRefresh = props.handleRefresh;
    return (react_1.default.createElement("div", { className: classes.root },
        react_1.default.createElement(AppBar_1.default, { position: "relative" },
            react_1.default.createElement(Toolbar_1.default, null,
                react_1.default.createElement(Typography_1.default, { className: classes.title, variant: "h6", color: "inherit", noWrap: true },
                    react_1.default.createElement(BreadcrumbText_1.default, { path: path, handleClickPath: function (index) { return moveUpwards(path.length - index - 1); }, handleGoBack: function () { return moveUpwards(1); }, canGoBack: canGoBack, rootTitle: "Solid Filemanager" })),
                react_1.default.createElement("div", { className: classes.grow }),
                react_1.default.createElement("div", { className: classes.search },
                    react_1.default.createElement("div", { className: classes.searchIcon },
                        react_1.default.createElement(Search_1.default, null)),
                    react_1.default.createElement(InputBase_1.default, { placeholder: "Search\u2026", value: filter, onChange: handleChange, classes: {
                            root: classes.inputRoot,
                            input: classes.inputInput,
                        } })),
                react_1.default.createElement(IconButton_1.default, { color: "inherit", "aria-label": "Refresh", onClick: handleRefresh },
                    react_1.default.createElement(Refresh_1.default, null)),
                react_1.default.createElement(ThreeDotsMenu_1.default, null)))));
}
var mapStateToProps = function (state) {
    return {
        filter: state.items.filter,
        path: state.path,
        canGoBack: state.path.length > 0,
    };
};
var mapDispatchToProps = function (dispatch) {
    return {
        handleChange: function (event) {
            dispatch(Actions_1.filterItems(event.currentTarget.value));
        },
        moveUpwards: function (n) {
            console.log('moveUpwards', n);
            dispatch(Actions_1.moveFolderUpwardsAndRefresh(n));
        },
        handleRefresh: function () { return dispatch(Actions_1.refreshItemList()); }
    };
};
exports.default = styles_1.withStyles(styles)(react_redux_1.connect(mapStateToProps, mapDispatchToProps)(SearchAppBar));
