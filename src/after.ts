import { IAfterAdvice } from './advice';
import { IAfterJoinPoint, AfterJoinPoint } from './joinpoint';
import { createMethod, createProperty, createDecorator } from './core';
import { MethodType, ParamsType } from './util';

type AfterAdvice<T, M extends MethodType<M>> = IAfterAdvice<
  T,
  M,
  IAfterJoinPoint<T, M>
>;

function aware<T, M extends MethodType<M>>(
  context: T,
  method: M,
  args: ParamsType<M>,
  advice: AfterAdvice<T, M>
): ReturnType<M> {
  const joinPoint = new AfterJoinPoint(context, method, args);
  try {
    return joinPoint.proceed();
  } finally {
    advice(joinPoint);
  }
}

export function after<T, K extends keyof T, M extends MethodType<M>>(
  target: T,
  propertyKey: PropertyKey & K,
  advice: IAfterAdvice<T, M, IAfterJoinPoint<T, M>>
) {
  return createProperty<T, K, M, IAfterJoinPoint<T, M>, AfterAdvice<T, M>>(
    target,
    propertyKey,
    advice,
    aware
  );
}

export function afterMethod<T, M extends MethodType<M>>(
  method: M,
  advice: IAfterAdvice<T, M, IAfterJoinPoint<T, M>>
): M {
  return createMethod<T, M, IAfterJoinPoint<T, M>, AfterAdvice<T, M>>(
    method,
    advice,
    aware
  );
}

export function After<T, M extends MethodType<M>>(
  advice: IAfterAdvice<T, M, IAfterJoinPoint<T, M>>
) {
  return createDecorator<T, M, IAfterJoinPoint<T, M>, AfterAdvice<T, M>>(
    advice,
    aware
  );
}
