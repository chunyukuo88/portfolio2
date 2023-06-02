import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { TrashCan } from 'src/components/TrashCan/TrashCan';

import { deleteBlog } from 'src/common/utils';
import { mockStoreLoggedIn } from 'src/testUtils';
import Root from 'src/Root';

jest.mock('src/common/utils', () => ({
  createHttpRequest: () => {},
  deleteBlog: jest.fn(),
}));

describe('WHEN: the administrator clicks on a little trashcan, ', () => {
  describe('AND: the administrator confirms,', () => {
    it('THEN: the blog article gets deleted.',  () => {
      const article = {};
      const token = 'foo';
      render(
        <Root store={mockStoreLoggedIn}>
          <TrashCan
            article={article}
            token={token}
          />
        </Root>
      );

      const trashcanEmoji = screen.getByText('🗑');
      fireEvent.click(trashcanEmoji);
      const confirmationButton = screen.getByText('Yeah');
      fireEvent.click(confirmationButton);
      expect(deleteBlog).toBeCalledTimes(1);
    });
  });
});
