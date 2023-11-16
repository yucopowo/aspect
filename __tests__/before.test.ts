import { before, beforeMethod, Before, IBeforeJoinPoint } from '../src';

describe('test before aspect', () => {
  test('test before property', () => {
    interface Page {
      render(num: number): string;
    }

    const logs: number[] = [];
    const NUM1 = 1;
    const NUM2 = 99;
    const page: Page = {
      render(num: number): string {
        logs.push(1);
        return `render${num}`;
      },
    };

    const aspect = before(page, 'render', function advice(
      joinPoint: IBeforeJoinPoint<Page>
    ) {
      logs.push(2);
      expect(joinPoint.args[0]).toBe(NUM1);
      joinPoint.setArg(0, NUM2);
    });

    expect(page.render(NUM1)).toBe(`render${NUM2}`);
    expect(logs).toStrictEqual([2, 1]);

    aspect.remove();
    expect(page.render(NUM1)).toBe(`render${NUM1}`);
  });

  test('test before method', () => {
    const logs: number[] = [];
    const NUM1 = 1;
    const NUM2 = 99;
    type Render = (num: number) => string;
    const render: Render = function render(num: number) {
      logs.push(1);
      return `render${num}`;
    };

    const proxy = beforeMethod(render, function advice(
      joinPoint: IBeforeJoinPoint<Render>
    ) {
      logs.push(2);
      joinPoint.setArg(0, NUM2);
    });
    expect(proxy(NUM1)).toBe(`render${NUM2}`);
    expect(logs).toStrictEqual([2, 1]);
  });

  test('test before decorator', () => {
    const logs: number[] = [];
    const NUM1 = 1;
    const NUM2 = 99;
    class Page {
      @Before((joinPoint: IBeforeJoinPoint<Page>) => {
        logs.push(1);
        joinPoint.setArg(0, NUM2);
      })
      render(num: number) {
        logs.push(2);
        return `render${num}`;
      }
    }

    const page = new Page();
    expect(page.render(NUM1)).toBe(`render${NUM2}`);
    expect(logs).toStrictEqual([1, 2]);
  });
});
