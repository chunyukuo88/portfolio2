import App from './App';
import {fireEvent, render, screen, waitFor} from '@testing-library/react';
import strings from './common/strings';
import 'react-router-dom';
import { routes } from './routes';
import Root from './Root';
import { store } from './app/store';
import { mockStore } from './testUtils';
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

describe('GIVEN: The application (App.jsx) has loaded.', ()=>{
  describe('WHEN: ', ()=>{
    test('THEN: ', ()=>{
      render(
        <Root store={store}>
          <App />
        </Root>
      );

      const app = document.querySelector('.App');

      expect(app).toBeInTheDocument();
    });
  });
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
  describe('WHEN: The user is NOT logged in and clicks a navigation button,', () => {
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
