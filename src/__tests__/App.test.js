import Root from 'src/Root';
import App from 'src/App';
import strings from 'src/common/strings';
import { routes } from 'src/routes';

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
const { ENGLISH, CHINESE, GERMAN } = strings;

afterEach(() => {
  jest.clearAllMocks();
});

const mockLogger = jest.fn();

describe('App.jsx', () => {
  describe('GIVEN: The user has NOT logged in.', ()=>{
    describe('WHEN: The user clicks the language button thrice,', () => {
      test('THEN: The site cycles through the localization settings.', () => {
        render(
          <Root store={store}>
            <App logger={mockLogger} />
          </Root>
        );

        let languageButton = document.querySelector('#language-button');
        expect(languageButton).toHaveTextContent(strings.language[ENGLISH]);

        fireEvent.click(languageButton);
        languageButton = document.querySelector('#language-button');
        expect(languageButton).toHaveTextContent(strings.language[CHINESE]);

        fireEvent.click(languageButton);
        languageButton = document.querySelector('#language-button');
        expect(languageButton).toHaveTextContent(strings.language[GERMAN]);

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
        ${'exercise-button'} |   ${routes.exercise}
    `('THEN: the navigation method that takes them to $route is invoked.', ({ buttonId, route }) => {
        render(
          <Root store={store}>
            <App logger={jest.fn()} />
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
            <App logger={jest.fn()} />
          </Root>
        );
        const publishPuzzleBlock = document.querySelectorAll('.menu-block')[2];
        fireEvent.click(publishPuzzleBlock);

        expect(mockNavFn).toBeCalledWith(routes.publishContent);
      });
    });
  });
});
