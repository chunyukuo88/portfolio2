import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { Pencil } from 'src/components/Pencil/Pencil';
import { updateBlogPost } from 'src/common/utils';

import { mockStoreLoggedIn } from 'src/testUtils';
import Root from 'src/Root';

jest.mock('src/common/utils');
jest.spyOn(console, 'log').mockImplementation(jest.fn());

describe('GIVEN: an entityId and a blog post aspect (title, body, or imgUrl),', () => {
  describe('WHEN: the user clicks the pencil then confirms the updated aspect,', () => {
    test('THEN: the change is sent to the back end.', async() => {
      updateBlogPost.mockImplementationOnce(jest.fn());
      const aspect = 'title';
      const entityId = '123';
      const newTitle = 'a new title!';
      const expectedUpdate = {
        title: newTitle,
      };
      render(
        <Root store={mockStoreLoggedIn}>
          <Pencil aspect={aspect} entityId={entityId} aspect={'title'}/>
        </Root>
      );

      await waitFor(() => {
        const pencil = screen.queryByText('✏️');
        fireEvent.click(pencil);

        const textBox = screen.queryByRole('textbox');
        fireEvent.change(textBox, newTitle);

        const confirmationButton = screen.queryByText('Yeah');
        fireEvent.click(confirmationButton);

        expect(updateBlogPost).toBeCalledWith(expectedUpdate);
      });
    });
  });
});
