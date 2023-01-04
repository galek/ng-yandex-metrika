import {stringOrNumber} from "../constants.service";

export interface CounterConfig {
  id: stringOrNumber;
  params?: any;
  clickmap?: boolean;
  trackLinks?: boolean;
  accurateTrackBounce?: boolean;
  webvisor?: boolean;
  trackHash?: boolean;
  ut?: string;
  ecommerce?: string;
  triggerEvent?: boolean;
  alternative?: boolean;
}
