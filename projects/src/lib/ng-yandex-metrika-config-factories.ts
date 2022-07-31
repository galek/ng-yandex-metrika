// FIXME: Nick: deprecated
// declare var Ya: any;

import { isPlatformBrowser } from '@angular/common';

import { CounterConfig, stringOrNumber, YandexCounterConfig } from './ng-yandex-metrika.config';

export const defaultCounterIdFactory = (counterConfigs: CounterConfig | CounterConfig[], defaultCounter?: stringOrNumber) => {
  return defineDefaultId(counterConfigs, defaultCounter);
}

export const defineDefaultId = (counterConfigs: CounterConfig | CounterConfig[], defaultCounter?: stringOrNumber):  stringOrNumber | null => {
  let configs: CounterConfig[];
  if (counterConfigs instanceof Array) {
    configs = counterConfigs;
  } else {
    configs = [counterConfigs as CounterConfig];
  }
  let defaultId: stringOrNumber;

  if (!defaultCounter) {
    defaultId = configs[0].id;
  } else if (typeof defaultCounter === 'number' && defaultCounter < configs.length) {
    defaultId = configs[defaultCounter].id;
  } else {
    defaultId = defaultCounter;
  }

  if (!defaultId) {
    console.warn('You provided wrong counter id as a default:', defaultCounter);
    return null;
  }

  let defaultCounterExists = false;
  for (const config of configs) {
    if (!config) {
      console.warn(`[Yandex-Metrika] Invalid element of array`);
      continue;
    }

    if (!config.id) {
      console.warn('[Yandex-Metrika] You should provide counter id to use Yandex Metrika counter', config);
      continue;
    }

    if (config.id === defaultId) {
      defaultCounterExists = true;
    }
  }

  if (!defaultCounterExists) {
    console.warn('You provided wrong counter id as a default:', defaultCounter);
  }
  return defaultId;
}

export const countersFactory = (configs: CounterConfig | CounterConfig[]) => {
  return createConfigs(configs);
}

export const createConfigs = (configs: CounterConfig | CounterConfig[]) => {
  let counterConfigs: CounterConfig[];
  if (configs instanceof Array) {
    counterConfigs = configs;
  } else {
    counterConfigs = [configs as CounterConfig];
  }
  return counterConfigs.map((config: CounterConfig) => Object.assign(new YandexCounterConfig(), config));
}

export const appInitializerFactory = (counterConfigs: YandexCounterConfig[], platformId: any) => {
  if (isPlatformBrowser(platformId)) {
    return insertMetrika.bind(null, counterConfigs);
  }

  return () => 'none';
}

export const insertMetrika = (counterConfigs: YandexCounterConfig[]) => {
  const name = 'yandex_metrika_callbacks2';
  window[name] = window[name] || [];
  window[name].push(() => {
    try {
      for (const config of counterConfigs) {
        createCounter(config);
      }
    } catch (e) {
    }
  });

  const n = document.getElementsByTagName('script')[0];
  const s = document.createElement('script');
  s.type = 'text/javascript';
  s.async = true;

  const alternative = counterConfigs.find(config => config.alternative);

  if (alternative) {
    s.src = 'https://cdn.jsdelivr.net/npm/yandex-metrica-watch/tag.js';
  } else {
    s.src = 'https://mc.yandex.ru/metrika/tag.js';
  }

  const insetScriptTag = () => n.parentNode.insertBefore(s, n);

  if ((window as any).opera === '[object Opera]') {
    document.addEventListener('DOMContentLoaded', insetScriptTag, false);
  } else {
    insetScriptTag();
  }
  return name;
}

export const createCounter = (config: YandexCounterConfig) => {
  window[getCounterNameById(config.id)] = new Ya.Metrika2(config);
}

export const getCounterNameById = (id: stringOrNumber) => {
  return `yaCounter${id}`;
}
