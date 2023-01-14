"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.YandexMetric = void 0;
var core_1 = require("@angular/core");
var constants_service_1 = require("./common/constants.service");
var shared_utils_1 = require("./common/shared.utils");
var YandexMetric = /** @class */ (function () {
    function YandexMetric(injector) {
        this.injector = injector;
        this.defaultCounterId = injector.get(constants_service_1.DEFAULT_COUNTER_ID);
        this.counterConfigs = injector.get(constants_service_1.YANDEX_COUNTERS_CONFIGS);
        this.positionToId = this.counterConfigs.map(function (config) { return config.id; });
    }
    YandexMetric_1 = YandexMetric;
    YandexMetric.getCounterById = function (id) {
        if (!window) {
            console.error("[YandexMetric.getCounterById] not exist ptr to window");
            return null;
        }
        var counterName = (0, shared_utils_1.UtilsGetCounterNameById)(id);
        if (!((counterName === null || counterName === void 0 ? void 0 : counterName.length) > 0)) {
            console.error("[YandexMetric.getCounterById] not exist YandexMetric.getCounterNameById with id: ".concat(id));
            return null;
        }
        var ptr = window[counterName];
        if (!ptr) {
            console.error("[YandexMetric.getCounterById] not exist window[YandexMetric.getCounterNameById] with id: ".concat(id));
            return null;
        }
        return ptr;
    };
    YandexMetric.createCounter = function (config) {
        return (0, shared_utils_1.UtilsCreateCounter)(config);
    };
    YandexMetric.getCounterNameById = function (id) {
        return (0, shared_utils_1.UtilsGetCounterNameById)(id);
    };
    YandexMetric.prototype.extLink = function (url, options, _counterPosition) {
        if (options === void 0) { options = null; }
        return __awaiter(this, void 0, void 0, function () {
            var counter;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        counter = null;
                        if (!(_counterPosition !== null && _counterPosition !== undefined)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.counterIsLoaded(_counterPosition)];
                    case 1:
                        counter = _a.sent();
                        _a.label = 2;
                    case 2:
                        if (!counter) {
                            console.error("[YandexMetric.extLink] counter ptr is not exist. For url: ".concat(url));
                            return [2 /*return*/, null];
                        }
                        // Обращаемся к Ya.extLink
                        return [4 /*yield*/, counter.extLink(url, options)];
                    case 3:
                        // Обращаемся к Ya.extLink
                        _a.sent();
                        return [2 /*return*/, this.getCallbackPromise(options, url)];
                }
            });
        });
    };
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
    YandexMetric.prototype.file = function (url, options, _counterPosition) {
        if (options === void 0) { options = null; }
        return __awaiter(this, void 0, void 0, function () {
            var counter;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!options) {
                            console.error("[YandexMetric.file] options ptr is not exist. For _counterPosition: ".concat(_counterPosition));
                            return [2 /*return*/, null];
                        }
                        return [4 /*yield*/, this.counterIsLoaded(_counterPosition)];
                    case 1:
                        counter = _a.sent();
                        if (!counter) {
                            console.error("[YandexMetric.file] counter ptr is not exist. For url: ".concat(url));
                            return [2 /*return*/, null];
                        }
                        // Обращаемся к Ya.file
                        return [4 /*yield*/, counter.file(url, options)];
                    case 2:
                        // Обращаемся к Ya.file
                        _a.sent();
                        return [2 /*return*/, this.getCallbackPromise(options, url)];
                }
            });
        });
    };
    YandexMetric.prototype.getClientID = function (_counterPosition) {
        var counter = this.getCounterByPosition(_counterPosition);
        if (counter && counter.reachGoal) {
            return counter.getClientID();
        }
        console.warn('[YandexMetric.getClientID] Counter is still loading');
        return '';
    };
    YandexMetric.prototype.setUserID = function (userId, counterPosition) {
        return __awaiter(this, void 0, void 0, function () {
            var counter;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.counterIsLoaded(counterPosition)];
                    case 1:
                        counter = _a.sent();
                        if (!counter) {
                            console.error("[YandexMetric.setUserID] counter ptr is not exist. For _counterPosition: ".concat(counterPosition));
                            return [2 /*return*/, null];
                        }
                        // Обращаемся к Ya.setUserID
                        return [4 /*yield*/, counter.setUserID(userId)];
                    case 2:
                        // Обращаемся к Ya.setUserID
                        _a.sent();
                        return [2 /*return*/, { userId: userId, counterPosition: counterPosition }];
                }
            });
        });
    };
    YandexMetric.prototype.userParams = function (params, counterPosition) {
        return __awaiter(this, void 0, void 0, function () {
            var counter;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.counterIsLoaded(counterPosition)];
                    case 1:
                        counter = _a.sent();
                        if (!counter) {
                            console.error("[YandexMetric.userParams] counter ptr is not exist. For _counterPosition: ".concat(counterPosition));
                            return [2 /*return*/, null];
                        }
                        // Обращаемся к Ya.userParams
                        return [4 /*yield*/, counter.userParams(params)];
                    case 2:
                        // Обращаемся к Ya.userParams
                        _a.sent();
                        return [2 /*return*/, { params: params, counterPosition: counterPosition }];
                }
            });
        });
    };
    YandexMetric.prototype.params = function (params, counterPosition) {
        return __awaiter(this, void 0, void 0, function () {
            var counter;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.counterIsLoaded(counterPosition)];
                    case 1:
                        counter = _a.sent();
                        if (!counter || !params) {
                            console.error("[YandexMetric.params] counter ptr is not exist. For _counterPosition: ".concat(counterPosition));
                            return [2 /*return*/, null];
                        }
                        // Обращаемся к Ya.params
                        counter.params(params);
                        return [2 /*return*/, { params: params, counterPosition: counterPosition }];
                }
            });
        });
    };
    YandexMetric.prototype.replacePhones = function (counterPosition) {
        return __awaiter(this, void 0, void 0, function () {
            var counter;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.counterIsLoaded(counterPosition)];
                    case 1:
                        counter = _a.sent();
                        if (!counter) {
                            console.error("[YandexMetric.replacePhones] counter ptr is not exist. For _counterPosition: ".concat(counterPosition));
                            return [2 /*return*/, null];
                        }
                        // Обращаемся к Ya.replacePhones
                        return [4 /*yield*/, counter.replacePhones()];
                    case 2:
                        // Обращаемся к Ya.replacePhones
                        _a.sent();
                        return [2 /*return*/, { counterPosition: counterPosition }];
                }
            });
        });
    };
    YandexMetric.prototype.notBounce = function (options, counterPosition) {
        if (options === void 0) { options = null; }
        return __awaiter(this, void 0, void 0, function () {
            var counter;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!options) {
                            console.error("[YandexMetric.notBounce] options ptr is not exist. For _counterPosition: ".concat(counterPosition));
                            return [2 /*return*/, null];
                        }
                        return [4 /*yield*/, this.counterIsLoaded(counterPosition)];
                    case 1:
                        counter = _a.sent();
                        if (!counter) {
                            console.error("[YandexMetric.notBounce] counter ptr is not exist. For _counterPosition: ".concat(counterPosition));
                            return [2 /*return*/, null];
                        }
                        // Обращаемся к Ya.notBounce
                        return [4 /*yield*/, counter.notBounce(options)];
                    case 2:
                        // Обращаемся к Ya.notBounce
                        _a.sent();
                        return [2 /*return*/, this.getCallbackPromise(options, options)];
                }
            });
        });
    };
    YandexMetric.prototype.fireEvent = function (type, options, counterPosition) {
        if (options === void 0) { options = null; }
        return __awaiter(this, void 0, void 0, function () {
            var counter;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!options) {
                            console.error("[YandexMetric.fireEvent] options ptr is not exist. For _counterPosition: ".concat(counterPosition));
                            return [2 /*return*/, null];
                        }
                        return [4 /*yield*/, this.counterIsLoaded(counterPosition)];
                    case 1:
                        counter = _a.sent();
                        if (!counter) {
                            console.warn("[YandexMetric.hit] 'Event with type [".concat(type, "] can't be fired because counter is still loading"));
                            return [2 /*return*/, null];
                        }
                        // Обращаемся к Ya.reachGoal
                        counter.reachGoal(type, options.params, options.callback, options.ctx);
                        return [2 /*return*/, this.getCallbackPromise(options, options)];
                }
            });
        });
    };
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
    YandexMetric.prototype.hit = function (url, options, counterPosition) {
        if (options === void 0) { options = null; }
        return __awaiter(this, void 0, void 0, function () {
            var counter;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!options) {
                            console.error("[YandexMetric.hit] options ptr is not exist. For _counterPosition: ".concat(counterPosition));
                            return [2 /*return*/, null];
                        }
                        return [4 /*yield*/, this.counterIsLoaded(counterPosition)];
                    case 1:
                        counter = _a.sent();
                        if (!counter) {
                            console.warn("[YandexMetric.hit] Hit for page [".concat(url, "] can't be fired because counter is still loading"));
                            return [2 /*return*/, null];
                        }
                        // Обращаемся к Ya.hit
                        return [4 /*yield*/, counter.hit(url, options)];
                    case 2:
                        // Обращаемся к Ya.hit
                        _a.sent();
                        return [2 /*return*/, this.getCallbackPromise(options, options)];
                }
            });
        });
    };
    /*
    * YandexMetric function params:
    ** extensions: string | string[]
    * https://yandex.ru/support/metrica/objects/addfileextension.html
    * */
    YandexMetric.prototype.addFileExtension = function (_extensions, _counterPosition) {
        return __awaiter(this, void 0, void 0, function () {
            var counter;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        counter = null;
                        if (!(_counterPosition !== null && _counterPosition !== undefined)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.counterIsLoaded(_counterPosition)];
                    case 1:
                        counter = _a.sent();
                        _a.label = 2;
                    case 2:
                        if (!counter) {
                            console.error("[YandexMetric.addFileExtension] counter ptr is not exist");
                            return [2 /*return*/, false];
                        }
                        return [4 /*yield*/, counter.addFileExtension(_extensions)];
                    case 3:
                        _a.sent();
                        return [2 /*return*/, true];
                }
            });
        });
    };
    YandexMetric.prototype.getCallbackPromise = function (options, resolveWith) {
        return new Promise(function (resolve, reject) {
            var optionsCallback = options.callback;
            options.callback = function () {
                if (optionsCallback) {
                    optionsCallback.call(this);
                }
                resolve(resolveWith);
            };
        });
    };
    YandexMetric.prototype.counterIsLoaded = function (counterPosition) {
        var counter = this.getCounterByPosition(counterPosition);
        if (counter && counter.reachGoal) {
            return Promise.resolve(counter);
        }
        else {
            return Promise.reject(counter);
        }
    };
    YandexMetric.prototype.getCounterByPosition = function (counterPosition) {
        var counterId = this.getCounterIdByPosition(counterPosition);
        return YandexMetric_1.getCounterById(counterId);
    };
    YandexMetric.prototype.getCounterIdByPosition = function (counterPosition) {
        return (counterPosition === undefined) ? this.defaultCounterId : this.positionToId[counterPosition];
    };
    var YandexMetric_1;
    YandexMetric = YandexMetric_1 = __decorate([
        (0, core_1.Injectable)({
            providedIn: 'root'
        })
    ], YandexMetric);
    return YandexMetric;
}());
exports.YandexMetric = YandexMetric;
