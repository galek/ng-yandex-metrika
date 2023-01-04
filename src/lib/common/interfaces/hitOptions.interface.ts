import { CommonOptions } from "./commonOptions.interface";

export interface HitOptions<T> extends CommonOptions<T> {
  referer: string;
}
