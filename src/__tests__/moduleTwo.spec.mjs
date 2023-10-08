import {
  describe, test, expect, jest,
} from '@jest/globals';
import axios from 'axios';
import { generateFibonacciSequence, getUsers } from '../moduleTwo.mjs';

jest.mock('axios');

describe('Test generateFibonacciSequence', () => {
  test('generates Fibonacci sequence correctly', () => {
    const sequence = generateFibonacciSequence(10);
    expect(sequence).toEqual([0, 1, 1, 2, 3, 5, 8, 13]);
  });

  test('throws an error when limit is less than or equal to 0', () => {
    expect(() => generateFibonacciSequence(0)).toThrow('Limit must be greater than 0');
    expect(() => generateFibonacciSequence(-5)).toThrow('Limit must be greater than 0');
  });
});

describe('Test getUsers', () => {
  test('throws an error when "Clementine" is found', async () => {
    const mockedUsers = [
      { id: 1, name: 'User 1' },
      { id: 2, name: 'Clementine' },
    ];

    const axiosGetSpy = jest.spyOn(axios, 'get');
    axiosGetSpy.mockResolvedValue({ data: mockedUsers });

    await expect(getUsers()).rejects.toThrow('Clementine is not allowed');

    axiosGetSpy.mockRestore();
  });

  test('returns users when "Clementine" is not found', async () => {
    const mockedUsers = [
      { id: 1, name: 'User 1' },
      { id: 2, name: 'User 2' },
    ];

    const axiosGetSpy = jest.spyOn(axios, 'get');
    axiosGetSpy.mockResolvedValue({ data: mockedUsers });

    const users = await getUsers();
    expect(users).toEqual(mockedUsers);

    axiosGetSpy.mockRestore();
  });

  test('throws an error when no users are found', async () => {
    const axiosGetSpy = jest.spyOn(axios, 'get');
    axiosGetSpy.mockResolvedValue({ data: [] });

    await expect(getUsers()).rejects.toThrow('No users found');

    axiosGetSpy.mockRestore();
  });
});
