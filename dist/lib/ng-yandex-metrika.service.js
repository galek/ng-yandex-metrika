var YandexMetric_1;
import { __decorate, __metadata } from "tslib";
import { Injectable, Injector } from '@angular/core';
import { DEFAULT_COUNTER_ID, YANDEX_COUNTERS_CONFIGS } from "./common/constants.service";
import { UtilsCreateCounter, UtilsGetCounterNameById } from "./common/shared.utils";
let YandexMetric = YandexMetric_1 = class YandexMetric {
    constructor(injector) {
        this.injector = injector;
        this.defaultCounterId = injector.get(DEFAULT_COUNTER_ID);
        this.counterConfigs = injector.get(YANDEX_COUNTERS_CONFIGS);
        this.positionToId = this.counterConfigs.map(config => config.id);
    }
    static getCounterById(id) {
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
    static createCounter(config) {
        return UtilsCreateCounter(config);
    }
    static getCounterNameById(id) {
        return UtilsGetCounterNameById(id);
    }
    async extLink(url, options = null, _counterPosition) {
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
    async file(url, options = null, _counterPosition) {
        let promise = null;
        const counter = await this.counterIsLoaded(_counterPosition);
        if (!counter) {
            console.error(`[YandexMetric.file] counter ptr is not exist. For url: ${url}`);
            return null;
        }
        // Обращаемся к Ya.file
        await counter.file(url, options);
        return this.getCallbackPromise(options, url);
    }
    getClientID(_counterPosition) {
        const counter = this.getCounterByPosition(_counterPosition);
        if (counter && counter.reachGoal) {
            return counter.getClientID();
        }
        console.warn('[YandexMetric.getClientID] Counter is still loading');
        return '';
    }
    async setUserID(userId, counterPosition) {
        const counter = await this.counterIsLoaded(counterPosition);
        if (!counter) {
            console.error(`[YandexMetric.setUserID] counter ptr is not exist. For _counterPosition: ${counterPosition}`);
            return null;
        }
        // Обращаемся к Ya.setUserID
        await counter.setUserID(userId);
        return { userId, counterPosition };
    }
    async userParams(params, counterPosition) {
        const counter = await this.counterIsLoaded(counterPosition);
        if (!counter) {
            console.error(`[YandexMetric.userParams] counter ptr is not exist. For _counterPosition: ${counterPosition}`);
            return null;
        }
        // Обращаемся к Ya.userParams
        await counter.userParams(params);
        return { params, counterPosition };
    }
    async params(params, counterPosition) {
        const counter = await this.counterIsLoaded(counterPosition);
        if (!counter || !params) {
            console.error(`[YandexMetric.params] counter ptr is not exist. For _counterPosition: ${counterPosition}`);
            return null;
        }
        // Обращаемся к Ya.params
        counter.params(params);
        return { params, counterPosition };
    }
    async replacePhones(counterPosition) {
        const counter = await this.counterIsLoaded(counterPosition);
        if (!counter) {
            console.error(`[YandexMetric.replacePhones] counter ptr is not exist. For _counterPosition: ${counterPosition}`);
            return null;
        }
        // Обращаемся к Ya.replacePhones
        await counter.replacePhones();
        return { counterPosition };
    }
    async notBounce(options = null, counterPosition) {
        const counter = await this.counterIsLoaded(counterPosition);
        if (!counter) {
            console.error(`[YandexMetric.notBounce] counter ptr is not exist. For _counterPosition: ${counterPosition}`);
            return null;
        }
        // Обращаемся к Ya.notBounce
        await counter.notBounce(options);
        return this.getCallbackPromise(options, options);
    }
    async fireEvent(type, options = null, counterPosition) {
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
    async hit(url, options = null, counterPosition) {
        const counter = await this.counterIsLoaded(counterPosition);
        if (!counter) {
            console.warn(`[YandexMetric.hit] Hit for page [${url}] can\'t be fired because counter is still loading`);
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
    async addFileExtension(_extensions, _counterPosition) {
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
    getCallbackPromise(options, resolveWith) {
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
    counterIsLoaded(counterPosition) {
        const counter = this.getCounterByPosition(counterPosition);
        if (counter && counter.reachGoal) {
            return Promise.resolve(counter);
        }
        else {
            return Promise.reject(counter);
        }
    }
    getCounterByPosition(counterPosition) {
        const counterId = this.getCounterIdByPosition(counterPosition);
        return YandexMetric_1.getCounterById(counterId);
    }
    getCounterIdByPosition(counterPosition) {
        return (counterPosition === undefined)
            ? this.defaultCounterId
            : this.positionToId[counterPosition];
    }
};
YandexMetric = YandexMetric_1 = __decorate([
    Injectable({
        providedIn: 'root'
    }),
    __metadata("design:paramtypes", [Injector])
], YandexMetric);
export { YandexMetric };
//# sourceMappingURL=ng-yandex-metrika.service.js.map