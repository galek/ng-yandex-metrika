import {CounterConfig} from "./common/interfaces/counterConfig.interface";
import {isPlatformBrowser} from '@angular/common';
import {stringOrNumber} from "./common/constants.service";
import {YandexCounterConfig} from "./yandexCounterConfig.service";
import {insertYandexMetric} from "./common/shared.utils";

export const defaultCounterIdFactory = (counterConfigs: CounterConfig | CounterConfig[], defaultCounter?: stringOrNumber) => {
  return defineDefaultId(counterConfigs, defaultCounter);
}

export const defineDefaultId = (counterConfigs: CounterConfig | CounterConfig[], defaultCounter?: stringOrNumber): stringOrNumber | null => {
  const configs: CounterConfig[] = getCounterConfigArray(counterConfigs);

  let defaultId: stringOrNumber;

  if (!defaultCounter) {
    defaultId = configs[0].id;
  } else if (typeof defaultCounter === 'number' && defaultCounter < configs.length) {
    defaultId = configs[defaultCounter].id;
  } else {
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
}

export const countersFactory = (configs: CounterConfig | CounterConfig[]) => {
  return createConfigs(configs);
}

export const createConfigs = (configs: CounterConfig | CounterConfig[]) => {
  return getCounterConfigArray(configs).map((config: CounterConfig) => Object.assign(new YandexCounterConfig(), config));
}

/*
* Convert configs to ConfigArray
* */
export const getCounterConfigArray = (configs: CounterConfig | CounterConfig[]) => {
  const counterConfigs: CounterConfig[] = !Array.isArray(configs) ? [configs as CounterConfig] : configs;
  return counterConfigs;
}

export const appInitializerFactory = (counterConfigs: YandexCounterConfig[], platformId: any) => {
  if (isPlatformBrowser(platformId)) {
    return insertYandexMetric.bind(null, counterConfigs);
  }

  return () => 'none';
}
