import {InjectionToken} from '@angular/core';
import {YandexCounterConfig} from "../yandexCounterConfig.service";

export const DEFAULT_COUNTER_ID_AOT = new InjectionToken<string>('DEFAULT_COUNTER_ID_AOT');
export const DEFAULT_COUNTER_ID = new InjectionToken<string>('DEFAULT_COUNTER_ID');
export const YANDEX_COUNTERS_CONFIGS_AOT = new InjectionToken<YandexCounterConfig[]>('YANDEX_COUNTERS_CONFIGS_AOT');
export const YANDEX_COUNTERS_CONFIGS = new InjectionToken<YandexCounterConfig[]>('YANDEX_COUNTERS_CONFIGS');

