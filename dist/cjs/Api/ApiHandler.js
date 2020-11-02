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
exports.extractZipArchive = exports.getAsZip = exports.updateFile = exports.uploadFiles = exports.copyItems = exports.moveItems = exports.removeItems = exports.removeItem = exports.createFolder = exports.renameFolder = exports.renameFile = exports.getFileBlob = exports.clearCache = exports.clearCacheForFolder = exports.getItemList = void 0;
var jszip_1 = require("jszip");
var Item_1 = require("./Item");
var ApiCache_1 = require("./ApiCache");
var config_1 = require("./../config");
var solidAuth = require("solid-auth-client");
var solid_file_client_1 = require("solid-file-client");
var contentTypes_1 = require("./contentTypes");
var fileClient = new solid_file_client_1.default(solidAuth, { enableLogging: true });
var cache = new ApiCache_1.default();
/**
 * Log a fetch response error and throw it again
 * @param {*} error
 */
var handleFetchError = function (error) { return __awaiter(void 0, void 0, void 0, function () {
    var detailedErrorMessage, displayErrorMessage, displayMessages;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                detailedErrorMessage = '';
                console.group('handleFetchError');
                if (!(error instanceof Response)) return [3 /*break*/, 2];
                return [4 /*yield*/, error.text()];
            case 1:
                detailedErrorMessage = _a.sent();
                console.error("url: " + error.url);
                console.error("status: " + error.status);
                displayMessages = {
                    '401': "The ressource at " + error.url + " requires you to login.",
                    '403': "You don't have permission to access the ressource at " + error.url + ".\n            Please make sure that you are logged in with the correct account.\n            If the server runs with version 5.0.0 or higher, make sure you gave this app read/write permission",
                    '404': "The ressource at " + error.url + " was not found",
                    '500': "An internal server error occured...\n            " + detailedErrorMessage,
                };
                if (error.status in displayMessages)
                    displayErrorMessage = displayMessages[error.status];
                return [3 /*break*/, 3];
            case 2:
                if (error instanceof Error) {
                    detailedErrorMessage = error.message;
                    console.error(error.stack);
                }
                else if (typeof error === 'string') {
                    detailedErrorMessage = error;
                }
                else {
                    detailedErrorMessage = JSON.stringify(error);
                }
                _a.label = 3;
            case 3:
                console.error("errorMessage: " + detailedErrorMessage);
                console.error("error: " + error);
                console.groupEnd();
                throw new Error((displayErrorMessage) ? displayErrorMessage : detailedErrorMessage);
        }
    });
}); };
/**
 * Clean path string removing double slashes and prepending a slash if non-empty
 */
var fixPath = function (path) {
    if (path === "")
        return path;
    return ('/' + path).replace(/\/\//g, '/');
};
/**
 * Wrap API response for retrieving item list
 * itemList is cached automatically
 * @param {String} path
 * @returns {Promise<Item[]>}
 */
exports.getItemList = function (path) { return __awaiter(void 0, void 0, void 0, function () {
    var url, folderData, itemList, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                path = fixPath(path);
                if (cache.contains(path))
                    return [2 /*return*/, cache.get(path)];
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                url = buildFolderUrl(path);
                return [4 /*yield*/, fileClient.readFolder(url, { links: solid_file_client_1.default.LINKS.EXCLUDE })];
            case 2:
                folderData = _a.sent();
                itemList = __spreadArrays(folderData.files.map(function (item) { return new Item_1.FileItem(item.url); }), folderData.folders.map(function (item) { return new Item_1.FolderItem(item.url); }) // TODO: item.size
                );
                cache.add(path, itemList);
                return [2 /*return*/, itemList];
            case 3:
                err_1 = _a.sent();
                throw handleFetchError(err_1);
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.clearCacheForFolder = function (path) { return cache.remove(fixPath(path)); };
exports.clearCache = function () { return cache.clear(); };
/**
 * Wrap API response for retrieving file content
 */
exports.getFileBlob = function (path, filename) { return __awaiter(void 0, void 0, void 0, function () {
    var res, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                path = fixPath(path);
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, fileClient.get(buildFileUrl(path, filename))];
            case 2:
                res = _a.sent();
                return [2 /*return*/, res.blob()];
            case 3:
                err_2 = _a.sent();
                throw handleFetchError(err_2);
            case 4: return [2 /*return*/];
        }
    });
}); };
/**
 * Wrap API response for renaming a file
 */
exports.renameFile = function (path, fileName, newFileName) {
    path = fixPath(path);
    cache.remove(path);
    return fileClient.rename(buildFileUrl(path, fileName), newFileName)
        .then(function (res) { return Array.isArray(res) ? res[0] : res; })
        .catch(handleFetchError);
};
/**
 * Wrap API response for renaming a folder
 */
