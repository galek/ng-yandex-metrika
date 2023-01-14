import {Injectable, Injector} from '@angular/core';

import {CommonOptions} from "./common/interfaces/commonOptions.interface";
import {HitOptions} from "./common/interfaces/hitOptions.interface";
import {CallbackOptions} from "./common/interfaces/callbackOptions.interface";
import {DEFAULT_COUNTER_ID, YANDEX_COUNTERS_CONFIGS} from "./common/constants.service";
import {YandexCounterConfig} from "./yandexCounterConfig.service";
import {UtilsCreateCounter, UtilsGetCounterNameById} from "./common/shared.utils";
import {UserIdCounterPositionInterface} from "./common/interfaces/userIdCounterPosition.interface";
import {ParamsCounterPositionInterface} from "./common/interfaces/paramsCounterPosition.interface";
import {CounterPosition} from "./common/interfaces/counterPosition.interface";

@Injectable({
  providedIn: 'root'
})
export class YandexMetric {
  private readonly defaultCounterId: string;
  private readonly positionToId: Array<string>;
  private counterConfigs: YandexCounterConfig[];

  constructor(readonly injector: Injector) {
    this.defaultCounterId = injector.get<string>(DEFAULT_COUNTER_ID);
    this.counterConfigs = injector.get<YandexCounterConfig[]>(YANDEX_COUNTERS_CONFIGS);
    this.positionToId = this.counterConfigs.map(config => config.id);
  }

  static getCounterById(id: string) {
    if (!window) {
      console.error(`[YandexMetric.getCounterById] not exist ptr to window`);
      return null;
    }

    const counterName: string = UtilsGetCounterNameById(id);
    if (!(counterName?.length > 0)) {
      console.error(`[YandexMetric.getCounterById] not exist YandexMetric.getCounterNameById with id: ${id}`);
      return null;
    }

    const ptr = (window as any)[counterName];
    if (!ptr) {
      console.error(`[YandexMetric.getCounterById] not exist window[YandexMetric.getCounterNameById] with id: ${id}`);
      return null;
    }

    return ptr;
  }

  static createCounter(config: YandexCounterConfig) {
    return UtilsCreateCounter(config);
  }

  static getCounterNameById(id: string) {
    return UtilsGetCounterNameById(id);
  }

  async extLink<T>(url: string, options: CommonOptions<T> | null = null, _counterPosition?: number): Promise<any> {
    let counter = null;

    if (_counterPosition !== null && _counterPosition !== undefined) {
      counter = await this.counterIsLoaded(_counterPosition);
    }
    if (!counter) {
      console.error(`[YandexMetric.extLink] counter ptr is not exist. For url: ${url}`);
      return null;
    }

    // Обращаемся к Ya.extLink
    await counter.extLink(url, options);

    return this.getCallbackPromise(options, url);
  }

  /*
  * YandexMetric function params:
  ** url - string
  ** options:
  *** - callback - Function
  *** - ctx - Object of context (this)
  *** - referer String
  *** - title String
  *** - params Object
  **** - order_price Number
  **** - currency String
  * https://yandex.ru/support/metrica/objects/file.html
  * */
  async file<T>(url: string, options: HitOptions<T> | null = null, _counterPosition: number): Promise<any> {
    if (!options) {
      console.error(`[YandexMetric.file] options ptr is not exist. For _counterPosition: ${_counterPosition}`);
      return null;
    }

    const counter = await this.counterIsLoaded(_counterPosition);
    if (!counter) {
      console.error(`[YandexMetric.file] counter ptr is not exist. For url: ${url}`);
      return null;
    }

    // Обращаемся к Ya.file
    await counter.file(url, options);

    return this.getCallbackPromise(options, url);
  }

  getClientID(_counterPosition: number): string {
    const counter = this.getCounterByPosition(_counterPosition);
    if (counter && counter.reachGoal) {
      return counter.getClientID();
    }

    console.warn('[YandexMetric.getClientID] Counter is still loading');

    return '';
  }

  async setUserID(userId: string, counterPosition: number): Promise<UserIdCounterPositionInterface | null> {
    const counter = await this.counterIsLoaded(counterPosition);
    if (!counter) {
      console.error(`[YandexMetric.setUserID] counter ptr is not exist. For _counterPosition: ${counterPosition}`);
      return null;
    }

    // Обращаемся к Ya.setUserID
    await counter.setUserID(userId);

    return {userId, counterPosition};
  }

  async userParams<T>(params: T, counterPosition: number): Promise<ParamsCounterPositionInterface<T> | null> {
    const counter = await this.counterIsLoaded(counterPosition);
    if (!counter) {
      console.error(`[YandexMetric.userParams] counter ptr is not exist. For _counterPosition: ${counterPosition}`);
      return null;
    }

    // Обращаемся к Ya.userParams
    await counter.userParams(params);

    return {params, counterPosition};
  }

