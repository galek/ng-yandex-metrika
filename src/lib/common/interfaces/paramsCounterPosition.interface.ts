import {CounterPosition} from "./counterPosition.interface";

export interface ParamsCounterPositionInterface<T1> extends CounterPosition {
  params: T1;
}
