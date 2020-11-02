"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetErrorMessage = exports.setErrorMessage = exports.closeContextMenu = exports.openContextMenu = exports.closeDialog = exports.openDialog = exports.setFileUploadProgress = exports.resetFileUploadList = exports.setFileUploadList = exports.setFileContent = exports.resetFileContent = exports.stopLoading = exports.displayLoading = exports.resetFilter = exports.filterItems = exports.deselectItem = exports.toggleSelectedItem = exports.resetSelectedItems = exports.selectItem = exports.selectItems = exports.resetItems = exports.setItems = exports.resetWebId = exports.setWebId = exports.resetHost = exports.setHost = exports.setLoggedOut = exports.setLoggedIn = exports.resetPath = exports.setPath = exports.moveFolderUpwards = exports.rightClickOnFile = exports.moveFolderUpwardsAndRefresh = exports.enterFolderByItem = exports.enterFolder = exports.resetFileUploader = exports.setSelectedItemsFromLastTo = exports.copyItems = exports.moveItems = exports.removeItems = exports.createNewFolder = exports.displaySelectedMediaFile = exports.loadAndDisplayFile = exports.loadAndEditFile = exports.getFileContent = exports.openInNewTab = exports.extractZipFile = exports.zipAndUpload = exports.downloadItems = exports.renameFolder = exports.renameFile = exports.refreshItemList = exports.displayCurrentItemList = exports.updateTextFile = exports.createFile = exports.uploadFiles = exports.clearCache = exports.solidLogout = exports.updateLoginStatus = exports.solidLogin = exports.initApp = void 0;
var APIHandler = require("../Api/ApiHandler");
var solidAuth = require("solid-auth-client");
var Item_1 = require("../Api/Item");
var actionTypes_1 = require("./actionTypes");
var contentTypes_1 = require("../Api/contentTypes");
var package_json_1 = require("../../package.json");
exports.initApp = function () { return function (dispatch, getState) {
    console.log("Starting Solid-Filemanager v" + package_json_1.version);
    dispatch(exports.updateLoginStatus());
    dispatch(exports.openDialog(actionTypes_1.DIALOGS.CHOOSE_LOCATION));
}; };
exports.solidLogin = function () { return function (dispatch, getState) {
    dispatch(exports.displayLoading());
    solidPopupLogin()
        .then(function (session) { return dispatch(exports.updateLoginStatus(session)); })
        .catch(function (r) { return dispatch(exports.setErrorMessage(String(r))); })
        .finally(function () { return dispatch(exports.stopLoading()); });
}; };
exports.updateLoginStatus = function (session) { return function (dispatch, getState) { return __awaiter(void 0, void 0, void 0, function () {
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = session;
                if (_a) return [3 /*break*/, 2];
                return [4 /*yield*/, solidAuth.currentSession()];
            case 1:
                _a = (_b.sent());
                _b.label = 2;
            case 2:
                session = _a;
                if (!session) {
                    dispatch(exports.setLoggedOut());
                    dispatch(exports.resetWebId());
                }
                else {
                    dispatch(exports.setWebId(session.webId));
                    dispatch(exports.setLoggedIn());
                }
                return [2 /*return*/];
        }
    });
}); }; };
function solidPopupLogin() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, solidAuth.popupLogin({ popupUri: './vendor/solid-auth-client/popup.html' })];
        });
    });
}
exports.solidLogout = function () { return function (dispatch, getState) {
    dispatch(exports.displayLoading());
    solidAuth.logout()
        .then(function () {
        dispatch(exports.resetPath());
        dispatch(exports.resetItems());
        dispatch(exports.resetSelectedItems());
        dispatch(exports.setLoggedOut());
        dispatch(exports.resetWebId());
        dispatch(exports.openDialog(actionTypes_1.DIALOGS.CHOOSE_LOCATION));
    })
        .catch(function (r) { return dispatch(exports.setErrorMessage(String(r))); })
        .finally(function () { return dispatch(exports.stopLoading()); });
}; };
exports.clearCache = function () { return function (dispatch, getState) { return APIHandler.clearCache(); }; };
/**
 * Request API to get file list for the selected path then refresh UI
 */
