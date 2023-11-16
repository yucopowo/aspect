import { afterThrowing, JoinPoint } from '../src';

interface Page {
  render(num: number): string;
}

describe('test afterThrowing aspect', () => {
  test('test afterThrowing method aspect', () => {
    const logs: number[] = [];
    const NUM = 1;
    const ERROR_NUM = 99;
    const page: Page = {
      render(num: number): string {
        logs.push(1);
        if (num === ERROR_NUM) {
          throw new Error('error');
        }
        return `render${num}`;
      },
    };

    expect(page.render(NUM)).toBe(`render${NUM}`);
    expect(logs).toStrictEqual([1]);
    logs.length = 0;

    const aspect = afterThrowing(page, 'render', function advice(
      joinPoint: JoinPoint<Page>
    ) {
      logs.push(2);
    });

    expect(page.render(NUM)).toBe(`render${NUM}`);
    expect(logs).toStrictEqual([1]);
    logs.length = 0;

    try {
      page.render(ERROR_NUM);
    } catch (e) {
      logs.push(3);
      expect(e.message).toBe('error');
    }
    expect(logs).toStrictEqual([1, 2, 3]);

    aspect.remove();
    logs.length = 0;
    try {
      page.render(ERROR_NUM);
    } catch (e) {
      logs.push(3);
      expect(e.message).toBe('error');
    }
    expect(logs).toStrictEqual([1, 3]);
  });
});
