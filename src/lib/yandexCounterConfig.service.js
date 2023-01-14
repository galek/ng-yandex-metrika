"use strict";
exports.__esModule = true;
exports.YandexCounterConfig = void 0;
var YandexCounterConfig = /** @class */ (function () {
    function YandexCounterConfig(cfg) {
        var _a, _b, _c, _d, _e, _f;
        this.clickmap = true;
        this.trackLinks = true;
        this.accurateTrackBounce = true;
        this.webvisor = false;
        this.trackHash = true;
        this.ut = 'noindex';
        this.id = cfg.id;
        this.params = cfg.params;
        this.clickmap = (_a = cfg.clickmap) !== null && _a !== void 0 ? _a : true;
        this.trackLinks = (_b = cfg.trackLinks) !== null && _b !== void 0 ? _b : true;
        this.accurateTrackBounce = (_c = cfg.accurateTrackBounce) !== null && _c !== void 0 ? _c : true;
        this.webvisor = (_d = cfg.webvisor) !== null && _d !== void 0 ? _d : false;
        this.trackHash = (_e = cfg.trackHash) !== null && _e !== void 0 ? _e : true;
        this.ut = (_f = cfg.ut) !== null && _f !== void 0 ? _f : 'noindex';
        this.ecommerce = cfg.ecommerce;
        this.triggerEvent = cfg.triggerEvent;
        this.alternative = cfg.alternative;
    }
    return YandexCounterConfig;
}());
exports.YandexCounterConfig = YandexCounterConfig;
