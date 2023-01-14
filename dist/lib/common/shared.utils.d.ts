import { YandexCounterConfig } from "../yandexCounterConfig.service";
export declare var Ya: any;
export declare const UtilsGetCounterNameById: (id: string) => string;
export declare const isExist: <T>(obj: T) => boolean;
export declare const UtilsCreateCounter: (config: YandexCounterConfig) => any;
export declare const insertYandexMetric: (counterConfigs: YandexCounterConfig[]) => string;
