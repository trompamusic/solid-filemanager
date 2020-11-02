"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ApiCache = /** @class */ (function () {
    function ApiCache() {
        this._data = {};
    }
    /**
     * Add data to the cache
     */
    ApiCache.prototype.add = function (path, itemList) {
        this._data[path] = itemList;
        return itemList;
    };
    /**
     * Return true if the url is already cached
     */
    ApiCache.prototype.contains = function (path) {
        return this._data.hasOwnProperty(path);
    };
    /**
     * Get the cached data
     */
    ApiCache.prototype.get = function (path) {
        return this._data[path];
    };
    /**
     * Remove paths from the cache
     */
    ApiCache.prototype.remove = function () {
        var _this = this;
        var paths = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            paths[_i] = arguments[_i];
        }
        paths.filter(function (path) { return _this.contains(path); })
            .forEach(function (path) { return delete _this._data[path]; });
    };
    /**
     * Clear the whole cache
     */
    ApiCache.prototype.clear = function () {
        this._data = {};
    };
    return ApiCache;
}());
exports.default = ApiCache;
