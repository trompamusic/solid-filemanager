"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DIALOGS = exports.CLOSE_DIALOG = exports.OPEN_DIALOG = exports.CLOSE_CONTEXT_MENU = exports.OPEN_CONTEXT_MENU = exports.SET_UPLOAD_FILE_LIST = exports.SET_UPLOAD_FILE_PROGRESS = exports.SET_LOADED_BLOB = exports.RESET_LOADED_BLOB = exports.STOP_LOADING = exports.DISPLAY_LOADING = exports.RESET_FILTER = exports.FILTER_ITEMS = exports.DESELECT_ITEM = exports.TOGGLE_SELECTED_ITEM = exports.SELECT_ITEMS = exports.SET_ITEMS = exports.SET_WEB_ID = exports.RESET_WEB_ID = exports.SET_HOST = exports.RESET_HOST = exports.SET_LOGGED_OUT = exports.SET_LOGGED_IN = exports.SET_PATH = exports.MOVE_FOLDER_UPWARDS = exports.ENTER_FOLDER = exports.SET_ERROR_MESSAGE = void 0;
;
exports.SET_ERROR_MESSAGE = 'SET_ERROR_MESSAGE';
exports.ENTER_FOLDER = 'ENTER_FOLDER';
exports.MOVE_FOLDER_UPWARDS = 'MOVE_FOLDER_UPWARDS';
exports.SET_PATH = 'SET_PATH';
exports.SET_LOGGED_IN = 'SET_LOGGED_IN';
exports.SET_LOGGED_OUT = 'SET_LOGGED_OUT';
exports.RESET_HOST = 'RESET_HOST';
exports.SET_HOST = 'SET_HOST'; // TODO: Consider renaming to BASE_URL
exports.RESET_WEB_ID = 'RESET_WEB_ID';
exports.SET_WEB_ID = 'SET_WEB_ID';
exports.SET_ITEMS = 'SET_ITEMS';
exports.SELECT_ITEMS = 'SELECT_ITEMS';
exports.TOGGLE_SELECTED_ITEM = 'TOGGLE_SELECTED_ITEM';
exports.DESELECT_ITEM = 'DESELECT_ITEM';
exports.FILTER_ITEMS = 'FILTER_ITEMS';
exports.RESET_FILTER = 'REMOVE_FILTER';
exports.DISPLAY_LOADING = 'DISPLAY_LOADING';
exports.STOP_LOADING = 'STOP_LOADING';
exports.RESET_LOADED_BLOB = 'RESET_LOADED_BLOB';
exports.SET_LOADED_BLOB = 'SET_LOADED_BLOB';
exports.SET_UPLOAD_FILE_PROGRESS = 'SET_UPLOAD_FILE_PROGRESS';
exports.SET_UPLOAD_FILE_LIST = 'SET_UPLOAD_FILE_LIST';
exports.OPEN_CONTEXT_MENU = 'OPEN_CONTEXT_MENU';
exports.CLOSE_CONTEXT_MENU = 'CLOSE_CONTEXT_MENU';
exports.OPEN_DIALOG = 'OPEN_DIALOG';
exports.CLOSE_DIALOG = 'CLOSE_DIALOG';
var DIALOGS;
(function (DIALOGS) {
    DIALOGS["CHOOSE_LOCATION"] = "CHOOSE_LOCATION";
    DIALOGS["CREATE_FOLDER"] = "CREATE_FOLDER";
    DIALOGS["CREATE_FILE"] = "CREATE_FILE";
    DIALOGS["UPLOAD_FILE"] = "UPLOAD_FILE";
    DIALOGS["RENAME"] = "RENAME";
    DIALOGS["MOVE"] = "MOVE";
    DIALOGS["COPY"] = "COPY";
    DIALOGS["CONTENT"] = "CONTENT";
    DIALOGS["MEDIA"] = "MEDIA";
    DIALOGS["EDIT"] = "EDIT";
    DIALOGS["CONTEXT_MENU"] = "CONTEXT_MENU";
})(DIALOGS = exports.DIALOGS || (exports.DIALOGS = {}));
;
