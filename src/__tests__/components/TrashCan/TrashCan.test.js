import {fireEvent, render, screen} from '@testing-library/react';
import { TrashCan } from "src/common/TrashCan/TrashCan";

describe('WHEN: the administrator clicks on a little trashcan, ', () => {
  describe('AND: the administrator confirms,', () => {
    it('THEN: the blog article gets deleted.', () => {
      const article = {};
      const token = 'foo';
      render(
        <TrashCan
          article={article}
          token={token}
        />
      );
      const trashcanEmoji = screen.getAllByText('🗑')[0];

      fireEvent.click(trashcanEmoji);

      expect(deleteFn).toBeCalledTimes(1);
    });
  });
});