exports.renameFolder = function (path, folderName, newFolderName) {
    path = fixPath(path);
    cache.remove(path);
    return fileClient.rename(buildFolderUrl(path, folderName), newFolderName)
        .then(function (res) { return Array.isArray(res) ? res[0] : res; })
        .catch(handleFetchError);
};
/**
 * Wrap API response for creating a folder
 */
exports.createFolder = function (path, folderName) {
    path = fixPath(path);
    cache.remove(path);
    if (!(folderName || '').trim()) {
        return Promise.reject('Invalid folder name');
    }
    return fileClient.createFolder(buildFolderUrl(path, folderName), {
        merge: solid_file_client_1.default.MERGE.KEEP_TARGET
    })
        .catch(handleFetchError);
};
/**
 * Fetch API to remove one item
 */
function removeItem(path, itemName) {
    return __awaiter(this, void 0, void 0, function () {
        var url;
        return __generator(this, function (_a) {
            url = buildFileUrl(path, itemName);
            return [2 /*return*/, fileClient.delete(url)
                    .catch(function (err) {
                    if (err.status === 409 || err.status === 301) {
                        // Solid pod returns 409 if the item is a folder and is not empty
                        // Solid pod returns 301 if is attempted to read a folder url without '/' at the end (from buildFileUrl)
                        return fileClient.deleteFolderRecursively(buildFolderUrl(path, itemName));
                    }
                    else if (err.status === 404) {
                        // Don't throw if the item didn't exist
                        return err;
                    }
                    else
                        throw err;
                })];
        });
    });
}
exports.removeItem = removeItem;
/**
 * Wrap API response for removing a file or folder
 */
exports.removeItems = function (path, filenames) {
    path = fixPath(path);
    cache.remove(path);
    if (!filenames.length) {
        return Promise.reject('No files to remove');
    }
    return Promise.all(filenames.map(function (name) { return removeItem(path, name); }))
        .catch(handleFetchError);
};
/**
 * Wrap API response for moving a file or folder
 */
exports.moveItems = function (path, destination, filenames) {
    path = fixPath(path);
    destination = fixPath(destination);
    cache.remove(path, destination);
    if (!filenames.length) {
        return Promise.reject('No files to move');
    }
    return exports.copyItems(path, destination, filenames)
        .then(function (res) { return exports.removeItems(path, filenames); })
        .catch(handleFetchError);
};
/**
 * Wrap API response for copying a file or folder
 */
exports.copyItems = function (path, destination, filenames) { return __awaiter(void 0, void 0, void 0, function () {
    var items, promises;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                path = fixPath(path);
                destination = fixPath(destination);
                cache.remove(path, destination);
                if (!filenames.length) {
                    return [2 /*return*/, Promise.reject('No files to copy')];
                }
                return [4 /*yield*/, exports.getItemList(path)
                        .then(function (items) { return items.filter(function (_a) {
                        var name = _a.name;
                        return filenames.includes(name);
                    }); })];
            case 1:
                items = _a.sent();
                promises = items.map(function (item) { return item instanceof Item_1.FolderItem ?
                    fileClient.copyFolder(buildFolderUrl(path, item.name), buildFolderUrl(destination, name), {
                        withAcl: false,
                        withMeta: true,
                        createPath: true,
                        merge: solid_file_client_1.default.MERGE.KEEP_SOURCE
                    })
                    : fileClient.copyFile(buildFileUrl(path, item.name), buildFileUrl(destination, item.name), {
                        withAcl: false,
                        withMeta: true,
                        createPath: true,
                        merge: solid_file_client_1.default.MERGE.REPLACE
                    }); })
                    .flat(1);
                return [2 /*return*/, Promise.all(promises).catch(handleFetchError)];
        }
    });
}); };
/**
 * Wrap API response for uploading files
 */
exports.uploadFiles = function (path, fileList) { return __awaiter(void 0, void 0, void 0, function () {
    var promises;
    return __generator(this, function (_a) {
        path = fixPath(path);
        cache.remove(path);
        if (!fileList.length) {
            return [2 /*return*/, Promise.reject('No files to upload')];
        }
        promises = Array.from(fileList).map(function (file) {
            var contentType = file.type || contentTypes_1.guessContentType(file.name, file);
            return exports.updateFile(path, file.name, file, file.type);
        });
        return [2 /*return*/, Promise.all(promises).catch(handleFetchError)];
    });
}); };
/**
 * Wrap API response for uploading a file
 */
exports.updateFile = function (path, fileName, content, contentType) {
    path = fixPath(path);
    cache.remove(path);
    return fileClient.putFile(buildFileUrl(path, fileName), content, contentType)
        .catch(handleFetchError);
};
/**
 * Wrap API response for zipping multiple items
 */
exports.getAsZip = function (path, itemList) {
    path = fixPath(path);
    var zip = new jszip_1.default();
    return addItemsToZip(zip, path, itemList)
        .then(function () { return zip; });
};
/**
 * Add items to a zip object recursively
 */