exports.uploadFiles = function () { return function (dispatch, getState) {
    var _a = getState(), path = _a.path, fileList = _a.upload.fileList;
    if (fileList === null)
        return dispatch(exports.setErrorMessage("Couldn't find files to upload"));
    dispatch(exports.displayLoading());
    dispatch(exports.resetSelectedItems());
    dispatch(exports.setFileUploadProgress(50));
    APIHandler.uploadFiles(path.join('/'), fileList)
        .then(function (r) {
        dispatch(exports.setFileUploadProgress(100));
        setTimeout(function (f) {
            dispatch(exports.resetFileUploader());
        }, 300);
        dispatch(exports.displayCurrentItemList());
    })
        .catch(function (r) { return dispatch(exports.setErrorMessage(String(r))); })
        .finally(function () { return dispatch(exports.stopLoading()); });
}; };
exports.createFile = function (fileName, contentType) { return function (dispatch, getState) { return __awaiter(void 0, void 0, void 0, function () {
    var path, _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                path = getState().path;
                dispatch(exports.displayLoading());
                if (!contentType) return [3 /*break*/, 1];
                _a = contentType;
                return [3 /*break*/, 3];
            case 1: return [4 /*yield*/, contentTypes_1.guessContentType(fileName)];
            case 2:
                _a = _b.sent();
                _b.label = 3;
            case 3:
                contentType = _a;
                APIHandler.updateFile(path.join('/'), fileName, new Blob(), contentType)
                    .then(function (r) {
                    dispatch(exports.closeDialog(actionTypes_1.DIALOGS.CREATE_FILE));
                    dispatch(exports.displayCurrentItemList());
                    dispatch(exports.loadAndEditFile(fileName));
                    return APIHandler.getItemList(path.join('/'));
                })
                    .then(function (itemList) { return itemList.find(function (item) { return item.getDisplayName() === fileName; }); })
                    .then(function (item) {
                    if (!item)
                        throw new Error("Couldn't load created file for editing");
                    dispatch(exports.selectItem(item));
                    dispatch(exports.getFileContent(item.name));
                })
                    .catch(function (r) { return dispatch(exports.setErrorMessage(String(r))); })
                    .finally(function () { return dispatch(exports.stopLoading()); });
                return [2 /*return*/];
        }
    });
}); }; };
exports.updateTextFile = function (fileName, content, contentType) { return function (dispatch, getState) { return __awaiter(void 0, void 0, void 0, function () {
    var path, _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                path = getState().path;
                dispatch(exports.displayLoading());
                if (!contentType) return [3 /*break*/, 1];
                _a = contentType;
                return [3 /*break*/, 3];
            case 1: return [4 /*yield*/, contentTypes_1.guessContentType(fileName, content)];
            case 2:
                _a = _b.sent();
                _b.label = 3;
            case 3:
                contentType = _a;
                APIHandler.updateFile(path.join('/'), fileName, content, contentType)
                    .then(function (r) {
                    dispatch(exports.closeDialog(actionTypes_1.DIALOGS.EDIT));
                    dispatch(exports.displayCurrentItemList());
                })
                    .catch(function (r) { return dispatch(exports.setErrorMessage(String(r))); })
                    .finally(function () { return dispatch(exports.stopLoading()); });
                return [2 /*return*/];
        }
    });
}); }; };
/**
 * Request API to display file list for the selected path
 */
exports.displayCurrentItemList = function () { return function (dispatch, getState) {
    var path = getState().path;
    dispatch(exports.displayLoading());
    dispatch(exports.resetSelectedItems());
    APIHandler.getItemList(path.join('/'))
        .then(function (items) { return dispatch(exports.setItems(items)); })
        .catch(function (r) { return dispatch(exports.setErrorMessage(String(r))); })
        .finally(function () { return dispatch(exports.stopLoading()); });
}; };
/**
 * Request API to reload the file list and then refresh UI
 */
exports.refreshItemList = function () { return function (dispatch, getState) {
    var path = getState().path;
    APIHandler.clearCacheForFolder(path.join('/'));
    return dispatch(exports.displayCurrentItemList());
}; };
/**
 * Request API to rename file then dispatch defined events
 */
exports.renameFile = function (fileName, newFileName) { return function (dispatch, getState) {
    var path = getState().path;
    dispatch(exports.displayLoading());
    APIHandler.renameFile(path.join('/'), fileName, newFileName)
        .then(function () {
        dispatch(exports.displayCurrentItemList());
        dispatch(exports.closeDialog(actionTypes_1.DIALOGS.RENAME));
    })
        .catch(function (r) { return dispatch(exports.setErrorMessage(String(r))); })
        .finally(function () { return dispatch(exports.stopLoading()); });
}; };
/**
 * Request API to rename file then dispatch defined events
 */
