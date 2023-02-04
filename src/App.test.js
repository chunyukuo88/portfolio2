import App from './App';
import {fireEvent, render, screen, waitFor} from '@testing-library/react';
import strings from './common/strings';
import 'react-router-dom';
import { routes } from './routes';
import Root from './Root';
import { store } from './globalState/store';
import { mockStore } from './testUtils';
import { supabaseClient } from './features/auth/client.js';


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
      const { container } = render(
        <Root store={store}>
          <App />
        </Root>
      );

      const app = container.querySelector('.App');

      expect(app).toBeInTheDocument();
    });
  });
  describe('WHEN: The user clicks the language button thrice,', () => {
    test('THEN: The site cycles through the localization settings.', () => {
      const { container } = render(
        <Root store={store}>
          <App />
        </Root>
      );

      let languageButton = container.querySelector('#language-button');
      expect(languageButton).toHaveTextContent(strings.language[ENGLISH]);

      fireEvent.click(languageButton);
      languageButton = container.querySelector('#language-button');
      expect(languageButton).toHaveTextContent(strings.language[CHINESE]);

      fireEvent.click(languageButton);
      languageButton = container.querySelector('#language-button');
      expect(languageButton).toHaveTextContent(strings.language[RUSSIAN]);

      fireEvent.click(languageButton);
      languageButton = container.querySelector('#language-button');
      expect(languageButton).toHaveTextContent(strings.language[ENGLISH]);
    });
  });
  describe('WHEN: The user is NOT logged in and clicks a navigation button,', () => {
    test.each`
      buttonId             |   route
      ${'home-button'}     |   ${routes.index}
      ${'counter-button'}  |   ${routes.counter}
      ${'login-button'}    |   ${routes.login}
  `('THEN: the navigation method that takes them to $route is invoked.', ({buttonId, route}) => {
      const { container } = render(
        <Root store={store}>
          <App />
        </Root>
      );

      const homeButton = document.getElementById(buttonId);
      fireEvent.click(homeButton);

      expect(mockNavFn).toBeCalledWith(route);
    });
  });
  describe('WHEN: The user IS logged in and clicks the profile button,', () => {
    describe('AND: clicks the profile button', () => {
      test('THEN: the navigation method that takes them to Profile page is invoked.', () => {
        const expectedGreeting = `Greetings, ${'test@test.com'}!`;
        render(
          <Root store={mockStore}>
            <App />
          </Root>
        );

        const profileButton = document.getElementById('profile-button');
        const greetingsString = screen.getByText(expectedGreeting);
        fireEvent.click(profileButton);

        expect(mockNavFn).toBeCalledWith(routes.profile);
        expect(greetingsString).toBeInTheDocument();
      });
    });
    describe('AND: clicks the logout button', () => {
      test('THEN: the supabaseClient method that logs them out is invoked.', async () => {
        const spySignout = jest.spyOn(supabaseClient.auth, 'signOut');
        const spyClear = jest.spyOn(Object.getPrototypeOf(localStorage), 'clear');

        render(
          <Root store={mockStore}>
            <App />
          </Root>
        );

        const profileButton = document.getElementById('logout-button');
        fireEvent.click(profileButton);

        expect(spySignout).toBeCalled();
        await waitFor(() => expect(spyClear).toBeCalled());
      });
    });
  });
});
