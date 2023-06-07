import { renderWithQueryClient } from 'src/__tests__/__msw__/testUtils';
import { mockBlogs } from 'src/__tests__/__msw__/mockData';
import { server } from 'src/__tests__/__msw__/server';
import { mockStore, mockStoreLoggedIn } from 'src/testUtils';
import { screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';

import { BlogPage } from 'src/pages/Blog/BlogPage';
import { routes } from 'src/routes';
import ReactGA from 'react-ga4';

const spy = jest.spyOn(ReactGA, 'send');
const payload = { hitType: 'pageview', page: routes.blog };

// jest.spyOn(console, 'log').mockImplementation(jest.fn());
jest.spyOn(console, 'error').mockImplementation(jest.fn());

// msw boilerplate
beforeAll(() => server.listen());
afterEach(() => {
  server.resetHandlers();
  jest.clearAllMocks();
});
afterAll(() => server.close());

describe('GIVEN: The user is not logged in (as administrator), ', () => {
  beforeEach(() => {
    renderWithQueryClient(<BlogPage />, mockStore);
  });
  describe('WHEN: The page loads,', () => {
    it('THEN: renders properly', async () => {
      await waitFor(() => {
        const component = document.querySelector('main');
        expect(component).toBeInTheDocument();
      });
    });
    it('THEN: ReactGA sends info to Google Analytics.', () => {
      expect(spy).toBeCalledTimes(1);
      expect(spy).toBeCalledWith(payload);
    });
    it('THEN: It shows the first three blog posts.', async () => {
      await waitFor(() => {
        const blogTitle0 = screen.getByText(mockBlogs[0].title);
        const blogTitle1 = screen.getByText(mockBlogs[1].title);
        const blogTitle2 = screen.getByText(mockBlogs[2].title);

        expect(blogTitle0).toBeInTheDocument();
        expect(blogTitle1).toBeInTheDocument();
        expect(blogTitle2).toBeInTheDocument();
      });
    });
    it('THEN: little trashcans are NOT rendered next to each blog post title.', () => {
      const trashcanEmoji = screen.queryAllByText('🗑');

      expect(trashcanEmoji).toHaveLength(0);
    });
    it('THEN: no pencil emoji appears.', () => {
      const pencil = screen.queryAllByText('✏️');

      expect(pencil).toHaveLength(0);
    });
  });
});
describe('GIVEN: The user is an administrator, ', () => {
  beforeEach(() => {
    renderWithQueryClient(<BlogPage />, mockStoreLoggedIn);
  });
  describe('WHEN: The page loads,', () => {
    it('THEN: little trashcans are rendered next to each blog post title.', async  () => {
      await waitFor(() => {
        const trashcanEmoji = screen.getAllByText('🗑')[0];

        expect(trashcanEmoji).toBeInTheDocument();
      });
    });
    it('THEN: a little pencil appears next to each title.', async () => {
      await waitFor(() => {
        const pencil = screen.queryAllByText('✏️')[0];

        expect(pencil).toBeInTheDocument();
      })
    });
  });
});
