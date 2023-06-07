import { rest } from 'msw';
import { mockCrosswords, mockBlogs } from './mockData';

export const handlers = [
  rest.get('http://localhost:3000/crossword/allCrosswords', (req, res, context) => {
    return res(context.json(mockCrosswords));
  }),
  rest.get('http://localhost:3000/blog/getAll', (req, res, context) => {
    return res(context.json(mockBlogs));
  }),
];
