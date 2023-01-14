import {YandexCounterConfig} from "../yandexCounterConfig.service";

export declare var Ya: any;

export const UtilsGetCounterNameById = (id: string): string => {
  return `yaCounter${id}`;
}

export const isExist = <T>(obj: T) => {
  return obj !== null && obj !== undefined;
}

export const UtilsCreateCounter = (config: YandexCounterConfig) => {
  if (!Ya) {
    console.error(`[Yandex.Metric] not exist 3DParty script`);
    return null;
  }

  const ptr = new Ya.Metrika2(config);
  const keyName = UtilsGetCounterNameById(config.id);
  (window as any)[keyName] = ptr;

  return ptr;
}

export const insertYandexMetric = (counterConfigs: YandexCounterConfig[]) => {
  const name: string = 'yandex_metrika_callbacks2';
  (window as any)[name] = (window as any)[name] || [];
  (window as any)[name].push(() => {
    try {
      for (const config of counterConfigs) {
        if (!config) {
          console.error(`[insertYandexMetric] not exist config in counterConfigs`);
          continue;
        }

        UtilsCreateCounter(config);
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

  const insetScriptTag = () => {
    if (!n?.parentNode) {
      console.error(`[YandexMetric.insetScriptTag] not exist parentNode`);
      return;
    }

    n.parentNode.insertBefore(s, n);
  };

  if ((window as any)?.opera === '[object Opera]') {
    document.addEventListener('DOMContentLoaded', insetScriptTag, false);
  } else {
    insetScriptTag();
  }
  return name;
}
