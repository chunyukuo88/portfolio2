import App from './App';
import { fireEvent, render } from '@testing-library/react';
import strings from './common/strings';
import 'react-router-dom';
import { routes } from './routes';

const { ENGLISH, CHINESE, RUSSIAN } = strings;

const mockNavFn = jest.fn();

jest.mock('react-router-dom', () => {
  const originalModule = jest.requireActual('react-router-dom');
  return {
    __esModule: true,
    ...originalModule,
    useNavigate: () => mockNavFn, // shows up as gray in WebStorm but this is actually being used. Proof: Change the spelling and tests break.
  };
});

afterEach(() => {
  jest.clearAllMocks();
});

describe('GIVEN: The application (App.jsx) has loaded.', ()=>{
  describe('WHEN: ', ()=>{
    test('THEN: ', ()=>{
      const { container } = render(<App />);

      const app = container.querySelector('.App');

      expect(app).toBeInTheDocument();
    });
  });
  describe('WHEN: The user clicks the language button thrice,', () => {
    test('THEN: The site cycles through the localization settings.', () => {
      const { container } = render(<App />);

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
      render(<App />);

      const homeButton = document.getElementById(buttonId);
      fireEvent.click(homeButton);

      expect(mockNavFn).toBeCalledWith(route);
    });
  });
  describe('WHEN: The user IS logged in and clicks the profile button,', () => {
    test.skip('THEN: the navigation method that takes them to Profile page is invoked.', () => {
      render(<App />);

      const profileButton = document.getElementById('profile-button');
      fireEvent.click(profileButton);

      expect(mockNavFn).toBeCalledWith(routes.profile);
    });
  });
});
