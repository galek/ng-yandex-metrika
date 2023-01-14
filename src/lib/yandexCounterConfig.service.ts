import {CounterConfig} from "./common/interfaces/counterConfig.interface";
import {isExist} from "./common";

export class YandexCounterConfig implements CounterConfig {
  id: string;
  params: any;
  clickmap: boolean = true;
  trackLinks: boolean = true;
  accurateTrackBounce: boolean = true;
  webvisor: boolean = false;
  trackHash: boolean = true;
  ut = 'noindex';

  ecommerce?: string;
  triggerEvent?: boolean;
  alternative?: boolean;

  constructor(cfg: CounterConfig) {
    this.id = cfg.id;
    this.params = cfg.params;

    this.clickmap = cfg.clickmap ?? true;
    this.trackLinks = cfg.trackLinks ?? true;
    this.accurateTrackBounce = cfg.accurateTrackBounce ?? true;
    this.webvisor = cfg.webvisor ?? false;
    this.trackHash = cfg.trackHash ?? true;

    this.ut = cfg.ut ?? 'noindex';

    this.ecommerce = cfg.ecommerce;
    this.triggerEvent = cfg.triggerEvent;
    this.alternative = cfg.alternative;
  }
}
