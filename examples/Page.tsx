import * as React from 'react';

export interface Props {
  list: number[];
}

export type PageType = React.FC<Props>;

const Page: PageType = (props: Props) => {
  console.log(props);
  return (
    <div>
      {props.list.map((item: number) => (
        <div key={item}>{item}</div>
      ))}
    </div>
  );
};
export default Page;
// import { beforeMethod, IBeforeJoinPoint } from '../src';
// export default class Page extends React.Component {
//   // @Before(() => {
//   //   // console.log('page before render 1');
//   // })
//   render() {
//     return <div>page</div>;
//   }
// }
//
// before(Page.prototype, 'render', () => {
//   console.log('before advice');
// });
// type PageType = React.FC<{}>;
// const Page: PageType = () => {
//   // const self = this;
//   // console.log(this);
//   return <div>=======</div>;
// };
// export default beforeMethod(Page, (joinPoint: IBeforeJoinPoint<PageType>) => {
//   const context = joinPoint.context;
//   console.log(context);
//   console.log('before advice');
// });
