import { IAfterThrowingAdvice } from './advice';
import { IAfterThrowingJoinPoint, AfterThrowingJoinPoint } from './joinpoint';
import { createMethod, createProperty, createDecorator } from './core';
import { MethodType, ParamsType } from './util';

type AfterThrowingAdvice<T, M extends MethodType<M>> = IAfterThrowingAdvice<
  T,
  M,
  IAfterThrowingJoinPoint<T, M>
>;

function aware<T, M extends MethodType<M>>(
  context: T,
  method: M,
  args: ParamsType<M>,
  advice: AfterThrowingAdvice<T, M>
): ReturnType<M> {
  const joinPoint = new AfterThrowingJoinPoint(context, method, args);
  try {
    return joinPoint.proceed();
  } catch (e) {
    advice(joinPoint, e);
    throw e;
  }
}

export function afterThrowing<T, K extends keyof T, M extends MethodType<M>>(
  target: T,
  propertyKey: PropertyKey & K,
  advice: IAfterThrowingAdvice<T, M, IAfterThrowingJoinPoint<T, M>>
) {
  return createProperty<
    T,
    K,
    M,
    IAfterThrowingJoinPoint<T, M>,
    AfterThrowingAdvice<T, M>
  >(target, propertyKey, advice, aware);
}

export function afterThrowingMethod<T, M extends MethodType<M>>(
  method: M,
  advice: IAfterThrowingAdvice<T, M, IAfterThrowingJoinPoint<T, M>>
): M {
  return createMethod<
    T,
    M,
    IAfterThrowingJoinPoint<T, M>,
    AfterThrowingAdvice<T, M>
  >(method, advice, aware);
}

export function AfterThrowing<T, M extends MethodType<M>>(
  advice: IAfterThrowingAdvice<T, M, IAfterThrowingJoinPoint<T, M>>
) {
  return createDecorator<
    T,
    M,
    IAfterThrowingJoinPoint<T, M>,
    AfterThrowingAdvice<T, M>
  >(advice, aware);
}
