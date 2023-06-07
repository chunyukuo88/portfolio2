import { rest } from 'msw';
import { mockCrosswords, mockBlogs } from './mockData';

export const handlers = [
  rest.get(process.env.REACT_APP_GET_ALL_CROSSWORDS, (req, res, context) => res(context.json(mockCrosswords))),
  rest.get(process.env.REACT_APP_GET_BLOG_ENTRIES, (req, res, context) => res(context.json(mockBlogs))),
];
