import {Injectable, Injector} from '@angular/core';

import {CommonOptions} from "./common/interfaces/commonOptions.interface";
import {HitOptions} from "./common/interfaces/hitOptions.interface";
import {CallbackOptions} from "./common/interfaces/callbackOptions.interface";
import {DEFAULT_COUNTER_ID, stringOrNumber, YANDEX_COUNTERS_CONFIGS} from "./common/constants.service";
import {YandexCounterConfig} from "./yandexCounterConfig.service";
import {UtilsGetCounterNameById} from "./common/shared.utils";
import {UserIdCounterPositionInterface} from "./common/interfaces/userIdCounterPosition.interface";
import {ParamsCounterPositionInterface} from "./common/interfaces/paramsCounterPosition.interface";
import {CounterPosition} from "./common/interfaces/counterPosition.interface";

@Injectable({
  providedIn: 'root'
})
export class YandexMetric {
  private readonly defaultCounterId: string;
  private readonly positionToId: Array<stringOrNumber>;
  private counterConfigs: YandexCounterConfig[];

  constructor(readonly injector: Injector) {
    this.defaultCounterId = injector.get<string>(DEFAULT_COUNTER_ID);
    this.counterConfigs = injector.get<YandexCounterConfig[]>(YANDEX_COUNTERS_CONFIGS);
    this.positionToId = this.counterConfigs.map(config => config.id);
  }

  static getCounterById(id: stringOrNumber) {
    if (!window) {
      console.error(`[YandexMetric.getCounterById] not exist ptr to window`);
      return null;
    }

    if (!(UtilsGetCounterNameById(id)?.length > 0)) {
      console.error(`[YandexMetric.getCounterById] not exist YandexMetric.getCounterNameById with id: ${id}`);
      return null;
    }

    const ptr = window[UtilsGetCounterNameById(id)];
    if (!ptr) {
      console.error(`[YandexMetric.getCounterById] not exist window[YandexMetric.getCounterNameById] with id: ${id}`);
      return null;
    }

    return ptr;
  }

  async addFileExtension(_extensions: string | string[], _counterPosition?: number) {
    let counter = null;

    if (_counterPosition !== null && _counterPosition !== undefined) {
      counter = await this.counterIsLoaded(_counterPosition);
    }

    if (!counter) {
      console.error(`[YandexMetric.addFileExtension] counter ptr is not exist`);
      return false;
    }

    if (!Array.isArray(_extensions)) {
      await counter.addFileExtension(_extensions);
      return true;
    }

    for (const ext of _extensions) {
      if (!ext) {
        console.warn(`[] not exist ext pointer`);
        continue;
      }

      await counter.addFileExtension(ext);
    }

    return true;
  }

  async extLink<T>(url: string, options: CommonOptions<T> = null, _counterPosition?: number): Promise<any> {
    let counter = null;

    if (_counterPosition !== null && _counterPosition !== undefined) {
      counter = await this.counterIsLoaded(_counterPosition);
    }
    if (!counter) {
      console.error(`[YandexMetric.extLink] counter ptr is not exist. For url: ${url}`);
      return null;
    }

    await counter.extLink(url, options);

    return this.getCallbackPromise(options, url);
  }

  async file<T>(url: string, options: HitOptions<T> = null, _counterPosition?: number): Promise<any> {
    let promise = null;

    const counter = await this.counterIsLoaded(_counterPosition);
    if (!counter) {
      console.error(`[YandexMetric.file] counter ptr is not exist. For url: ${url}`);
      return null;
    }

    await counter.file(url, options);

    return this.getCallbackPromise(options, url);
  }

  getClientID(_counterPosition?: number): string {
    const counter = this.getCounterByPosition(_counterPosition);
    if (counter && counter.reachGoal) {
      return counter.getClientID();
    }

    console.warn('[YandexMetric.getClientID] Counter is still loading');

    return '';
  }

  async setUserID(userId: string, counterPosition?: number): Promise<UserIdCounterPositionInterface> {
    const counter = await this.counterIsLoaded(counterPosition);
    if (!counter) {
      console.error(`[YandexMetric.setUserID] counter ptr is not exist. For _counterPosition: ${counterPosition}`);
      return null;
    }
    await counter.setUserID(userId);

    return {userId, counterPosition};
  }

  async userParams<T>(params: T, counterPosition?: number): Promise<ParamsCounterPositionInterface<T>> {
    const counter = await this.counterIsLoaded(counterPosition);
    if (!counter) {
      console.error(`[YandexMetric.userParams] counter ptr is not exist. For _counterPosition: ${counterPosition}`);
      return null;
    }

    await counter.userParams(params);

    return {params, counterPosition};
  }

  async params<T>(params: T, counterPosition?: number): Promise<ParamsCounterPositionInterface<T>> {
    const counter = await this.counterIsLoaded(counterPosition);
    if (!counter || !params) {
      console.error(`[YandexMetric.params] counter ptr is not exist. For _counterPosition: ${counterPosition}`);
      return null;
    }

    counter.params(params);

    return {params, counterPosition};
  }

  async replacePhones(counterPosition?: number): Promise<CounterPosition> {
    const counter = await this.counterIsLoaded(counterPosition);
    if (!counter) {
      console.error(`[YandexMetric.replacePhones] counter ptr is not exist. For _counterPosition: ${counterPosition}`);
      return null;
    }

    await counter.replacePhones();

    return {counterPosition};
  }

  async notBounce(options: CallbackOptions = null, counterPosition?: number): Promise<any> {
    const counter = await this.counterIsLoaded(counterPosition);
    if (!counter) {
      console.error(`[YandexMetric.notBounce] counter ptr is not exist. For _counterPosition: ${counterPosition}`);
      return null;
    }

    await counter.notBounce(options);

    return this.getCallbackPromise(options, options);
  }

  async fireEvent<T>(type: string, options: CommonOptions<T> = null, counterPosition?: number): Promise<any> {
    const counter = await this.counterIsLoaded(counterPosition);
    if (!counter) {
      console.warn(`[YandexMetric.hit] 'Event with type [${type}] can\'t be fired because counter is still loading`);
      return null;
    }

    counter.reachGoal(type, options.params, options.callback, options.ctx);

    return this.getCallbackPromise(options, options);
  }

  async hit<T>(url: string, options: HitOptions<T> = null, counterPosition?: number): Promise<any> {
    const counter = await this.counterIsLoaded(counterPosition);
    if (!counter) {
      console.warn(`[YandexMetric.hit] Hit for page [${url}] can\'t be fired because counter is still loading`)
      return null;
    }

    await counter.hit(url, options);

    return this.getCallbackPromise(options, options);
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

  private counterIsLoaded(counterPosition?: number): Promise<any> {
    const counter = this.getCounterByPosition(counterPosition);
    if (counter && counter.reachGoal) {
      return Promise.resolve(counter);
    } else {
      return Promise.reject(counter);
    }
  }

  private getCounterByPosition(counterPosition?: number) {
    const counterId = this.getCounterIdByPosition(counterPosition);
    return YandexMetric.getCounterById(counterId);
  }

  private getCounterIdByPosition(counterPosition: number): stringOrNumber {
    return (counterPosition === undefined)
      ? this.defaultCounterId
      : this.positionToId[counterPosition];
  }
}
