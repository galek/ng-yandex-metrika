import {CounterConfig} from "./common/interfaces/counterConfig.interface";

export class YandexCounterConfig implements CounterConfig {
  id: string;
  params: any;
  clickmap = true;
  trackLinks = true;
  accurateTrackBounce = true;
  webvisor = false;
  trackHash = true;
  ut = 'noindex';
  ecommerce?: string;
  triggerEvent?: boolean;
  alternative?: boolean;
}
