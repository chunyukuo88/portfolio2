import { fireEvent, screen, waitFor } from '@testing-library/react';
import { renderWithQueryClient } from 'src/__msw__/testUtils';
import { mockStoreLoggedIn } from 'src/testUtils';

import { Pencil } from 'src/components/Pencil/Pencil';

jest.spyOn(console, 'log').mockImplementation(jest.fn());

describe('GIVEN: an entityId and a blog post aspect (title, body, or imgUrl),', () => {
  describe('WHEN: the user clicks the pencil then confirms the updated aspect,', () => {
    test('THEN: the loading spinner appears.', async () => {
      const expectedUpdate = { title: 'a new title!' };
      renderWithQueryClient(
        <Pencil
          aspect={'title'}
          entityId={123}
          article={{ title: 'something' }}
        />, mockStoreLoggedIn
      );

      const pencil = document.querySelector('svg');
      fireEvent.click(pencil);

      const textBox = document.querySelector('textarea');
      fireEvent.change(textBox, { target: { value: expectedUpdate.title } });

      const confirmationButton = screen.queryByText('Confirm');
      fireEvent.click(confirmationButton);

      await waitFor(() => {
        const spinner = document.querySelector('.loading-spinner-container');
        expect(spinner).toBeVisible();
      });
    });
  });
});