var addItemsToZip = function (zip, path, itemList) {
    var promises = itemList.map(function (item) { return __awaiter(void 0, void 0, void 0, function () {
        var zipFolder, folderPath, folderItems, blob;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!(item instanceof Item_1.FolderItem)) return [3 /*break*/, 3];
                    zipFolder = zip.folder(item.name);
                    folderPath = path + "/" + item.name;
                    return [4 /*yield*/, exports.getItemList(folderPath)];
                case 1:
                    folderItems = _a.sent();
                    return [4 /*yield*/, addItemsToZip(zipFolder, folderPath, folderItems)];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 5];
                case 3:
                    if (!(item instanceof Item_1.FileItem)) return [3 /*break*/, 5];
                    return [4 /*yield*/, exports.getFileBlob(path, item.name)];
                case 4:
                    blob = _a.sent();
                    zip.file(item.name, blob, { binary: true });
                    _a.label = 5;
                case 5: return [2 /*return*/];
            }
        });
    }); });
    return Promise.all(promises);
};
/**
 * Wrap API response for extracting a zip archive
 */
exports.extractZipArchive = function (path, destination, fileName) {
    if (destination === void 0) { destination = path; }
    return __awaiter(void 0, void 0, void 0, function () {
        var blob, zip;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, exports.getFileBlob(path, fileName)];
                case 1:
                    blob = _a.sent();
                    return [4 /*yield*/, jszip_1.default.loadAsync(blob)];
                case 2:
                    zip = _a.sent();
                    return [2 /*return*/, uploadExtractedZipArchive(zip, destination)];
            }
        });
    });
};
/**
 * Recursively upload all files and folders from an extracted zip archive
 */
function uploadExtractedZipArchive(zip, destination, curFolder) {
    if (curFolder === void 0) { curFolder = ''; }
    return __awaiter(this, void 0, void 0, function () {
        var promises;
        var _this = this;
        return __generator(this, function (_a) {
            promises = getItemsInZipFolder(zip, curFolder)
                .map(function (item) { return __awaiter(_this, void 0, void 0, function () {
                var relativePath, itemName, path, blob, contentType, _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            relativePath = item.name;
                            itemName = getItemNameFromPath(relativePath);
                            path = getParentPathFromPath(destination + "/" + relativePath);
                            if (!item.dir) return [3 /*break*/, 3];
                            return [4 /*yield*/, exports.createFolder(path, itemName)];
                        case 1:
                            _b.sent();
                            return [4 /*yield*/, uploadExtractedZipArchive(zip, destination, relativePath)];
                        case 2:
                            _b.sent();
                            return [3 /*break*/, 9];
                        case 3: return [4 /*yield*/, item.async('blob')];
                        case 4:
                            blob = _b.sent();
                            if (!blob.type) return [3 /*break*/, 5];
                            _a = blob.type;
                            return [3 /*break*/, 7];
                        case 5: return [4 /*yield*/, contentTypes_1.guessContentType(item.name, blob)];
                        case 6:
                            _a = _b.sent();
                            _b.label = 7;
                        case 7:
                            contentType = _a;
                            return [4 /*yield*/, exports.updateFile(path, itemName, blob, contentType)];
                        case 8:
                            _b.sent();
                            _b.label = 9;
                        case 9: return [2 /*return*/];
                    }
                });
            }); });
            return [2 /*return*/, Promise.all(promises)];
        });
    });
}
;
function getItemsInZipFolder(zip, folderPath) {
    return Object.keys(zip.files)
        .filter(function (fileName) {
        // Only items in the current folder and subfolders
        var relativePath = fileName.slice(folderPath.length, fileName.length);
        if (!relativePath || fileName.slice(0, folderPath.length) !== folderPath)
            return false;
        // No items from subfolders
        if (relativePath.includes('/') && relativePath.slice(0, -1).includes('/'))
            return false;
        return true;
    })
        .map(function (key) { return zip.files[key]; });
}
;
function getItemNameFromPath(path) {
    path = path.endsWith('/') ? path.slice(0, -1) : path;
    return path.substr(path.lastIndexOf('/') + 1);
}
function getParentPathFromPath(path) {
    path = path.endsWith('/') ? path.slice(0, -1) : path;
    path = path.substr(0, path.lastIndexOf('/'));
    return path;
}
/**
 * Build up an url from a path relative to the storage location and a folder name
 */
function buildFolderUrl(path, folderName) {
    return buildFileUrl(path, folderName) + '/';
}
/**
 * Build up an url from a path relative to the storage location and a fileName
 */
function buildFileUrl(path, fileName) {
    var url = "" + config_1.default.getHost() + path + "/" + (fileName || '');
    while (url.slice(-1) === '/')
        url = url.slice(0, -1);
    return url;
}
