import { InjectionToken } from '@angular/core';

export const DEFAULT_COUNTER_ID_AOT = new InjectionToken<stringOrNumber>('DEFAULT_COUNTER_ID_AOT');
export const DEFAULT_COUNTER_ID = new InjectionToken<stringOrNumber>('DEFAULT_COUNTER_ID');
export const YANDEX_COUNTERS_CONFIGS_AOT = new InjectionToken<YandexCounterConfig[]>('YANDEX_COUNTERS_CONFIGS_AOT');
export const YANDEX_COUNTERS_CONFIGS = new InjectionToken<YandexCounterConfig[]>('YANDEX_COUNTERS_CONFIGS');

export type stringOrNumber = string | number;

export interface CounterPosition {
  counterPosition: number;
}

// TODO: implement strong typization
export interface UserIdCounterPositionInterface extends CounterPosition {
  userId: string;
}

export interface ParamsCounterPositionInterface<T1>  extends CounterPosition {
  params: T1;
}

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

export class YandexCounterConfig  implements CounterConfig {
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
