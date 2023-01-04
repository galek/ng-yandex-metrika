import {CounterConfig} from "./common/interfaces/counterConfig.interface";
import {stringOrNumber} from "./common/constants.service";

export class YandexCounterConfig implements CounterConfig {
  id: stringOrNumber;
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
