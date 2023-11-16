import { IAroundAdvice } from './advice';
import { IAroundJoinPoint, AroundJoinPoint } from './joinpoint';
import { createMethod, createProperty, createDecorator } from './core';
import { MethodType, ParamsType } from './util';

type AroundAdvice<T, M extends MethodType<M>> = IAroundAdvice<
  T,
  M,
  IAroundJoinPoint<T, M>
>;

function aware<T, M extends MethodType<M>>(
  context: T,
  method: M,
  args: ParamsType<M>,
  advice: AroundAdvice<T, M>
): ReturnType<M> {
  const joinPoint = new AroundJoinPoint(context, method, args);
  return advice(joinPoint);
}

export function around<T, K extends keyof T, M extends MethodType<M>>(
  target: T,
  propertyKey: PropertyKey & K,
  advice: IAroundAdvice<T, M, IAroundJoinPoint<T, M>>
) {
  return createProperty<T, K, M, IAroundJoinPoint<T, M>, AroundAdvice<T, M>>(
    target,
    propertyKey,
    advice,
    aware
  );
}

export function aroundMethod<T, M extends MethodType<M>>(
  method: M,
  advice: IAroundAdvice<T, M, IAroundJoinPoint<T, M>>
): M {
  return createMethod<T, M, IAroundJoinPoint<T, M>, AroundAdvice<T, M>>(
    method,
    advice,
    aware
  );
}

export function Around<T, M extends MethodType<M>>(
  advice: IAroundAdvice<T, M, IAroundJoinPoint<T, M>>
) {
  return createDecorator<T, M, IAroundJoinPoint<T, M>, AroundAdvice<T, M>>(
    advice,
    aware
  );
}