exports.renameFolder = function (folderName, newFolderName) { return function (dispatch, getState) {
    var path = getState().path;
    dispatch(exports.displayLoading());
    APIHandler.renameFolder(path.join('/'), folderName, newFolderName)
        .then(function () {
        dispatch(exports.displayCurrentItemList());
        dispatch(exports.closeDialog(actionTypes_1.DIALOGS.RENAME));
    })
        .catch(function (r) { return dispatch(exports.setErrorMessage(String(r))); })
        .finally(function () { return dispatch(exports.stopLoading()); });
}; };
/**
 * Request API to download the specified items
 */
exports.downloadItems = function (items) { return function (dispatch, getState) { return __awaiter(void 0, void 0, void 0, function () {
    var path, blob, downloadName, zip, e_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                path = getState().path;
                dispatch(exports.displayLoading());
                _a.label = 1;
            case 1:
                _a.trys.push([1, 7, , 8]);
                blob = void 0;
                downloadName = items[0].name;
                if (!(items.length === 1 && items[0] instanceof Item_1.FileItem)) return [3 /*break*/, 3];
                return [4 /*yield*/, APIHandler.getFileBlob(path.join('/'), items[0].name)];
            case 2:
                blob = _a.sent();
                return [3 /*break*/, 6];
            case 3: return [4 /*yield*/, APIHandler.getAsZip(path.join('/'), items)];
            case 4:
                zip = _a.sent();
                return [4 /*yield*/, zip.generateAsync({ type: 'blob' })];
            case 5:
                blob = _a.sent();
                if (items.length > 1)
                    downloadName = 'Archive';
                downloadName = downloadName + ".zip";
                _a.label = 6;
            case 6:
                promptDownload(blob, downloadName);
                return [3 /*break*/, 8];
            case 7:
                e_1 = _a.sent();
                dispatch(exports.setErrorMessage(String(e_1)));
                return [3 /*break*/, 8];
            case 8:
                dispatch(exports.stopLoading());
                return [2 /*return*/];
        }
    });
}); }; };
/**
 * Request API to upload the items as zip archive
 */
exports.zipAndUpload = function (items) { return function (dispatch, getState) {
    var path = getState().path;
    dispatch(exports.displayLoading());
    var archiveName = (items.length === 1 && items[0] instanceof Item_1.FolderItem) ?
        items[0].name + ".zip"
        : 'Archive.zip';
    APIHandler.getAsZip(path.join('/'), items)
        .then(function (zip) { return zip.generateAsync({ type: 'blob' }); })
        .then(function (blob) { return APIHandler.updateFile(path.join('/'), archiveName, blob, 'application/zip'); })
        .then(function () { return dispatch(exports.displayCurrentItemList()); })
        .catch(function (r) { return dispatch(exports.setErrorMessage(String(r))); })
        .finally(function () { return dispatch(exports.stopLoading()); });
}; };
/**
 * Request API for extracting a zip archive
 */
exports.extractZipFile = function (fileName) { return function (dispatch, getState) {
    var path = getState().path;
    dispatch(exports.displayLoading());
    APIHandler.extractZipArchive(path.join('/'), path.join('/'), fileName)
        .then(function (r) { return dispatch(exports.displayCurrentItemList()); })
        .catch(function (r) { return dispatch(exports.setErrorMessage(String(r))); })
        .finally(function () { return dispatch(exports.stopLoading()); });
}; };
// code based on https://stackoverflow.com/a/30832210/6548154
function promptDownload(file, fileName) {
    if (window.navigator.msSaveOrOpenBlob) // IE10+
        window.navigator.msSaveOrOpenBlob(file, fileName);
    else { // Others
        var a_1 = document.createElement("a");
        var url_1 = URL.createObjectURL(file);
        a_1.href = url_1;
        a_1.download = fileName;
        document.body.appendChild(a_1);
        a_1.click();
        setTimeout(function () {
            document.body.removeChild(a_1);
            window.URL.revokeObjectURL(url_1);
        }, 0);
    }
}
/**
 * Opens the item in a new tab
 */
exports.openInNewTab = function (item) { return function (dispatch, getState) {
    window.open(item.url, '_blank');
}; };
/**
 * Request API to get file content then dispatch defined events
 */
exports.getFileContent = function (fileName) { return function (dispatch, getState) {
    var path = getState().path;
    dispatch(exports.displayLoading());
    dispatch(exports.resetFileContent());
    APIHandler.getFileBlob(path.join('/'), fileName)
        .then(function (blob) { return dispatch(exports.setFileContent(blob)); })
        .catch(function (r) { return dispatch(exports.setErrorMessage(String(r))); })
        .finally(function () { return dispatch(exports.stopLoading()); });
}; };
/**
 * Request API to get file content and open the edit dialogue
 */
