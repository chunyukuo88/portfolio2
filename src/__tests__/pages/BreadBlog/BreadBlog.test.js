import { render, waitFor } from '@testing-library/react';
import { BreadBlog } from 'src/pages/BreadBlog/BreadBlog';
import { mockStore } from 'src/testUtils';
import Root from 'src/Root';

describe('BreadBlog.jsx', () => {
  describe('GIVEN: the user is not logged in', () => {
    describe('WHEN: The page loads', () => {
      test('THEN: they see a blog entry with no editing tools.', async () => {
        render(
          <Root store={mockStore}>
            <BreadBlog/>
          </Root>
        );

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
