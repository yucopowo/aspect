import { afterRunningMethod, IAfterRunningJoinPoint } from '../src';
interface Page {
  render(): void;
}

type Render = (page: Page) => Promise<string>;

function render(page: Page): Promise<string> {
  console.log('render');
  page.render();
  return new Promise<string>((resolve) => {
    resolve('render');
  });
}

(async () => {
  const proxy = afterRunningMethod<Render, Render>(
    render,
    (
      joinPoint: IAfterRunningJoinPoint<Render, Render>,
      value: Promise<string>
    ) => {
      // console.log('before');
      // const args = joinPoint.args;
      // console.log(args);
      // const page = args[0];
      // page.render();
      console.log(value);
    }
  );
  const page: Page = {
    render(): void {
      console.log('page render');
    },
  };
  const result = await proxy(page);
  console.log('result:', result);
})();

// import { beforeMethod, IAroundJoinPoint } from '../src';
// interface Page {
//   render(): void;
// }
//
// type Render = (page: Page) => string;
//
// function render(page: Page): string {
//   console.log('render');
//   page.render();
//   return `render`;
// }
//
// (() => {
//   const proxy = beforeMethod<Render, Render>(
//     render,
//     (joinPoint: IAroundJoinPoint<Render, Render>) => {
//       console.log('before');
//       const args = joinPoint.args;
//       console.log(args);
//       const page = args[0];
//       page.render();
//     }
//   );
//   const page: Page = {
//     render(): void {
//       console.log('page render');
//     },
//   };
//   proxy(page);
// })();

// import { around, IAroundJoinPoint } from '../src';
//
// interface Page {
//   render(num: number): Promise<string>;
// }
//
// const NUM1 = 1;
// const NUM2 = 99;
// const NUM3 = 199;
//
// const page: Page = {
//   render(num: number) {
//     return new Promise<string>((resolve) => {
//       setTimeout(() => {
//         resolve(`render${num}`);
//       }, 10);
//     });
//   },
// };
//
// type Render = (num: number) => Promise<string>;
// around(page, 'render', async function advice(
//   joinPoint: IAroundJoinPoint<Page, Render>
// ) {
//   const value = await joinPoint.proceed(NUM3);
//   console.log(value);
//   return `render${NUM2}`;
// });
//
// (async () => {
//   console.log(await page.render(NUM1));
// })();

// import { afterRunning, IJoinPoint, IAfterRunningAdvice } from '../src';
//
// interface Page {
//   render(): string;
// }
// const page: Page = {
//   render() {
//     console.log('render');
//     return 'render';
//   },
// };
//
// type Render = () => string;
// function createAdvice(joinPoint: IJoinPoint<Page, Render>, value: any) {
//   console.log(joinPoint, value);
// }
//
// const advice: IAfterRunningAdvice<
//   Page,
//   Render,
//   IJoinPoint<Page, Render>
// > = createAdvice;
// afterRunning(page, 'render', advice);
// afterRunning(page, 'render', function advice(
//   joinPoint: JoinPoint<Page>,
//   value: string
// ) {
//   console.log('page after render 1111');
//   console.log(joinPoint);
//   // joinPoint.setArg(0, { num: 999 });
// });
// page.render();

//
// before<Page, 'render', Render>(Page.prototype, 'render', function advice(
//   joinPoint: JoinPoint<Page>
// ) {
//   console.log('page before render 0');
//   console.log(joinPoint);
//   // joinPoint.setArg(0, { num: 999 });
// });

// interface IPage {
//   render(): void;
// }
// const page: IPage = {
//   render() {
//     console.log('render');
//   },
// };

// before(page, 'render', function advice(joinPoint: JoinPoint<Page>) {
//   console.log('page before render 0');
//   console.log(joinPoint);
// });

// Before<IPage>(function advice(joinPoint: JoinPoint<Page>) {
//   console.log('page before render 0');
//   console.log(joinPoint);
// })(page, 'render', {
//   // value: function value() {
//   //   console.log('=======');
//   // },
//   value: page.render,
//   // writable: true,
//   // enumerable: true,
//   // configurable: true,
// } as PropertyDescriptor);

// page.render();

// const render = Page.prototype.render;
//
// Before<Page>(function advice(joinPoint: JoinPoint<Page>) {
//   console.log('page before render 0');
//   console.log(joinPoint);
// })();

// Object.defineProperty(Page.prototype, 'render', {
//   value:
//   // get() {
//   //   debugger
//   //   return render;
//   // },
// });

// Before<Page>(function advice(joinPoint: JoinPoint<Page>) {
//   console.log('page before render 0');
//   console.log(joinPoint);
// });

// import * as React from 'react';
// import { Before, after, Around } from '../src';
//
// export default class Page extends React.Component {
//   @Before(() => {
//     console.log('page before render');
//   })
//   @Around(() => {
//     return <div>=====</div>;
//   })
//   render() {
//     return <div>page</div>;
//   }
// }
//
// after(Page.prototype, 'render', function advice() {
//   console.log('page after render 1');
// });
//
// after(Page.prototype, 'render', function advice() {
//   console.log('page after render 2');
// });
