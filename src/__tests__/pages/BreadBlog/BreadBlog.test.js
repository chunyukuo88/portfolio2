import { renderWithQueryClient } from 'src/__msw__/testUtils';
import { mockBlogs } from 'src/__msw__/mockData';
import { server } from 'src/__msw__/server';
import { mockStore, mockStoreLoggedIn } from 'src/testUtils';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { QueryClient } from '@tanstack/react-query';
import { rest } from 'msw';

import { BreadBlog } from 'src/pages/BreadBlog/BreadBlog';

// beforeAll(() => server.listen());
// afterEach(() => {
//   server.resetHandlers();
//   jest.clearAllMocks();
// });
// afterAll(() => server.close());

describe('BreadBlog.jsx', () => {
  describe('GIVEN: the user is not logged in', () => {
    describe('WHEN: The page loads', () => {
      test('THEN: they see a blog entry with no editing tools.', async () => {
        renderWithQueryClient(<BreadBlog/>, mockStore);

        await waitFor(() => {
          const title = document.querySelector('.blog-title-without-buttons');
          const body = document.querySelector('.blog-body');
          const pencil = document.querySelector('.img-pencil-adjuster');
          const trashcan = document.querySelector('.trashcan');

          expect(title).toBeInTheDocument();
          expect(body).toBeInTheDocument();
          expect(pencil).toBeInTheDocument();
          expect(trashcan).not.toBeInTheDocument();
        });
      });
    });
  });
});
