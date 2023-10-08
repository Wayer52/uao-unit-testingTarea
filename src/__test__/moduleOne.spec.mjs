// eslint-disable-next-line
import {
  jest, describe, test, expect,
} from '@jest/globals';

import axios from 'axios';
import { divide, getPosts } from '../moduleOne.mjs';

jest.mock('axios');

describe('Test divide', () => {
  test('a/b -> b is not 0', () => {
    expect(divide(10, 2)).toBe(5);
  });

  test('a/b -> b is 0', () => {
    expect(() => divide(5, 0)).toThrow('Error dividing by zero');
  });
});

describe('Test getPosts', () => {
  test('return posts when the response status is 200', async () => {
    const mockedPosts = [
      {
        userId: 1,
        id: 1,
        title: 'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
        body: 'quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto',
      },
      {
        userId: 1,
        id: 2,
        title: 'qui est esse',
        body: 'est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla',
      }];

    const axiosGetSpy = jest.spyOn(axios, 'get');
    axiosGetSpy.mockResolvedValue({ data: mockedPosts, status: 200 });

    const posts = await getPosts();

    expect(posts).toEqual(mockedPosts);

    axiosGetSpy.mockRestore();
  });

  test('throw an error when the response status is not 200', async () => {
    const axiosGetSpy = jest.spyOn(axios, 'get');

    axiosGetSpy.mockResolvedValue({ status: 404 });

    await expect(getPosts()).rejects.toThrow('Error fetching posts');

    axiosGetSpy.mockRestore();
  });

  test('data is not an Array', async () => {
    const mockedPosts = {
      userId: 1,
      id: 1,
      title: 'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
      body: 'quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto',
    };

    const axiosGetSpy = jest.spyOn(axios, 'get');
    axiosGetSpy.mockResolvedValue({ data: mockedPosts, status: 200 });

    await expect(getPosts()).rejects.toThrow('Data is not an array');

    axiosGetSpy.mockRestore();
  });

  test('no posts found', async () => {
    const mockedPosts = [];

    const axiosGetSpy = jest.spyOn(axios, 'get');
    axiosGetSpy.mockResolvedValue({ data: mockedPosts, status: 200 });

    await expect(getPosts()).rejects.toThrow('No posts found');

    axiosGetSpy.mockRestore();
  });

  test('too many posts', async () => {
    const mockedPosts = [{
      userId: 1,
      id: 1,
      title: '',
      body: '',
    },
    {
      userId: 1,
      id: 2,
      title: '',
      body: '',
    },
    {
      userId: 1,
      id: 3,
      title: '',
      body: '',
    },
    {
      userId: 1,
      id: 4,
      title: '',
      body: '',
    },
    {
      userId: 1,
      id: 5,
      title: '',
      body: '',
    },
    {
      userId: 1,
      id: 6,
      title: '',
      body: '',
    },
    {
      userId: 1,
      id: 7,
      title: '',
      body: '',
    },
    {
      userId: 1,
      id: 8,
      title: '',
      body: '',
    },
    {
      userId: 1,
      id: 9,
      title: '',
      body: '',
    },
    {
      userId: 1,
      id: 10,
      title: '',
      body: '',
    },
    {
      userId: 1,
      id: 11,
      title: '',
      body: '',
    },
    {
      userId: 1,
      id: 12,
      title: '',
      body: '',
    }];

    const axiosGetSpy = jest.spyOn(axios, 'get');
    axiosGetSpy.mockResolvedValue({ data: mockedPosts, status: 200 });

    await expect(getPosts()).rejects.toThrow('Too many posts');

    axiosGetSpy.mockRestore();
  });
});
