import { isPlatformBrowser } from '@angular/common';
import { YandexCounterConfig } from "./yandexCounterConfig.service";
import { insertYandexMetric } from "./common/shared.utils";
export const defaultCounterIdFactory = (counterConfigs, defaultCounter) => {
    return defineDefaultId(counterConfigs, defaultCounter);
};
const defineDefaultId = (counterConfigs, defaultCounter) => {
    const configs = getCounterConfigArray(counterConfigs);
    let defaultId;
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
    let defaultCounterExists = false;
    for (const config of configs) {
        if (!config) {
            console.warn(`[YandexMetric] Invalid element of array configs`);
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
export const countersFactory = (configs) => {
    return createConfigs(configs);
};
const createConfigs = (configs) => {
    return getCounterConfigArray(configs).map((config) => new YandexCounterConfig(config));
};
/*
* Convert configs to ConfigArray
* */
const getCounterConfigArray = (configs) => {
    const counterConfigs = !Array.isArray(configs) ? [configs] : configs;
    return counterConfigs;
};
export const appInitializerFactory = (counterConfigs, platformId) => {
    if (isPlatformBrowser(platformId)) {
        return insertYandexMetric.bind(null, counterConfigs);
    }
    return () => 'none';
};
//# sourceMappingURL=ng-yandex-metrika-config-factories.js.map