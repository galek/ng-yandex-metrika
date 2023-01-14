"use strict";
exports.__esModule = true;
exports.insertYandexMetric = exports.UtilsCreateCounter = exports.isExist = exports.UtilsGetCounterNameById = void 0;
var UtilsGetCounterNameById = function (id) {
    return "yaCounter".concat(id);
};
exports.UtilsGetCounterNameById = UtilsGetCounterNameById;
var isExist = function (obj) {
    return obj !== null && obj !== undefined;
};
exports.isExist = isExist;
var UtilsCreateCounter = function (config) {
    if (!exports.Ya) {
        console.error("[Yandex.Metric] not exist 3DParty script");
        return null;
    }
    var ptr = new exports.Ya.Metrika2(config);
    var keyName = (0, exports.UtilsGetCounterNameById)(config.id);
    window[keyName] = ptr;
    return ptr;
};
exports.UtilsCreateCounter = UtilsCreateCounter;
var insertYandexMetric = function (counterConfigs) {
    var name = 'yandex_metrika_callbacks2';
    window[name] = window[name] || [];
    window[name].push(function () {
        try {
            for (var _i = 0, counterConfigs_1 = counterConfigs; _i < counterConfigs_1.length; _i++) {
                var config = counterConfigs_1[_i];
                if (!config) {
                    console.error("[insertYandexMetric] not exist config in counterConfigs");
                    continue;
                }
                (0, exports.UtilsCreateCounter)(config);
            }
        }
        catch (e) {
        }
    });
    var n = document.getElementsByTagName('script')[0];
    var s = document.createElement('script');
    s.type = 'text/javascript';
    s.async = true;
    var alternative = counterConfigs.find(function (config) { return config.alternative; });
    if (alternative) {
        s.src = 'https://cdn.jsdelivr.net/npm/yandex-metrica-watch/tag.js';
    }
    else {
        s.src = 'https://mc.yandex.ru/metrika/tag.js';
    }
    var insetScriptTag = function () {
        if (!(n === null || n === void 0 ? void 0 : n.parentNode)) {
            console.error("[YandexMetric.insetScriptTag] not exist parentNode");
            return;
        }
        n.parentNode.insertBefore(s, n);
    };
    if ((window === null || window === void 0 ? void 0 : window.opera) === '[object Opera]') {
        document.addEventListener('DOMContentLoaded', insetScriptTag, false);
    }
    else {
        insetScriptTag();
    }
    return name;
};
exports.insertYandexMetric = insertYandexMetric;
