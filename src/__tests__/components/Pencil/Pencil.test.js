import { fireEvent, screen, waitFor } from '@testing-library/react';
import { renderWithQueryClient } from 'src/__msw__/testUtils';
import { mockStoreLoggedIn } from 'src/testUtils';

import { Pencil } from 'src/components/Pencil/Pencil';
import { updateBlogPost } from 'src/common/utils';

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
  describe('WHEN: the user clicks the pencil then confirms the updated aspect,', () => {
    test('THEN: the change is sent to the back end.', async() => {
      const article = {
        entityId: 123,
        title: 'some title',
      };
      const aspect = 'title';
      const entityId = '123';
      const newTitle = 'a new title!';
      const expectedUpdate = { title: newTitle };
      const requestContainingExpectedUpdate = {
        body: "{\"title\":\"a new title!\"}",
        headers: {
          Authorization: 'Bearer undefined',
          'Content-Type': 'application/json',
        },
        method: 'PUT',
      };
      renderWithQueryClient(
        <Pencil
          aspect={aspect}
          entityId={entityId}
          article={article}
        />, mockStoreLoggedIn
      );

      const pencil = screen.queryByText('✏️');
      fireEvent.click(pencil);

      const textBox = screen.queryByRole('textbox');
      fireEvent.change(textBox, { target: { value: expectedUpdate.title } });

      const confirmationButton = screen.queryByText('Confirm');
      fireEvent.click(confirmationButton);

      await waitFor(() => {
        expect(updateBlogPost).toBeCalledTimes(1);
        expect(updateBlogPost).toBeCalledWith(article.entityId, requestContainingExpectedUpdate);
      });
    });
  });
});
