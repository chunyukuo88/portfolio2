import Root from '../Root';
import App from '../App';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider } from 'react-redux';
import strings from '../common/strings';
import { routes } from '../routes';

import { fireEvent, render } from '@testing-library/react';
import { mockStoreLoggedIn } from '../testUtils';
import { store } from '../app/store';
import '@testing-library/jest-dom';
import 'react-router-dom';
import 'react-dom';

const mockNavFn = jest.fn();
jest.mock('react-router-dom', () => {
  const originalModule = jest.requireActual('react-router-dom');
  return {
    __esModule: true,
    ...originalModule,
    useNavigate: () => mockNavFn, // shows up as gray in JetBrains IDEs, but this is indeed being used. Proof: Change its spelling and tests break.
  };
});
const { ENGLISH, CHINESE, RUSSIAN } = strings;

afterEach(() => {
  jest.clearAllMocks();
});

const queryClient = new QueryClient();

describe('App.jsx', () => {
  describe('GIVEN: The user has NOT logged in.', ()=>{
    describe('WHEN: The user clicks the language button thrice,', () => {
      test('THEN: The site cycles through the localization settings.', () => {
        render(
          <QueryClientProvider client={queryClient}>
            <Provider store={store}>
              <App />
            </Provider>
          </QueryClientProvider>
        );

        let languageButton = document.querySelector('#language-button');
        expect(languageButton).toHaveTextContent(strings.language[ENGLISH]);

        fireEvent.click(languageButton);
        languageButton = document.querySelector('#language-button');
        expect(languageButton).toHaveTextContent(strings.language[CHINESE]);

        fireEvent.click(languageButton);
        languageButton = document.querySelector('#language-button');
        expect(languageButton).toHaveTextContent(strings.language[RUSSIAN]);

        fireEvent.click(languageButton);
        languageButton = document.querySelector('#language-button');
        expect(languageButton).toHaveTextContent(strings.language[ENGLISH]);
      });
    });
    describe('WHEN: The user clicks a navigation button,', () => {
      test.each`
        buttonId             |   route
        ${'puzzle-button'}   |   ${routes.puzzle}
        ${'blog-button'}     |   ${routes.blog}
        ${'login-button'}    |   ${routes.login}
    `('THEN: the navigation method that takes them to $route is invoked.', ({buttonId, route}) => {
        render(
          <QueryClientProvider client={queryClient}>
            <Provider store={store}>
              <App />
            </Provider>
          </QueryClientProvider>
        );

        const homeButton = document.getElementById(buttonId);
        fireEvent.click(homeButton);

        expect(mockNavFn).toBeCalledWith(route);
      });
    });
  });
  describe('GIVEN: the user has logged in', () => {
    describe('WHEN: the user clicks the publish crossword puzzle menu ', () => {
      it('THEN: they get routed to the publish puzzle page.', () => {
        render(
          <QueryClientProvider client={queryClient}>
            <Provider store={mockStoreLoggedIn}>
              <App />
            </Provider>
          </QueryClientProvider>
        );
        const publishPuzzleBlock = document.querySelectorAll('.menu-block')[2];
        fireEvent.click(publishPuzzleBlock);

        expect(mockNavFn).toBeCalledWith(routes.publishCrossword);
      });
    });
  });
});
