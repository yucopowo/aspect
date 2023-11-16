import Page, { PageType } from './Page';
import { beforeMethod, IBeforeJoinPoint } from '../src';

const PageBeforeAdvice = beforeMethod(
  Page,
  (joinPoint: IBeforeJoinPoint<undefined, PageType>) => {
    const args = joinPoint.args;
    const props = args[0];
    props.list.push(99);
  }
);

export default PageBeforeAdvice;