  async params<T>(params: T, counterPosition: number): Promise<ParamsCounterPositionInterface<T> | null> {
    const counter = await this.counterIsLoaded(counterPosition);
    if (!counter || !params) {
      console.error(`[YandexMetric.params] counter ptr is not exist. For _counterPosition: ${counterPosition}`);
      return null;
    }

    // Обращаемся к Ya.params
    counter.params(params);

    return {params, counterPosition};
  }

  async replacePhones(counterPosition: number): Promise<CounterPosition | null> {
    const counter = await this.counterIsLoaded(counterPosition);
    if (!counter) {
      console.error(`[YandexMetric.replacePhones] counter ptr is not exist. For _counterPosition: ${counterPosition}`);
      return null;
    }

    // Обращаемся к Ya.replacePhones
    await counter.replacePhones();

    return {counterPosition};
  }

  async notBounce(options: CallbackOptions | null = null, counterPosition: number): Promise<any> {
    if (!options) {
      console.error(`[YandexMetric.notBounce] options ptr is not exist. For _counterPosition: ${counterPosition}`);
      return null;
    }

    const counter = await this.counterIsLoaded(counterPosition);
    if (!counter) {
      console.error(`[YandexMetric.notBounce] counter ptr is not exist. For _counterPosition: ${counterPosition}`);
      return null;
    }

    // Обращаемся к Ya.notBounce
    await counter.notBounce(options);

    return this.getCallbackPromise(options, options);
  }

  async fireEvent<T>(type: string, options: CommonOptions<T> | null = null, counterPosition: number): Promise<any> {
    if (!options) {
      console.error(`[YandexMetric.fireEvent] options ptr is not exist. For _counterPosition: ${counterPosition}`);
      return null;
    }

    const counter = await this.counterIsLoaded(counterPosition);
    if (!counter) {
      console.warn(`[YandexMetric.hit] 'Event with type [${type}] can\'t be fired because counter is still loading`);
      return null;
    }

    // Обращаемся к Ya.reachGoal
    counter.reachGoal(type, options.params, options.callback, options.ctx);

    return this.getCallbackPromise(options, options);
  }

  /*
  * YandexMetric function params:
  ** url - string
  ** options:
  *** - callback - Function
  *** - ctx - Object of context (this)
  *** - referer String
  *** - title String
  *** - params Object
  **** - order_price Number
  **** - currency String
  * https://yandex.ru/support/metrica/objects/hit.html
  * */
  async hit<T>(url: string, options: HitOptions<T> | null = null, counterPosition: number): Promise<any> {
    if (!options) {
      console.error(`[YandexMetric.hit] options ptr is not exist. For _counterPosition: ${counterPosition}`);
      return null;
    }

    const counter = await this.counterIsLoaded(counterPosition);
    if (!counter) {
      console.warn(`[YandexMetric.hit] Hit for page [${url}] can\'t be fired because counter is still loading`)
      return null;
    }

    // Обращаемся к Ya.hit
    await counter.hit(url, options);

    return this.getCallbackPromise(options, options);
  }

  /*
  * YandexMetric function params:
  ** extensions: string | string[]
  * https://yandex.ru/support/metrica/objects/addfileextension.html
  * */
  async addFileExtension(_extensions: string | string[], _counterPosition?: number) {
    let counter = null;

    if (_counterPosition !== null && _counterPosition !== undefined) {
      counter = await this.counterIsLoaded(_counterPosition);
    }

    if (!counter) {
      console.error(`[YandexMetric.addFileExtension] counter ptr is not exist`);
      return false;
    }

    await counter.addFileExtension(_extensions);
    return true;
  }

  private getCallbackPromise(options: any, resolveWith: any) {
    return new Promise((resolve, reject) => {
      const optionsCallback = options.callback;
      options.callback = function () {
        if (optionsCallback) {
          optionsCallback.call(this);
        }
        resolve(resolveWith);
      };
    });
  }

  private counterIsLoaded(counterPosition: number): Promise<any> {
    const counter = this.getCounterByPosition(counterPosition);
    if (counter && counter.reachGoal) {
      return Promise.resolve(counter);
    } else {
      return Promise.reject(counter);
    }
  }

  private getCounterByPosition(counterPosition: number) {
    const counterId = this.getCounterIdByPosition(counterPosition);
    return YandexMetric.getCounterById(counterId);
  }

  private getCounterIdByPosition(counterPosition: number): string {
    return (counterPosition === undefined) ? this.defaultCounterId : this.positionToId[counterPosition];
  }
}
