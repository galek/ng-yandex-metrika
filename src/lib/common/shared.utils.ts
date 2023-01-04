import {YandexCounterConfig} from "../yandexCounterConfig.service";

export declare var Ya: any;

export const UtilsGetCounterNameById = (id: string) => {
  return `yaCounter${id}`;
}

export const UtilsCreateCounter = (config: YandexCounterConfig) => {
  if (!Ya) {
    console.error(`[Yandex.Metric] not exist 3DParty script`);
    return null;
  }
  window[UtilsGetCounterNameById(config.id)] = new Ya.Metrika2(config);
}

export const insertYandexMetric = (counterConfigs: YandexCounterConfig[]) => {
  const name = 'yandex_metrika_callbacks2';
  window[name] = window[name] || [];
  window[name].push(() => {
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

  const insetScriptTag = () => n.parentNode.insertBefore(s, n);

  if ((window as any)?.opera === '[object Opera]') {
    document.addEventListener('DOMContentLoaded', insetScriptTag, false);
  } else {
    insetScriptTag();
  }
  return name;
}
