import { render, screen, waitFor } from '@testing-library/react';
import { store } from 'src/globalState/store';
import { storeWithUserLoggedIn } from 'src/__mocks__/mockStores';
import Root from 'src/Root';

import { BreadBlogArticle } from 'src/pages/BreadBlog/BreadBlogArticle';

const article = {
  title: 'English Muffins',
  imageUrl: 'https://czzbyiyicvjcorsepbfp.supabase.co/storage/v1/object/public/alexgochenour.xyz-blog-photos/english_muffins.JPG',
  body: 'A good English muffin recipe is not hard to come by. These delightful things are well worth the effort, which is minimal. Your very first batch will no doubt be successful, and even that unpracticed product will be superior to anything found on a store shelf by a factor of a thousand. The texture alone is reason to give it a try. Stop reading this blog and go make some now, please.',
  page: 5,
  articleId: 'd4a24c15-d72a-496e-bfeb-9888760ea86b',
  likes: 1,
  views: 1
};

describe('BreadBlogArticle.jsx', () => {
  describe('WHEN: the user is logged in', () => {
    beforeEach(() => {
      render(
        <Root store={storeWithUserLoggedIn}>
          <BreadBlogArticle article={article} />
        </Root>
      );
    });
    it('THEN: The pencil icons are visible', () => {
      const pencil = document.querySelector('svg');

      expect(pencil).toBeVisible();
    });
    it('THEN: The title has editing buttons', () => {
      const titleWithButtons = document.querySelector('.title-with-buttons');

      expect(titleWithButtons).toBeVisible();
    });
  });
  describe('GIVEN: the user is not logged in,', () => {
    describe('WHEN: the image has not loaded,', () => {
      test('THEN: it displays a spinner and the image is not visible.', () => {
        render(
          <Root store={store}>
            <BreadBlogArticle article={article} />
          </Root>
        );

        const loadingSpinner = document.querySelector('.loading-spinner-container');
        const imageAltText = screen.queryByAltText(/Image for blog titled/);

        expect(loadingSpinner).toBeVisible();
        expect(imageAltText).toBeInTheDocument();
      });
    });
    describe('WHEN: the img has not loaded,', () => {
      test('THEN: the spinner goes away and the image appears', () => {
        render(
          <Root store={store}>
            <BreadBlogArticle article={article} />
          </Root>
        );

        const loadingSpinner = document.querySelector('.loading-spinner-container');

        waitFor(() => {
          expect(loadingSpinner).not.toBeVisible();
          const imageAltText = screen.queryByAltText(/Image for blog titled/);
          expect(imageAltText).not.toBeInTheDocument();
        });
      });
    });
  });
});
