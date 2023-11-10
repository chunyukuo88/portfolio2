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
  describe('WHEN: they submit the filled out form', () => {
    let title, body, imageUrl;

    beforeEach(() => {
      render(
        <Root store={mockStoreLoggedIn}>
          <NewBlogPost/>
        </Root>
      );

      title = screen.getByTestId('blog-panel-title');
      body = screen.getByTestId('blog-panel-body');
      imageUrl = screen.getByTestId('blog-panel-img');

      fireEvent.change(title, { target: { value: 'some title' } });
      fireEvent.change(body, { target: { value: 'some body' } });
      fireEvent.change(imageUrl, { target: { value: 'some imageUrl' } });

      const submissionButton = screen.getByTestId('blog-submission-btn');

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
      title = screen.getByTestId('blog-panel-title');
      body = screen.getByTestId('blog-panel-body');
      imageUrl = screen.getByTestId('blog-panel-img');

      expect(title).toHaveTextContent('');
    });
  });
});