"use strict";
exports.__esModule = true;
exports.appInitializerFactory = exports.countersFactory = exports.defaultCounterIdFactory = void 0;
var common_1 = require("@angular/common");
var yandexCounterConfig_service_1 = require("./yandexCounterConfig.service");
var shared_utils_1 = require("./common/shared.utils");
var defaultCounterIdFactory = function (counterConfigs, defaultCounter) {
    return defineDefaultId(counterConfigs, defaultCounter);
};
exports.defaultCounterIdFactory = defaultCounterIdFactory;
var defineDefaultId = function (counterConfigs, defaultCounter) {
    var configs = getCounterConfigArray(counterConfigs);
    var defaultId;
    if (!defaultCounter) {
        defaultId = configs[0].id;
    }
    else if (typeof defaultCounter === 'number' && defaultCounter < configs.length) {
        defaultId = configs[defaultCounter].id;
    }
    else {
        defaultId = defaultCounter;
    }
    if (!defaultId) {
        console.warn('[YandexMetric] You provided wrong counter id as a default:', defaultCounter);
        return null;
    }
    var defaultCounterExists = false;
    for (var _i = 0, configs_1 = configs; _i < configs_1.length; _i++) {
        var config = configs_1[_i];
        if (!config) {
            console.warn("[YandexMetric] Invalid element of array configs");
            continue;
        }
        if (!config.id) {
            console.warn('[YandexMetric] You should provide counter id to use YandexMetric counter', config);
            continue;
        }
        if (config.id === defaultId) {
            defaultCounterExists = true;
        }
    }
    if (!defaultCounterExists) {
        console.warn('[YandexMetric] You provided wrong counter id as a default:', defaultCounter);
    }
    return defaultId;
};
var countersFactory = function (configs) {
    return createConfigs(configs);
};
exports.countersFactory = countersFactory;
var createConfigs = function (configs) {
    return getCounterConfigArray(configs).map(function (config) { return new yandexCounterConfig_service_1.YandexCounterConfig(config); });
};
/*
* Convert configs to ConfigArray
* */
var getCounterConfigArray = function (configs) {
    var counterConfigs = !Array.isArray(configs) ? [configs] : configs;
    return counterConfigs;
};
var appInitializerFactory = function (counterConfigs, platformId) {
    if ((0, common_1.isPlatformBrowser)(platformId)) {
        return shared_utils_1.insertYandexMetric.bind(null, counterConfigs);
    }
    return function () { return 'none'; };
};
exports.appInitializerFactory = appInitializerFactory;
