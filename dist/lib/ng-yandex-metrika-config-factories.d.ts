import { CounterConfig } from "./common/interfaces/counterConfig.interface";
import { YandexCounterConfig } from "./yandexCounterConfig.service";
export declare const defaultCounterIdFactory: (counterConfigs: CounterConfig | CounterConfig[], defaultCounter?: string) => string;
export declare const countersFactory: (configs: CounterConfig | CounterConfig[]) => (YandexCounterConfig & CounterConfig)[];
export declare const appInitializerFactory: (counterConfigs: YandexCounterConfig[], platformId: any) => any;
