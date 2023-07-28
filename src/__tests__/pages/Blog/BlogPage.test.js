import { renderWithQueryClient } from 'src/__msw__/testUtils';
import { mockBlogs } from 'src/__msw__/mockData';
import { server } from 'src/__msw__/server';
import { mockStore, mockStoreLoggedIn } from 'src/testUtils';
import { screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { QueryClient } from '@tanstack/react-query';
import { rest } from 'msw';

// import { BlogPage } from 'src/pages/Blog/BlogPage';
import { routes } from 'src/routes';
import ReactGA from 'react-ga4';

const spy = jest.spyOn(ReactGA, 'send');
const payload = { hitType: 'pageview', page: routes.blog };

jest.spyOn(console, 'log').mockImplementation(jest.fn());
jest.spyOn(console, 'error').mockImplementation(jest.fn());

beforeAll(() => server.listen());
afterEach(() => {
  server.resetHandlers();
  jest.clearAllMocks();
});
afterAll(() => server.close());

// TODO: This component is no longer used but I am keeping these tests for reference.
describe.skip('BlogPage.jsx', () => {
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
  describe('GIVEN: there is an error on the blog server,', () => {
    describe('WHEN: regardless of the user\'s login status, and they visit the page,', () => {
      it('THEN: it shows an error message.', async () => {
        server.resetHandlers(
          rest.get(
            process.env.REACT_APP_GET_BLOG_ENTRIES,
            (req, res, context) => {
              return res(context.status(500));
            }
          )
        );

        const queryHandler = () => {
          console.error('teh server brokens!');
        };

        const client = new QueryClient({
          defaultOptions: {
            queries: {
              onError: queryHandler,
              retry: false,
            },
          }
        });

        renderWithQueryClient(<BlogPage />, mockStore, client);

        await waitFor(() => {
          const errorMessage = screen.getByText('Blogs are undergoing maintenance at this time. Perhaps try the crossword while you wait.');

          expect(errorMessage).toBeVisible();
        });
      });
    });
  });
});
