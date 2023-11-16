import { around, Around, IAroundJoinPoint } from '../src';

describe('test around aspect', () => {
  test('test around method aspect', () => {
    interface Page {
      render(num: number): string;
    }

    const logs: number[] = [];
    const NUM1 = 1;
    const NUM2 = 99;
    const NUM3 = 199;
    const page: Page = {
      render(num: number): string {
        logs.push(1);
        return `render${num}`;
      },
    };

    type Render = (num: number) => string;
    const aspect = around(page, 'render', function advice(
      joinPoint: IAroundJoinPoint<Page, Render>
    ) {
      logs.push(2);
      expect(joinPoint.args[0]).toBe(NUM1);
      expect(joinPoint.proceed()).toBe(`render${NUM1}`);
      const value = joinPoint.proceed(NUM3);
      logs.push(3);
      expect(value).toBe(`render${NUM3}`);
      return `render${NUM2}`;
    });

    expect(page.render(NUM1)).toBe(`render${NUM2}`);
    expect(logs).toStrictEqual([2, 1, 1, 3]);

    aspect.remove();
    expect(page.render(NUM1)).toBe(`render${NUM1}`);
  });

  test('test around decorator aspect', () => {
    type Render = (num: number) => string;
    class Page {
      @Around(function advice(joinPoint: IAroundJoinPoint<Page, Render>) {
        const value = joinPoint.proceed();
        return `${value}+`;
      })
      render() {
        return 'render';
      }
    }
    const page = new Page();
    expect(page.render()).toBe('render+');
  });

  test('test async method aspect', async () => {
    expect.assertions(3);

    interface Page {
      render(num: number): Promise<string>;
    }

    const logs: number[] = [];
    const NUM1 = 1;
    const NUM2 = 99;
    const NUM3 = 199;

    const page: Page = {
      render(num: number) {
        logs.push(1);
        return new Promise<string>((resolve) => {
          setTimeout(() => {
            resolve(`render${num}`);
          }, 0);
        });
      },
    };

    type Render = (num: number) => Promise<string>;
    around(page, 'render', async function advice(
      joinPoint: IAroundJoinPoint<Page, Render>
    ) {
      logs.push(2);
      // const value = await joinPoint.asyncProceed(NUM3);
      const value = await joinPoint.proceed(NUM3);
      logs.push(3);
      expect(value).toBe(`render${NUM3}`);
      return `render${NUM2}`;
    });

    expect(await page.render(NUM1)).toBe(`render${NUM2}`);
    expect(logs).toStrictEqual([2, 1, 3]);
  });
});
