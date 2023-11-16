import { IAdvice } from './advice';
import { IAware } from './aware';
import { IJoinPoint } from './joinpoint';
import { MethodType, getProperty, ParamsType } from './util';

export function createMethod<
  T,
  M extends MethodType<M>,
  J extends IJoinPoint<T, M>,
  A extends IAdvice<T, M, J>
>(method: M, advice: A, aware: IAware<T, M, J, A>): M {
  function proxy(this: T, ...args: ParamsType<M>) {
    return aware(this, method, args, advice);
  }
  return proxy as M;
}

export function createProperty<
  T,
  K extends keyof T,
  M extends MethodType<M>,
  J extends IJoinPoint<T, M>,
  A extends IAdvice<T, M, J>
>(
  target: T,
  propertyKey: PropertyKey & K,
  advice: A,
  aware: IAware<T, M, J, A>
) {
  const method: M = getProperty(target, propertyKey);
  const proxy = createMethod<T, M, J, A>(method, advice, aware);
  Object.defineProperty(target, propertyKey, {
    value: proxy,
  });
  return {
    remove() {
      Object.defineProperty(target, propertyKey, {
        value: method,
      });
    },
  };
}

export function createDecorator<
  T,
  M extends MethodType<M>,
  J extends IJoinPoint<T, M>,
  A extends IAdvice<T, M, J>
>(advice: A, aware: IAware<T, M, J, A>) {
  return function decorator(
    target: T,
    propertyKey: PropertyKey,
    descriptor: PropertyDescriptor
  ) {
    const method = descriptor.value as M;
    Object.defineProperty(descriptor, 'value', {
      value: createMethod<T, M, J, A>(method, advice, aware),
    });
  };
}
