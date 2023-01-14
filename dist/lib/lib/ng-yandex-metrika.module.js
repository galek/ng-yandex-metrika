var YandexMetricModule_1;
import { __decorate } from "tslib";
import { APP_INITIALIZER, Injector, NgModule, PLATFORM_ID } from '@angular/core';
import { YandexMetric } from './ng-yandex-metrika.service';
import { appInitializerFactory, countersFactory, defaultCounterIdFactory, } from './ng-yandex-metrika-config-factories';
import { DEFAULT_COUNTER_ID, DEFAULT_COUNTER_ID_AOT, YANDEX_COUNTERS_CONFIGS, YANDEX_COUNTERS_CONFIGS_AOT } from "./common/constants.service";
let YandexMetricModule = YandexMetricModule_1 = class YandexMetricModule {
    static forRoot(configs, defaultCounterId) {
        return {
            ngModule: YandexMetricModule_1,
            providers: [
                {
                    provide: DEFAULT_COUNTER_ID_AOT,
                    useValue: defaultCounterId,
                },
                {
                    provide: YANDEX_COUNTERS_CONFIGS_AOT,
                    useValue: configs,
                },
                {
                    provide: DEFAULT_COUNTER_ID,
                    useFactory: defaultCounterIdFactory,
                    deps: [YANDEX_COUNTERS_CONFIGS_AOT, DEFAULT_COUNTER_ID_AOT],
                },
                {
                    provide: YANDEX_COUNTERS_CONFIGS,
                    useFactory: countersFactory,
                    deps: [YANDEX_COUNTERS_CONFIGS_AOT],
                },
                {
                    provide: APP_INITIALIZER,
                    useFactory: appInitializerFactory,
                    deps: [YANDEX_COUNTERS_CONFIGS, PLATFORM_ID],
                    multi: true,
                },
                {
                    provide: YandexMetric,
                    useClass: YandexMetric,
                    deps: [Injector, PLATFORM_ID],
                }
            ],
        };
    }
};
YandexMetricModule = YandexMetricModule_1 = __decorate([
    NgModule({})
], YandexMetricModule);
export { YandexMetricModule };
//# sourceMappingURL=ng-yandex-metrika.module.js.map