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
exports.getHumanFileSize = exports.FolderItem = exports.FileItem = exports.Item = void 0;
/**
 * Class for an arbitrary item from a solid pod
 */
var Item = /** @class */ (function () {
    function Item(url, size) {
        var path = getPathFromUrl(url);
        this._name = path.pop() || '';
        this._path = path;
        this._url = url;
        this._size = size;
    }
    Object.defineProperty(Item.prototype, "name", {
        // Make properties readonly
        get: function () { return this._name; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Item.prototype, "path", {
        get: function () { return this._path; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Item.prototype, "url", {
        get: function () { return this._url; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Item.prototype, "size", {
        get: function () { return this._size; },
        enumerable: false,
        configurable: true
    });
    Item.prototype.equals = function (item) {
        return this.name === item.name
            && this.path.length === item.path.length
            && this.path.every(function (val, index) { return val === item.path[index]; });
    };
    Item.prototype.getDisplayName = function () {
        return decodeURI(this.name);
    };
    Item.prototype.getDisplaySize = function () {
        return this._size ? exports.getHumanFileSize(this._size) : 'Unknown size';
    };
    return Item;
}());
exports.Item = Item;
var FileItem = /** @class */ (function (_super) {
    __extends(FileItem, _super);
    function FileItem() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FileItem.prototype.isImage = function () {
        return patterns.image.test(this.name);
    };
    FileItem.prototype.isMedia = function () {
        return patterns.media.test(this.name);
    };
    FileItem.prototype.isEditable = function () {
        return patterns.editable.test(this.name);
    };
    FileItem.prototype.isExtractable = function () {
        return patterns.extractable.test(this.name);
    };
    FileItem.prototype.isVideo = function () {
        return patterns.video.test(this.name);
    };
    return FileItem;
}(Item));
exports.FileItem = FileItem;
var FolderItem = /** @class */ (function (_super) {
    __extends(FolderItem, _super);
    function FolderItem() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return FolderItem;
}(Item));
exports.FolderItem = FolderItem;
// regex patterns for testing if a file is of a specific type
var patterns = {
    editable: /\.(txt|diff?|patch|svg|asc|cnf|cfg|conf|html?|cfm|cgi|aspx?|ini|pl|py|md|css|cs|jsx?|jsp|log|htaccess|htpasswd|gitignore|gitattributes|env|json|atom|eml|rss|markdown|sql|xml|xslt?|sh|rb|as|bat|cmd|cob|for|ftn|frm|frx|inc|lisp|scm|coffee|php[3-6]?|java|c|cbl|go|h|scala|vb|tmpl|lock|go|yml|yaml|tsv|lst|ttl)$/i,
    image: /\.(jpe?g|gif|bmp|png|svg|tiff?)$/i,
    media: /\.(mp3|ogg|wav|mp4|webm)$/i,
    video: /\.(mp4|webm|ogg)$/i,
    extractable: /\.(zip)$/i
};
/**
 * Calculate file size by bytes in human readable format
 */
exports.getHumanFileSize = function (byteString) {
    var bytes = typeof byteString === 'string' ?
        parseInt(byteString)
        : byteString;
    var e = (Math.log(bytes) / Math.log(1e3)) | 0;
    return +(bytes / Math.pow(1e3, e)).toFixed(2) + ' ' + ('kMGTPEZY'[e - 1] || '') + 'B';
};
/**
 * Get path including the last element (e.g. [public, test, index.html])
 */
var getPathFromUrl = function (urlString) {
    var url = new URL(urlString);
    return url.pathname.split('/').filter(function (val) { return val !== ''; });
};
