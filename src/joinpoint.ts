import { MethodType, ParamsType } from './util';

export interface IJoinPoint<T = any, M extends MethodType<M> = any> {
  readonly context: T;
  readonly method: M;
  readonly args: ParamsType<M>;
  proceed(): ReturnType<M>;
  proceed(...args: ParamsType<M>): ReturnType<M>;
}

export interface IBeforeJoinPoint<T = any, M extends MethodType<M> = any>
  extends IJoinPoint<T, M> {
  setArg<V>(index: number, value: V): void;
}

export interface IAfterJoinPoint<T = any, M extends MethodType<M> = any>
  extends IJoinPoint<T, M> {}

export interface IAfterRunningJoinPoint<T = any, M extends MethodType<M> = any>
  extends IJoinPoint<T, M> {}

export interface IAfterThrowingJoinPoint<
  T = any,
  M extends MethodType<M> = any
> extends IJoinPoint<T, M> {}

export interface IAroundJoinPoint<T = any, M extends MethodType<M> = any>
  extends IJoinPoint<T, M> {}

export class JoinPoint<T, M extends MethodType<M> = any>
  implements IJoinPoint<T, M> {
  readonly context: T;
  readonly method: M;
  readonly args: ParamsType<M>;
  constructor(context: T, method: M, args: ParamsType<M>) {
    this.context = context;
    this.method = method;
    this.args = args;
  }
  proceed(): ReturnType<M>;
  proceed(...args: ParamsType<M>): ReturnType<M> {
    return this.method.apply(this.context, args.length > 0 ? args : this.args);
  }
}

export class BeforeJoinPoint<T, M extends MethodType<M> = any>
  extends JoinPoint<T, M>
  implements IBeforeJoinPoint<T, M> {
  setArg<V>(index: number, value: V) {
    this.args[index] = value;
  }
}

export class AfterJoinPoint<T, M extends MethodType<M> = any>
  extends JoinPoint<T, M>
  implements IAfterJoinPoint<T, M> {}

export class AfterRunningJoinPoint<T, M extends MethodType<M> = any>
  extends JoinPoint<T, M>
  implements IAfterRunningJoinPoint<T, M> {}

export class AfterThrowingJoinPoint<T, M extends MethodType<M> = any>
  extends JoinPoint<T, M>
  implements IAfterThrowingJoinPoint<T, M> {}

export class AroundJoinPoint<T, M extends MethodType<M> = any>
  extends BeforeJoinPoint<T, M>
  implements IAroundJoinPoint<T, M> {}

export {};
