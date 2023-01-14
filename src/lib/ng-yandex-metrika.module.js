"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.YandexMetricModule = void 0;
var core_1 = require("@angular/core");
var ng_yandex_metrika_service_1 = require("./ng-yandex-metrika.service");
var ng_yandex_metrika_config_factories_1 = require("./ng-yandex-metrika-config-factories");
var constants_service_1 = require("./common/constants.service");
var YandexMetricModule = /** @class */ (function () {
    function YandexMetricModule() {
    }
    YandexMetricModule_1 = YandexMetricModule;
    YandexMetricModule.forRoot = function (configs, defaultCounterId) {
        return {
            ngModule: YandexMetricModule_1,
            providers: [
                {
                    provide: constants_service_1.DEFAULT_COUNTER_ID_AOT,
                    useValue: defaultCounterId
                },
                {
                    provide: constants_service_1.YANDEX_COUNTERS_CONFIGS_AOT,
                    useValue: configs
                },
                {
                    provide: constants_service_1.DEFAULT_COUNTER_ID,
                    useFactory: ng_yandex_metrika_config_factories_1.defaultCounterIdFactory,
                    deps: [constants_service_1.YANDEX_COUNTERS_CONFIGS_AOT, constants_service_1.DEFAULT_COUNTER_ID_AOT]
                },
                {
                    provide: constants_service_1.YANDEX_COUNTERS_CONFIGS,
                    useFactory: ng_yandex_metrika_config_factories_1.countersFactory,
                    deps: [constants_service_1.YANDEX_COUNTERS_CONFIGS_AOT]
                },
                {
                    provide: core_1.APP_INITIALIZER,
                    useFactory: ng_yandex_metrika_config_factories_1.appInitializerFactory,
                    deps: [constants_service_1.YANDEX_COUNTERS_CONFIGS, core_1.PLATFORM_ID],
                    multi: true
                },
                {
                    provide: ng_yandex_metrika_service_1.YandexMetric,
                    useClass: ng_yandex_metrika_service_1.YandexMetric,
                    deps: [core_1.Injector, core_1.PLATFORM_ID]
                }
            ]
        };
    };
    var YandexMetricModule_1;
    YandexMetricModule = YandexMetricModule_1 = __decorate([
        (0, core_1.NgModule)({})
    ], YandexMetricModule);
    return YandexMetricModule;
}());
exports.YandexMetricModule = YandexMetricModule;
