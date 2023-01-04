import { CallbackOptions } from "./callbackOptions.interface";
export interface CommonOptions<T> extends CallbackOptions {
    params: T;
    title: string;
}
