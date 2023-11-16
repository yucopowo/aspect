import { afterRunning, IAfterRunningJoinPoint } from '../src';

interface Page {
  render(num: number): string;
}

describe('test afterRunning aspect', () => {
  test('test afterRunning method aspect', () => {
    const logs: number[] = [];
    const NUM = 1;
    const page: Page = {
      render(num: number): string {
        logs.push(1);
        return `render${num}`;
      },
    };

    type Render = (num: number) => string;
    // const advice: IAfterRunningAdvice<
    //   Page,
    //   Render,
    //   IAfterRunningJoinPoint<Page, Render>
    // > = function advice(
    //   joinPoint: IAfterRunningJoinPoint<Page, Render>,
    //   value: string
    // ) {
    //   logs.push(2);
    //   expect(value).toBe(`render${NUM}`);
    // };
    const aspect = afterRunning<Page, 'render', Render>(
      page,
      'render',
      function advice(
        joinPoint: IAfterRunningJoinPoint<Page, Render>,
        value: string
      ) {
        logs.push(2);
        expect(value).toBe(`render${NUM}`);
      }
    );

    expect(page.render(NUM)).toBe(`render${NUM}`);
    // expect(page.render(NUM)).toBe('after render');
    expect(logs).toStrictEqual([1, 2]);

    aspect.remove();
    expect(page.render(NUM)).toBe(`render${NUM}`);
  });

  test('test afterRunning method aspect when throw error', () => {
    const logs: number[] = [];
    const NUM = 1;
    const page: Page = {
      render(): never {
        logs.push(1);
        throw new Error('error');
      },
    };

    afterRunning(page, 'render', function advice(
      joinPoint: IAfterRunningJoinPoint<Page>
    ) {
      logs.push(2);
    });

    try {
      page.render(NUM);
    } catch (e) {
      logs.push(3);
      expect(e.message).toBe('error');
    }

    expect(logs).toStrictEqual([1, 3]);
  });
});
