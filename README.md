# aspect

基于 TypeScript 和注解的轻量级AOP框架，提供了面向切面编程及异常处理等功能。

## 安装

    npm install @datayes/aspect

## 开发
    npm install
    npm start

## 快速上手

示例一： 函数执行前修改参数

```typescript
import { before, IBeforeJoinPoint } from '@/aspect';
interface Page {
  render(num: number): string;
}

const page: Page = {
  render(num: number): string {
    return `render${num}`;
  },
};

before(page, 'render', function advice(joinPoint: IBeforeJoinPoint<Page>) {
  joinPoint.setArg(0, 99);
});

page.render(1)
```



示例二： 函数执行后修改结果

```typescript
import * as React from 'react';
import { Around, IAroundJoinPoint } from '@/aspect';

interface Props {
  list: number[];
}
export default class Page extends React.Component<Props, {}> {
  @Around((joinPoint: IAroundJoinPoint<Page, () => React.ReactNode>) => {
    console.log(joinPoint.context.props);
    if (joinPoint.context.props.list.length === 0) return <div>empty</div>;
    return joinPoint.proceed();
  })
  render() {
    return <div>page={this.props.list.length}</div>;
  }
}
```



### API

#### **Before Advice**(**前置增强**)

**函数 before**

```typescript
before<T, K extends keyof T>(
  target: T,
  propertyKey: K,
  advice: IBeforeAdvice<T>
)
```

```typescript
beforeMethod<T, M extends MethodType<M>>(
  method: M,
  advice: IBeforeAdvice<T, M>
): M
```

**注解 Before**

```typescript
Before<T>(advice: IBeforeAdvice<T>)
```



#### **After Advice** (**后置增强**)

**函数 after**

```typescript
after<T, K extends keyof T>(
  target: T,
  propertyKey: K,
  advice: IAfterAdvice<T>
)
```

```typescript
After<T>(advice: IAfterAdvice<T>)
```



#### JoinPoint

```typescript
export class JoinPoint<T> {
  context: T; // 上下文
  method: M; //目标执行函数
  args: any[]; // 目标函数参数
  proceed(...args: any[]) // 代理执行方法 
  setArg<V>(index: number, value: V)  // 修改目标函数参数
}
```

## performance

```
    > node ./performance/run_benchmark.js
    
    aspect:before x 11,200,595 ops/sec ±0.91% (89 runs sampled)
    meld:before x 423,374 ops/sec ±2.03% (88 runs sampled)
    aspect:before decorator x 2,384,347 ops/sec ±0.69% (91 runs sampled)
    kaop:before decorator x 214,939 ops/sec ±1.22% (85 runs sampled)
    AOP:before x 1,845,475 ops/sec ±0.63% (89 runs sampled)
    jsAspect:before x 399,513 ops/sec ±0.93% (87 runs sampled)
    uaop:before x 1,591,157 ops/sec ±0.49% (92 runs sampled)
    twill:before x 131,751 ops/sec ±13.35% (31 runs sampled)
    aspect2:before x 2,336,448 ops/sec ±0.64% (86 runs sampled)
    Fastest is aspect:before
```


## 面向切面编程 AOP


#### AOP概念


##### 连接点（Joinpoint）

JoinPoint一般用在Advice实现方法中作为参数传入



##### 通知（Advice）

**advice类型：**

1. **Before Advice**(**前置增强**)  在目标函数执行前执行，可以修改参数
2. **After Advice** (**后置增强**) 在目标函数执行后执行
3. **Around Advice**(**环绕增强**) 在目标函数执行前后执行，可以自己决定目标函数什么时候执行，前可以修改参数，后可以修改执行结果
4. **AfterReturning** 目标函数执行前后执行/手动调用目标函数
5. **afterThrowing** 在目标函数抛出异常时执行



扩展知识

- **AfterReturning 增强处理处理只有在目标函数成功完成后才会被织入。**
- **After 增强处理不管目标方法如何结束（保存成功完成和遇到异常中止两种情况），它都会被调用。**



##### 切入点（Pointcut）

是指在那些类或方法上在什么时机切入增强通知Advice，



##### 目标对象（Target）

表示目标对象，被增强/通知的对象



##### 织入（Weaving）

表示切入，也称为织入。将切面应用到目标对象从而创建一个新的代理对象的过程，可以简单理解为生成一个新的代理函数来执行目标函数的过程。






