import { ModuleWithProviders } from '@angular/core';
import { CounterConfig } from "./common/interfaces/counterConfig.interface";
export declare class YandexMetricModule {
    static forRoot(configs: CounterConfig | CounterConfig[], defaultCounterId?: string): ModuleWithProviders<YandexMetricModule>;
}
