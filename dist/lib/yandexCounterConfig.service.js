export class YandexCounterConfig {
    constructor(cfg) {
        this.clickmap = true;
        this.trackLinks = true;
        this.accurateTrackBounce = true;
        this.webvisor = false;
        this.trackHash = true;
        this.ut = 'noindex';
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
//# sourceMappingURL=yandexCounterConfig.service.js.map