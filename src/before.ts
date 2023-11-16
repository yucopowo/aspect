import { IBeforeAdvice } from './advice';
import { IBeforeJoinPoint, BeforeJoinPoint } from './joinpoint';
import { createMethod, createProperty, createDecorator } from './core';
import { MethodType, ParamsType } from './util';

type BeforeAdvice<T, M extends MethodType<M>> = IBeforeAdvice<
  T,
  M,
  IBeforeJoinPoint<T, M>
>;

function aware<T, M extends MethodType<M>>(
  context: T,
  method: M,
  args: ParamsType<M>,
  advice: BeforeAdvice<T, M>
): ReturnType<M> {
  const joinPoint = new BeforeJoinPoint(context, method, args);
  advice(joinPoint);
  return joinPoint.proceed();
}

export function before<T, K extends keyof T, M extends MethodType<M>>(
  target: T,
  propertyKey: PropertyKey & K,
  advice: IBeforeAdvice<T, M, IBeforeJoinPoint<T, M>>
) {
  return createProperty<T, K, M, IBeforeJoinPoint<T, M>, BeforeAdvice<T, M>>(
    target,
    propertyKey,
    advice,
    aware
  );
}

export function beforeMethod<T = any, M extends MethodType<M> = any>(
  method: M,
  advice: IBeforeAdvice<T, M, IBeforeJoinPoint<T, M>>
): M {
  return createMethod<T, M, IBeforeJoinPoint<T, M>, BeforeAdvice<T, M>>(
    method,
    advice,
    aware
  );
}

export function Before<T, M extends MethodType<M>>(
  advice: IBeforeAdvice<T, M, IBeforeJoinPoint<T, M>>
) {
  return createDecorator<T, M, IBeforeJoinPoint<T, M>, BeforeAdvice<T, M>>(
    advice,
    aware
  );
}
