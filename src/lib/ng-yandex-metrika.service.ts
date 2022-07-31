import { Injectable, Injector } from '@angular/core';

import {
  CounterPosition,
  DEFAULT_COUNTER_ID, ParamsCounterPositionInterface,
  stringOrNumber, UserIdCounterPositionInterface,
  YANDEX_COUNTERS_CONFIGS,
  YandexCounterConfig
} from './ng-yandex-metrika.config';

export interface CallbackOptions {
  callback?: () => any;
  ctx?: any;
}

export interface CommonOptions extends CallbackOptions {
  params?: any;
  title?: any;
}

export interface HitOptions extends CommonOptions {
  referer?: string;
}

@Injectable({
  providedIn: 'root'
})
export class Metrika {
  private readonly defaultCounterId: string;
  private counterConfigs: YandexCounterConfig[];
  private readonly positionToId: Array<stringOrNumber>;

  static getCounterNameById(id: stringOrNumber) {
    return `yaCounter${id}`;
  }

  static getCounterById(id: stringOrNumber) {
    return window[Metrika.getCounterNameById(id)];
  }

  constructor(readonly injector: Injector) {
    this.defaultCounterId = injector.get<string>(DEFAULT_COUNTER_ID);
    this.counterConfigs = injector.get<YandexCounterConfig[]>(YANDEX_COUNTERS_CONFIGS);
    this.positionToId = this.counterConfigs.map(config => config.id);
  }

  // TODO: use string array only - Nick
  async addFileExtension(extensions: string | string[], counterPosition?: number) {
    try {
      const counter = await this.counterIsLoaded(counterPosition);
      await counter.addFileExtension(extensions);
    } catch (error) {
      console.warn('Counter is still loading');
    }
  }

  async extLink(url: string, options: CommonOptions = {}, counterPosition?: number): Promise<any> {
    let promise = null;
    try {
      const counter = await this.counterIsLoaded(counterPosition);
      promise = this.getCallbackPromise(options, url);
      await counter.extLink(url, options);
    } catch (error) {
      console.warn('Counter is still loading');
    }

    return promise;
  }

  async file(url: string, options: HitOptions = {}, counterPosition?: number): Promise<any> {
    let promise = null;
    try {
      const counter = await this.counterIsLoaded(counterPosition);
      promise = this.getCallbackPromise(options, url);
      await counter.file(url, options);
    } catch (error) {
      console.warn('Counter is still loading');
    }

    return promise;
  }

  getClientID(counterPosition?: number): string {
    const counter = this.getCounterByPosition(counterPosition);
    if (counter && counter.reachGoal) {
      return counter.getClientID();
    }

    console.warn('Counter is still loading');

    return '';
  }

  // TODO: add typization
  async setUserID(userId: string, counterPosition?: number): Promise<UserIdCounterPositionInterface> {
    try {
      const counter = await this.counterIsLoaded(counterPosition);
      await counter.setUserID(userId);
    } catch (error) {
      console.warn('Counter is still loading');
    }

    return {userId, counterPosition};
  }

  async userParams<T>(params: T, counterPosition?: number): Promise<ParamsCounterPositionInterface<T>> {
    try {
      const counter = await this.counterIsLoaded(counterPosition);
      await counter.userParams(params);
    } catch (error) {
      console.warn('Counter is still loading');
    }

    return {params, counterPosition};
  }

  async params<T>(params: T, counterPosition?: number): Promise<ParamsCounterPositionInterface<T>> {
    try {
      const counter = await this.counterIsLoaded(counterPosition);
      counter.params(params);
    } catch (error) {
      console.warn('Counter is still loading');
    }
    return {params, counterPosition};
  }

  async replacePhones(counterPosition?: number): Promise<CounterPosition> {
    try {
      const counter = await this.counterIsLoaded(counterPosition);
      await counter.replacePhones();
    } catch (error) {
      console.warn('Counter is still loading');
    }
    return {counterPosition};
  }

  async notBounce(options: CallbackOptions = {}, counterPosition?: number): Promise<any> {
    let promise = null;
    try {
      const counter = await this.counterIsLoaded(counterPosition);
      promise = this.getCallbackPromise(options, options);
      await counter.notBounce(options);
    } catch (error) {
      console.warn('Counter is still loading');
    }

    return promise;
  }

  async fireEvent(type: string, options: CommonOptions = {}, counterPosition?: number): Promise<any> {
    let promise = null;
    try {
      const counter = await this.counterIsLoaded(counterPosition);
      promise = this.getCallbackPromise(options, options);
      counter.reachGoal(type, options.params, options.callback, options.ctx);
    } catch (error) {
      console.error('error', error);
      console.warn(`'Event with type [${type}] can\'t be fired because counter is still loading'`)
    }
    return promise;
  }

  async hit(url: string, options: HitOptions = {}, counterPosition?: number): Promise<any> {
    let promise = null;
    try {
      const counter = await this.counterIsLoaded(counterPosition);
      promise = this.getCallbackPromise(options, options);
      await counter.hit(url, options);
    } catch (error) {
      console.warn(`'Hit for page [${url}] can\'t be fired because counter is still loading'`)
    }

    return promise;
  }

  private getCallbackPromise(options: any, resolveWith: any) {
    return new Promise((resolve, reject) => {
      const optionsCallback = options.callback;
      options.callback = function() {
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
    return Metrika.getCounterById(counterId);
  }

  private getCounterIdByPosition(counterPosition: number) {
    return (counterPosition === undefined)
      ? this.defaultCounterId
      : this.positionToId[counterPosition];
  }
}
