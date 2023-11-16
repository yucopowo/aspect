import { after, IAfterJoinPoint } from '../src';

describe('test after aspect', () => {
  test('test after method aspect', () => {
    interface Page {
      render(num: number): string;
    }

    const logs: number[] = [];
    const NUM = 1;
    const page: Page = {
      render(num: number): string {
        logs.push(1);
        return `render${num}`;
      },
    };

    const aspect = after(page, 'render', function advice(
      joinPoint: IAfterJoinPoint<Page>
    ) {
      logs.push(2);
    });

    expect(page.render(NUM)).toBe(`render${NUM}`);
    expect(logs).toStrictEqual([1, 2]);

    logs.length = 0;
    aspect.remove();
    expect(page.render(NUM)).toBe(`render${NUM}`);
    expect(logs).toStrictEqual([1]);
  });

  test('test after async method aspect', async () => {
    expect.assertions(2);
    interface Page {
      render(num: number): Promise<string>;
    }

    const logs: number[] = [];
    const NUM = 1;
    const page: Page = {
      render(num: number): Promise<string> {
        logs.push(1);
        return new Promise<string>((resolve) => {
          resolve(`render${num}`);
        });
      },
    };

    after(page, 'render', function advice(joinPoint: IAfterJoinPoint<Page>) {
      logs.push(2);
    });

    expect(await page.render(NUM)).toBe(`render${NUM}`);
    expect(logs).toStrictEqual([1, 2]);
  });

  test('test after method aspect when throw error', () => {
    interface Page {
      render(num: number): string;
    }

    const logs: number[] = [];
    const NUM = 1;
    const page: Page = {
      render(): never {
        logs.push(1);
        throw new Error('error');
      },
    };

    after(page, 'render', function advice(joinPoint: IAfterJoinPoint<Page>) {
      logs.push(2);
      // expect(joinPoint.value).toBeUndefined();
      expect(joinPoint.args[0]).toBe(NUM);
    });

    try {
      page.render(NUM);
    } catch (e) {
      logs.push(3);
      expect(e.message).toBe('error');
    }

    expect(logs).toStrictEqual([1, 2, 3]);
  });
});