exports.loadAndEditFile = function (fileName) { return function (dispatch, getState) {
    dispatch(exports.getFileContent(fileName));
    dispatch(exports.openDialog(actionTypes_1.DIALOGS.EDIT));
}; };
/**
 * Request API to get file content and display it
 */
exports.loadAndDisplayFile = function (fileName) { return function (dispatch, getState) {
    dispatch(exports.getFileContent(fileName));
    dispatch(exports.openDialog(actionTypes_1.DIALOGS.CONTENT));
}; };
/**
 * Request API to display an audio or video file
 */
exports.displaySelectedMediaFile = function () { return function (dispatch, getState) {
    dispatch(exports.openDialog(actionTypes_1.DIALOGS.MEDIA));
}; };
/**
 * Request API to create a folder then dispatch defined events
 */
exports.createNewFolder = function (folderName) { return function (dispatch, getState) {
    var path = getState().path;
    dispatch(exports.displayLoading());
    APIHandler.createFolder(path.join('/'), folderName)
        .then(function (r) {
        dispatch(exports.displayCurrentItemList());
        dispatch(exports.closeDialog(actionTypes_1.DIALOGS.CREATE_FOLDER));
    })
        .catch(function (r) { return dispatch(exports.setErrorMessage(String(r))); })
        .finally(function () { return dispatch(exports.stopLoading()); });
}; };
/**
 * Request API to remove multiple items
 */
exports.removeItems = function (items) { return function (dispatch, getState) {
    var path = getState().path;
    dispatch(exports.displayLoading());
    var itemNames = items.map(function (f) { return f.name; });
    APIHandler.removeItems(path.join('/'), itemNames)
        .then(function (r) { return dispatch(exports.displayCurrentItemList()); })
        .catch(function (r) { return dispatch(exports.setErrorMessage(String(r))); })
        .finally(function () { return dispatch(exports.stopLoading()); });
}; };
/**
 * Request API to move multiple items
 */
exports.moveItems = function (items, _a) {
    var host = _a.host, targetPath = _a.path;
    return function (dispatch, getState) {
        var path = getState().path;
        dispatch(exports.displayLoading());
        var destination = targetPath.join('/');
        var itemNames = items.map(function (f) { return f.name; });
        APIHandler.moveItems(path.join('/'), destination, itemNames)
            .then(function (r) {
            dispatch(exports.displayCurrentItemList());
            dispatch(exports.closeDialog(actionTypes_1.DIALOGS.MOVE));
        })
            .catch(function (r) { return dispatch(exports.setErrorMessage(String(r))); })
            .finally(function () { return dispatch(exports.stopLoading()); });
    };
};
/**
 * Request API to copy an item then dispatch defined events
 */
exports.copyItems = function (items, _a) {
    var host = _a.host, targetPath = _a.path;
    return function (dispatch, getState) {
        var path = getState().path;
        dispatch(exports.displayLoading());
        var destination = targetPath.join('/');
        var itemNames = items.map(function (f) { return f.name; });
        APIHandler.copyItems(path.join('/'), destination, itemNames)
            .then(function (r) {
            dispatch(exports.displayCurrentItemList());
            dispatch(exports.closeDialog(actionTypes_1.DIALOGS.COPY));
        })
            .catch(function (r) { return dispatch(exports.setErrorMessage(String(r))); })
            .finally(function () { return dispatch(exports.stopLoading()); });
    };
};
/**
 * This handles multiple selection by using shift key
 */
