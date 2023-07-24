import { BreadBlog } from 'src/pages/BreadBlog/BreadBlog';
import { render } from '@testing-library/react';

describe('BreadBlog.jsx', () => {
  describe('GIVEN: the user is not logged in', () => {
    describe('WHEN: The page loads', () => {
      test('THEN: they see a blog entry with no editing tools.', () => {
        render(<BreadBlog/>);
        const title = document.querySelector('title');
        const body = document.querySelector('.blog-body');
        const pencil = document.querySelector('.img-pencil-adjuster');
        const trashcan = document.querySelector('.trashcan');

        expect(title).toBeInTheDocument();
        expect(body).toBeInTheDocument();
        expect(pencil).not.toBeInTheDocument();
        expect(trashcan).not.toBeInTheDocument();
      });
    });
  });
});
