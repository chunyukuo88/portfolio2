import App from './App';
import { fireEvent, render } from '@testing-library/react';
import strings from './common/strings';
import 'react-router-dom';
import { routes } from './routes';
import Root from './Root';
import { store } from './app/store';
import { mockStoreLoggedIn } from './testUtils';
import '@testing-library/jest-dom';
import 'react-dom';

const mockNavFn = jest.fn();
jest.mock('react-router-dom', () => {
  const originalModule = jest.requireActual('react-router-dom');
  return {
    __esModule: true,
    ...originalModule,
    useNavigate: () => mockNavFn, // shows up as gray in WebStorm but this is actually being used. Proof: Change the spelling and tests break.
  };
});
const { ENGLISH, CHINESE, RUSSIAN } = strings;


afterEach(() => {
  jest.clearAllMocks();
});

describe('App.jsx', () => {
  describe('GIVEN: The user has not logged in.', ()=>{
    describe('WHEN: The user clicks the language button thrice,', () => {
      test('THEN: The site cycles through the localization settings.', () => {
        render(
          <Root store={store}>
            <App />
          </Root>
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
          <Root store={store}>
            <App />
          </Root>
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
          <Root store={mockStoreLoggedIn}>
            <App />
          </Root>
        );
        const publishPuzzleBlock = document.querySelectorAll('.menu-block')[2];
        fireEvent.click(publishPuzzleBlock);

        expect(mockNavFn).toBeCalledWith(routes.publishCrossword);
      });
    });
  });
});
