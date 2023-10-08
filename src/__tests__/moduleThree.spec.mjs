// Modulo encargado de Juan José Saavedra Realpe (2210120)

import axios from 'axios';
import {
  describe, test, expect, jest,
} from '@jest/globals';
import { sortNumbers, getTodos } from '../moduleThree.mjs';

describe('moduleThree test', () => {
  test('sortNumbers HappyPath', () => {
    const input = [3, 1, 2];
    const expectedOutput = [1, 2, 3];
    expect(sortNumbers(input)).toEqual(expectedOutput);
  });

  test('sortNumbers when there is an empty array (no numbers provided)', () => {
    expect(() => sortNumbers([])).toThrow('No numbers provided');
  });

  test('getTodos HappyPath', async () => {
    const todos = await getTodos();
    expect(Array.isArray(todos)).toBe(true);
  });

  test('getTodos (Error fetching todos)', async () => {
    // Simulamos un error con un código de estado distinto a 200
    jest.spyOn(axios, 'get').mockResolvedValue({ status: 404, data: null });

    await expect(getTodos()).rejects.toThrow('Error fetching todos');

    // Restauramos el mock
    jest.restoreAllMocks();
  });

  test('getTodos (No todos found)', async () => {
    // Simulamos una respuesta exitosa con datos vacíos
    jest.spyOn(axios, 'get').mockResolvedValue({ status: 200, data: [] });

    await expect(getTodos()).rejects.toThrow('No todos found');

    // Restauramos el mock
    jest.restoreAllMocks();
  });

  test('getTodos (No completed todos found)', async () => {
    // Simulamos una respuesta exitosa con tareas no completadas
    jest.spyOn(axios, 'get').mockResolvedValue({ status: 200, data: [{ completed: false }] });

    await expect(getTodos()).rejects.toThrow('No completed todos found');

    // Restauramos el mock
    jest.restoreAllMocks();
  });
});
