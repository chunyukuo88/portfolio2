import { fireEvent, screen, waitFor } from '@testing-library/react';
import { renderWithQueryClient } from 'src/__msw__/testUtils';
import { mockStoreLoggedIn } from 'src/testUtils';

import { Pencil } from 'src/components/Pencil/Pencil';
import {createHttpRequest, updateBlogPost} from 'src/common/utils';

jest.mock('src/common/utils', () => {
  const originalModule = jest.requireActual('src/common/utils');
  return {
    __esModule: true,
    ...originalModule,
    updateBlogPost: jest.fn(),
  }
});
jest.spyOn(console, 'log').mockImplementation(jest.fn());

describe('GIVEN: an entityId and a blog post aspect (title, body, or imgUrl),', () => {
  const article = {
    title: 'Berry Bread!',
    imageUrl: 'https://czzbyiyicvjcorsepbfp.supabase.co/storage/v1/object/public/alexgochenour.xyz-blog-photos/z_Berry%20Bread-min.JPG',
    body: 'Yay bread.',
  };

  const aspect = 'title';
  const entityId = '123';
  describe('WHEN: the user clicks the pencil then confirms the updated aspect,', () => {
    test('THEN: the change is sent to the back end.', async() => {
      const newTitle = 'a new title!';
      const updated = JSON.parse(JSON.stringify(article));
      updated.title = newTitle;
      const requestContainingExpectedUpdate = createHttpRequest('PUT', undefined, updated);

      renderWithQueryClient(
        <Pencil
          aspect={aspect}
          entityId={entityId}
          article={article}
        />, mockStoreLoggedIn
      );

      const pencil = document.querySelector('svg');
      fireEvent.click(pencil);

      const textBox = document.querySelector('textarea');
      fireEvent.change(textBox, { target: { value: updated.title } });

      const confirmationButton = screen.queryByText('Confirm');
      fireEvent.click(confirmationButton);

      await waitFor(() => {
        expect(updateBlogPost).toBeCalledTimes(1);
        expect(updateBlogPost).toBeCalledWith(article.page, requestContainingExpectedUpdate);
      });
    });
  });
  describe('WHEN: the user clicks the pencil but then clicks on the button to cancel,', () => {
    test('THEN: the edit modal appears and disappears, respectively.', async () => {
      renderWithQueryClient(
        <Pencil
          aspect={aspect}
          entityId={entityId}
          article={article}
        />, mockStoreLoggedIn
      );

      let textBox = document.querySelector('textarea');
      expect(textBox).toBeNull();

      const pencil = document.querySelector('svg');
      fireEvent.click(pencil);

      textBox = document.querySelector('textarea');
      expect(textBox).toBeVisible();

      const cancellationButton = screen.queryByText('Nvrmnd');
      fireEvent.click(cancellationButton);

      textBox = screen.queryByRole('textbox');
      expect(textBox).toBeNull();
    });
  });
});
