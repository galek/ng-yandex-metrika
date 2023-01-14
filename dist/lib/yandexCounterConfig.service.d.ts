import { CounterConfig } from "./common/interfaces/counterConfig.interface";
export declare class YandexCounterConfig implements CounterConfig {
    id: string;
    params: any;
    clickmap: boolean;
    trackLinks: boolean;
    accurateTrackBounce: boolean;
    webvisor: boolean;
    trackHash: boolean;
    ut: string;
    ecommerce?: string;
    triggerEvent?: boolean;
    alternative?: boolean;
    constructor(cfg: CounterConfig);
}