exports.setSelectedItemsFromLastTo = function (lastFile) { return function (dispatch, getState) {
    var _a = getState().items, items = _a.inCurFolder, selectedItems = _a.selected;
    var lastPreviouslySelected = __spreadArrays(selectedItems).pop();
    if (!lastPreviouslySelected)
        return dispatch(exports.setErrorMessage("Couldn't enlarge selection because no items were previously selected"));
    var lastPreviouslySelectedIndex = items.indexOf(lastPreviouslySelected);
    var lastSelectedIndex = items.indexOf(lastFile);
    var isInRange = function (num, start, end) { return start <= num && num <= end; };
    var toAdd = lastSelectedIndex > lastPreviouslySelectedIndex ?
        items.filter(function (item, index) { return isInRange(index, lastPreviouslySelectedIndex, lastSelectedIndex); })
        : items.filter(function (item, index) { return isInRange(index, lastSelectedIndex, lastPreviouslySelectedIndex); });
    dispatch(exports.selectItems(__spreadArrays(selectedItems, toAdd)));
}; };
exports.resetFileUploader = function () { return function (dispatch, getState) {
    dispatch(exports.setFileUploadProgress(0));
    dispatch(exports.closeDialog(actionTypes_1.DIALOGS.UPLOAD_FILE));
    dispatch(exports.resetFileUploadList());
}; };
exports.enterFolder = function (path) { return function (dispatch, getState) {
    dispatch(exports.setPath(path));
    dispatch(exports.resetFilter());
    dispatch(exports.displayCurrentItemList());
}; };
exports.enterFolderByItem = function (item) { return function (dispatch, getState) {
    var path = item.path;
    // Open containing folder if it is a file
    dispatch(exports.enterFolder(item instanceof Item_1.FileItem ? path : __spreadArrays(path, [item.name])));
}; };
exports.moveFolderUpwardsAndRefresh = function (n) { return function (dispatch, getState) {
    dispatch(exports.moveFolderUpwards(n));
    dispatch(exports.refreshItemList());
}; };
exports.rightClickOnFile = function (item) { return function (dispatch, getState) {
    var selected = getState().items.selected;
    var isSelected = selected.includes(item);
    !isSelected && dispatch(exports.selectItem(item));
}; };
// Create action which can be dispatched
var makeActionCreator = function (type) { return function (value) {
    return {
        type: type,
        value: value
    };
}; };
exports.moveFolderUpwards = makeActionCreator(actionTypes_1.MOVE_FOLDER_UPWARDS);
exports.setPath = makeActionCreator(actionTypes_1.SET_PATH);
exports.resetPath = function () { return exports.setPath([]); };
exports.setLoggedIn = makeActionCreator(actionTypes_1.SET_LOGGED_IN);
exports.setLoggedOut = makeActionCreator(actionTypes_1.SET_LOGGED_OUT);
exports.setHost = makeActionCreator(actionTypes_1.SET_HOST);
exports.resetHost = makeActionCreator(actionTypes_1.RESET_HOST);
exports.setWebId = makeActionCreator(actionTypes_1.SET_WEB_ID);
exports.resetWebId = makeActionCreator(actionTypes_1.RESET_WEB_ID);
exports.setItems = makeActionCreator(actionTypes_1.SET_ITEMS);
exports.resetItems = function () { return exports.setItems([]); };
exports.selectItems = makeActionCreator(actionTypes_1.SELECT_ITEMS);
exports.selectItem = function (item) { return exports.selectItems([item]); };
exports.resetSelectedItems = function () { return exports.selectItems([]); };
exports.toggleSelectedItem = makeActionCreator(actionTypes_1.TOGGLE_SELECTED_ITEM);
exports.deselectItem = makeActionCreator(actionTypes_1.DESELECT_ITEM);
exports.filterItems = makeActionCreator(actionTypes_1.FILTER_ITEMS);
exports.resetFilter = makeActionCreator(actionTypes_1.RESET_FILTER);
exports.displayLoading = makeActionCreator(actionTypes_1.DISPLAY_LOADING);
exports.stopLoading = makeActionCreator(actionTypes_1.STOP_LOADING);
exports.resetFileContent = makeActionCreator(actionTypes_1.RESET_LOADED_BLOB);
exports.setFileContent = makeActionCreator(actionTypes_1.SET_LOADED_BLOB);
exports.setFileUploadList = makeActionCreator(actionTypes_1.SET_UPLOAD_FILE_LIST);
exports.resetFileUploadList = function () { return exports.setFileUploadList(null); };
exports.setFileUploadProgress = makeActionCreator(actionTypes_1.SET_UPLOAD_FILE_PROGRESS);
exports.openDialog = makeActionCreator(actionTypes_1.OPEN_DIALOG);
exports.closeDialog = makeActionCreator(actionTypes_1.CLOSE_DIALOG);
exports.openContextMenu = makeActionCreator(actionTypes_1.OPEN_CONTEXT_MENU);
exports.closeContextMenu = makeActionCreator(actionTypes_1.CLOSE_CONTEXT_MENU);
exports.setErrorMessage = makeActionCreator(actionTypes_1.SET_ERROR_MESSAGE);
exports.resetErrorMessage = function () { return exports.setErrorMessage(''); };
