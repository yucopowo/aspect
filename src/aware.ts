import { IAdvice } from './advice';
import { IJoinPoint } from './joinpoint';
import { MethodType, ParamsType } from './util';

export type IAware<
  T,
  M extends MethodType<M>,
  J extends IJoinPoint<T, M>,
  A extends IAdvice<T, M, J>
> = (context: T, method: M, args: ParamsType<M>, advice: A) => ReturnType<M>;
