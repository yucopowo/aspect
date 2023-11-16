export type MethodType<M extends (...args: any[]) => ReturnType<M>> = (
  ...args: any[]
) => ReturnType<M>;

export type ParamsType<T extends (...args: any[]) => any> = T extends (
  ...args: infer P
) => any
  ? P
  : never;

export function isPromise<T = any>(p: any): p is Promise<T> {
  return p !== null && typeof p === 'object' && typeof p.then === 'function';
}

export function isPropertyKey(p: any): p is PropertyKey {
  return (
    typeof p === 'string' || typeof p === 'symbol' || typeof p === 'number'
  );
}

export function isMethod<M>(method: any): method is M {
  return true;
}

export function getProperty<T, K extends keyof T, M>(obj: T, key: K): M {
  const method: T[K] = obj[key];
  // TODO: isMethod is type function
  if (!isMethod<M>(method)) {
    throw new Error('error');
  }
  return method;
}
