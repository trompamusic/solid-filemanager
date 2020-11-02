"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var Menu_1 = require("./Menu/Menu");
var Content_1 = require("./Content/Content");
var Media_1 = require("./Media/Media");
var Edit_1 = require("./Edit/Edit");
var CreateFolder_1 = require("./CreateFolder/CreateFolder");
var CreateFile_1 = require("./CreateFile/CreateFile");
var Rename_1 = require("./Rename/Rename");
var Move_1 = require("./Move/Move");
var Copy_1 = require("./Copy/Copy");
var UploadFile_1 = require("./UploadFile/UploadFile");
// TODO: Consider moving the visibility logic here
function Dialogs() {
    return (react_1.default.createElement("div", { className: "Dialogs" },
        react_1.default.createElement(Menu_1.default, null),
        react_1.default.createElement(Content_1.default, null),
        react_1.default.createElement(Media_1.default, null),
        react_1.default.createElement(Edit_1.default, null),
        react_1.default.createElement(CreateFolder_1.default, null),
        react_1.default.createElement(CreateFile_1.default, null),
        react_1.default.createElement(Move_1.default, null),
        react_1.default.createElement(Copy_1.default, null),
        react_1.default.createElement(Rename_1.default, null),
        react_1.default.createElement(UploadFile_1.default, null)));
}
exports.default = Dialogs;
