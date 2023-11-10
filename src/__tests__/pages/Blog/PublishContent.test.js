import { NewBlogPost } from '../../../pages/BreadBlog/NewBlogPost';
import { mockStoreLoggedIn } from 'src/testUtils';
import { fireEvent, render, screen, waitFor} from '@testing-library/react';
import Root from 'src/Root';
import 'src/common/utils';

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

describe('NewBlogPost.jsx', () => {
  describe('GIVEN: the user wishes to publish a blog post,', () => {
    describe('AND: There is a problem with the server,', () => {
      let title, body, imageUrl;
      const error = 'there is a problem with the server.'
      mockFn = () => {
        console.error(error);
      }
      const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
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
      afterEach(() => {
        mockFn = jest.fn();
      });

      it('THEN: the error is logged to the console.', async () => {
        expect(errorSpy).toBeCalledWith(error);
      });
      it.skip('THEN: An error message is displayed in the publication panel.', async () =>{
        mockFn = () => undefined;
        await waitFor(() => {
          const errorMessage = screen.queryByTestId('failed-to-publish-blog');

          expect(errorMessage).toBeInTheDocument();
        });
      });
    });
  });
});
