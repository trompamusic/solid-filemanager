"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var styles_1 = require("@material-ui/core/styles");
var CircularProgress_1 = require("@material-ui/core/CircularProgress");
var Grid_1 = require("@material-ui/core/Grid");
var styles = function (theme) { return styles_1.createStyles({
    progress: {
        margin: theme.spacing.unit * 10,
    },
}); };
function Loader(props) {
    return (react_1.default.createElement(Grid_1.default, { container: true, justify: "center" },
        react_1.default.createElement(CircularProgress_1.default, { className: props.classes.progress, color: "secondary" })));
}
;
exports.default = styles_1.withStyles(styles)(Loader);
