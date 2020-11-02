"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var redux_1 = require("redux");
var accountReducer_1 = require("./accountReducer");
var currentBlobReducer_1 = require("./currentBlobReducer");
var dialogsReducer_1 = require("./dialogsReducer");
var errorReducer_1 = require("./errorReducer");
var itemsReducer_1 = require("./itemsReducer");
var loadingReducer_1 = require("./loadingReducer");
var pathReducer_1 = require("./pathReducer");
var uploadReducer_1 = require("./uploadReducer");
var rootReducer = redux_1.combineReducers({
    account: accountReducer_1.account,
    blob: currentBlobReducer_1.blob,
    contextMenu: dialogsReducer_1.contextMenu,
    visibleDialogs: dialogsReducer_1.visibleDialogs,
    errorMessage: errorReducer_1.errorMessage,
    items: itemsReducer_1.items,
    loading: loadingReducer_1.loading,
    path: pathReducer_1.path,
    upload: uploadReducer_1.upload,
});
exports.default = rootReducer;
