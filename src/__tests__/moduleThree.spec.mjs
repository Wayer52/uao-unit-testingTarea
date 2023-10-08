import { describe, test, expect } from '@jest/globals';
import { sortNumbers, getTodos } from '../moduleThree.mjs';

describe('moduleThree test', () => {
  test('sortNumbers', () => {
    const input = [3, 1, 2];
    const expectedOutput = [1, 2, 3];
    expect(sortNumbers(input)).toEqual(expectedOutput);
  });

  test('getTodos', async () => {
    const todos = await getTodos();
    expect(Array.isArray(todos)).toBe(true);
  });
});
