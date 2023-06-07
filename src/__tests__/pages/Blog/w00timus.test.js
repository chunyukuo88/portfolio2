import { mockStore, mockStoreLoggedIn } from 'src/testUtils';
import {render, renderHook, screen, waitFor} from '@testing-library/react';

import { BlogPage } from 'src/pages/Blog/BlogPage';
import { routes } from 'src/routes';
import ReactGA from 'react-ga4';
import { mockBlogs } from '../../__msw__/mockData';
import {QueryCache, QueryClient} from "@tanstack/react-query";
import {rest} from "msw";
import {setupServer} from "msw/node";

const queryCache = new QueryCache();
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

const wrapper = ({ children }) => (
  <QueryClientProvider client={queryClient}>
    {children}
  </QueryClientProvider>
);

const server = setupServer(
  rest.get(process.env.REACT_APP_GET_BLOG_ENTRIES, (req, res, context) => res(context.json(mockBlogs))),
);

beforeEach(() => server.listen());
afterEach(() => {
  server.resetHandlers();
  queryCache.clear()
});
afterAll(() => server.close());

it('', () => {
  const { result, waitFor } = renderHook(render, { wrapper });

});