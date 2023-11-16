import { IJoinPoint } from './joinpoint';
import { MethodType } from './util';

export interface IAdvice<
  T,
  M extends MethodType<M>,
  J extends IJoinPoint<T, M>
> {}

export interface IBeforeAdvice<
  T,
  M extends MethodType<M>,
  J extends IJoinPoint<T, M>
> extends IAdvice<T, M, J> {
  (joinPoint: J): void;
}

export interface IAfterAdvice<
  T,
  M extends MethodType<M>,
  J extends IJoinPoint<T, M>
> extends IAdvice<T, M, J> {
  (joinPoint: J): void;
}

export interface IAfterRunningAdvice<
  T,
  M extends MethodType<M>,
  J extends IJoinPoint<T, M>
> extends IAdvice<T, M, J> {
  (joinPoint: J, value: ReturnType<M>): void;
}

export interface IAfterThrowingAdvice<
  T,
  M extends MethodType<M>,
  J extends IJoinPoint<T, M>
> extends IAdvice<T, M, J> {
  (joinPoint: J, error: Error): void;
}

export interface IAroundAdvice<
  T,
  M extends MethodType<M>,
  J extends IJoinPoint<T, M>
> extends IAdvice<T, M, J> {
  (joinPoint: J): ReturnType<M>;
}
