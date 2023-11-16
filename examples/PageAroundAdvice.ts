import * as React from 'react';
import Page, { PageType } from './Page';
import { aroundMethod, IAroundJoinPoint } from '../src';

const h = React.createElement;
const PageAfterRunningAdvice = aroundMethod(
  Page,
  (joinPoint: IAroundJoinPoint<undefined, PageType>) => {
    console.log('PageAfterRunningAdvice');
    console.log(joinPoint);
    const [props] = joinPoint.args;
    return h('div', {}, [
      h('div', { key: '0' }, '====='),
      h(Page, {
        key: '1',
        ...props,
      }),
      h('div', { key: '2' }, '====='),
    ]);
  }
);

export default PageAfterRunningAdvice;
