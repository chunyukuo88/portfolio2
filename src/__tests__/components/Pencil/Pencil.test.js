import { fireEvent, render, screen } from '@testing-library/react';
import { Pencil } from 'src/components/Pencil/Pencil';
import { updateBlogPost } from 'src/common/utils';

import { mockStoreLoggedIn } from 'src/testUtils';
import Root from 'src/Root';

jest.mock('src/common/utils');
jest.spyOn(console, 'log').mockImplementation(jest.fn());

describe('GIVEN: an entityId and a blog post aspect (title, body, or imgUrl),', () => {
  describe('WHEN: the user clicks the pencil then confirms the updated aspect,', () => {
    test.skip('THEN: the change is sent to the back end.', async() => {
      updateBlogPost.mockImplementationOnce(() => {});
      const aspect = 'title';
      const entityId = '123';
      const newTitle = 'a new title!';
      const expectedUpdate = {
        title: newTitle,
      };
      render(
        <Root store={mockStoreLoggedIn}>
          <Pencil aspect={aspect} entityId={entityId}/>
        </Root>
      );

      const pencil = screen.queryByText('✏️');
      fireEvent.click(pencil);

      const textBox = screen.queryByRole('textbox');
      const confirmationButton = screen.queryByText('Confirm');

      fireEvent.change(textBox, { target: { value: expectedUpdate.title } });

      fireEvent.click(confirmationButton);

      expect(updateBlogPost).toBeCalledTimes(1);
      expect(updateBlogPost).toBeCalledWith(expectedUpdate);
    });
  });
});
