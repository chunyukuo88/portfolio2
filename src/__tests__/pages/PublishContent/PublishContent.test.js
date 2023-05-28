import { PublishContentPage } from 'src/pages/PublishContent/PublishContentPage';
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

describe('PublishContentPage.jsx', () => {
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
            <PublishContentPage/>
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
  describe('GIVEN: the user wishes to publish a new crossword puzzle,', () => {
    describe('WHEN: The page loads,', () => {
      test('THEN: there is a panel allowing the user to publish new crosswords.', () => {
        render(
          <Root store={mockStoreLoggedIn}>
            <PublishContentPage/>
          </Root>
        );
        const publishPanel = screen.getByText('Create a New Crossword');

        expect(publishPanel).toBeInTheDocument();
      });
    });
    describe('WHEN: The has filled in all the crossword fields and submits,', () => {
      test('THEN: the data they entered is sent to the API.', () => {
        render(
          <Root store={mockStoreLoggedIn}>
            <PublishContentPage/>
          </Root>
        );

        const solution = screen.getByTestId('crossword-panel-solution');
        const title = screen.getByTestId('crossword-panel-title');
        const theme = screen.getByTestId('crossword-panel-theme');
        const across1 = screen.getByTestId('crossword-panel-across-1');
        const across2 = screen.getByTestId('crossword-panel-across-2');
        const across3 = screen.getByTestId('crossword-panel-across-3');
        const across4 = screen.getByTestId('crossword-panel-across-4');
        const across5 = screen.getByTestId('crossword-panel-across-5');
        const down1 = screen.getByTestId('crossword-panel-down-1');
        const down2 = screen.getByTestId('crossword-panel-down-2');
        const down3 = screen.getByTestId('crossword-panel-down-3');
        const down4 = screen.getByTestId('crossword-panel-down-4');
        const down5 = screen.getByTestId('crossword-panel-down-5');
        const button = screen.getAllByText('Publish')[1];

        fireEvent.change(solution, { target: { value: '1234512345123451234512345' } });
        fireEvent.change(title, { target: { value: 'title' } });
        fireEvent.change(theme, { target: { value: 'theme' } });
        fireEvent.change(across1, { target: { value: 'The numbers 12345' } });
        fireEvent.change(across2, { target: { value: 'The numbers 12345 a second time' } });
        fireEvent.change(across3, { target: { value: 'The numbers 12345 yet again' } });
        fireEvent.change(across4, { target: { value: 'The numbers 12345 a fourth time' } });
        fireEvent.change(across5, { target: { value: 'The numbers 12345 one last time' } });
        fireEvent.change(down1, { target: { value: 'the numbers 11111' } });
        fireEvent.change(down2, { target: { value: 'the numbers 22222' } });
        fireEvent.change(down3, { target: { value: 'the numbers 33333' } });
        fireEvent.change(down4, { target: { value: 'the numbers 44444' } });
        fireEvent.change(down5, { target: { value: 'the numbers 55555' } });
        fireEvent.click(button);

        expect(mockFn).toBeCalledTimes(1);
      });
    });
  });
});
