import { NewBlogPost } from 'src/pages/BreadBlog/NewBlogPost';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { mockStoreLoggedIn } from 'src/testUtils';
import Root from 'src/Root';

let mockFn = jest.fn();
jest.mock('src/common/utils', () => {
  const originalModule = jest.requireActual('src/common/utils');
  return {
    __esModule: true,
    ...originalModule,
    postData: () => mockFn(),
  };
});
afterEach(() => {
  jest.clearAllMocks();
});


describe('GIVEN: There are no problems with the server,', () => {
  describe('WHEN: they click the plus button', () => {
    it('THEN: the editable sections appear.', () => {
      let title, body, imageUrl;

      render(
        <Root store={mockStoreLoggedIn}>
          <NewBlogPost/>
        </Root>
      );
      title = screen.queryByTestId('blog-panel-title');
      body = screen.queryByTestId('blog-panel-body');
      imageUrl = screen.queryByTestId('blog-panel-img');

      expect(title).toBeNull();
      expect(body).toBeNull();
      expect(imageUrl).toBeNull();

      const plusSignButton = screen.getByText('+');

      fireEvent.click(plusSignButton);

      title = document.querySelectorAll('.publish-panel-input')[0];
      body = document.querySelectorAll('.publish-panel-input')[1];
      imageUrl = document.querySelectorAll('.publish-panel-input')[2];

      expect(title).toBeVisible();
      expect(body).toBeVisible();
      expect(imageUrl).toBeVisible();
    });
  });
  describe('WHEN: they submit the filled out form', () => {
    let title, body, imageUrl;

    beforeEach(() => {
      render(
        <Root store={mockStoreLoggedIn}>
          <NewBlogPost/>
        </Root>
      );

      const plusSignButton = screen.getByText('+');
      fireEvent.click(plusSignButton);

      title = document.querySelectorAll('.publish-panel-input')[0];
      body = document.querySelectorAll('.publish-panel-input')[1];
      imageUrl = document.querySelectorAll('.publish-panel-input')[2];

      fireEvent.change(title, { target: { value: 'some title' } });
      fireEvent.change(body, { target: { value: 'some body' } });
      fireEvent.change(imageUrl, { target: { value: 'some imageUrl' } });

      const submissionButton = document.querySelector('#publish-panel-button');

      fireEvent.click(submissionButton);
    });
    it('THEN: that data is sent to the Lambda.', () => {
      expect(mockFn).toBeCalledTimes(1);
    });
    it('THEN: success message in the panel is displayed.', async () => {
      await waitFor(() => {
        const h1Element = screen.queryByText('The blog post has been published successfully.');

        expect(h1Element).toBeInTheDocument();
      });
    });
    it('THEN: the inputs are cleared.', () => {
      title = document.querySelectorAll('.publish-panel-input')[0];
      body = document.querySelectorAll('.publish-panel-input')[1];
      imageUrl = document.querySelectorAll('.publish-panel-input')[2];

      expect(title).toHaveTextContent('');
    });
  });
});
