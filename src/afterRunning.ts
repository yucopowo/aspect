import { IAfterRunningAdvice } from './advice';
import { IAfterRunningJoinPoint, AfterRunningJoinPoint } from './joinpoint';
import { createMethod, createProperty, createDecorator } from './core';
import { MethodType, ParamsType } from './util';

type AfterRunningAdvice<T, M extends MethodType<M>> = IAfterRunningAdvice<
  T,
  M,
  IAfterRunningJoinPoint<T, M>
>;

function aware<T, M extends MethodType<M>>(
  context: T,
  method: M,
  args: ParamsType<M>,
  advice: AfterRunningAdvice<T, M>
): ReturnType<M> {
  const joinPoint = new AfterRunningJoinPoint(context, method, args);
  const value = joinPoint.proceed();
  advice(joinPoint, value);
  return value;
}

export function afterRunning<T, K extends keyof T, M extends MethodType<M>>(
  target: T,
  propertyKey: PropertyKey & K,
  advice: IAfterRunningAdvice<T, M, IAfterRunningJoinPoint<T, M>>
) {
  return createProperty<
    T,
    K,
    M,
    IAfterRunningJoinPoint<T, M>,
    AfterRunningAdvice<T, M>
  >(target, propertyKey, advice, aware);
}

export function afterRunningMethod<T, M extends MethodType<M>>(
  method: M,
  advice: IAfterRunningAdvice<T, M, IAfterRunningJoinPoint<T, M>>
): M {
  return createMethod<
    T,
    M,
    IAfterRunningJoinPoint<T, M>,
    AfterRunningAdvice<T, M>
  >(method, advice, aware);
}

export function AfterRunning<T, M extends MethodType<M>>(
  advice: IAfterRunningAdvice<T, M, IAfterRunningJoinPoint<T, M>>
) {
  return createDecorator<
    T,
    M,
    IAfterRunningJoinPoint<T, M>,
    AfterRunningAdvice<T, M>
  >(advice, aware);
}
