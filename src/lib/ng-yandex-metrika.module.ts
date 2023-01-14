import {APP_INITIALIZER, Injector, ModuleWithProviders, NgModule, PLATFORM_ID} from '@angular/core';

import {YandexMetric} from './ng-yandex-metrika.service';
import {appInitializerFactory, countersFactory, defaultCounterIdFactory,} from './ng-yandex-metrika-config-factories';
import {CounterConfig} from "./common/interfaces/counterConfig.interface";
import {
  DEFAULT_COUNTER_ID,
  DEFAULT_COUNTER_ID_AOT,
  YANDEX_COUNTERS_CONFIGS,
  YANDEX_COUNTERS_CONFIGS_AOT
} from "./common/constants.service";

@NgModule({})
export class YandexMetricModule {
  static forRoot(configs: CounterConfig | CounterConfig[], defaultCounterId?: string): ModuleWithProviders<YandexMetricModule> {
    return {
      ngModule: YandexMetricModule,
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
}
