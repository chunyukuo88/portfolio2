import App from './App';
import {fireEvent, render} from "@testing-library/react";
import strings from "./common/strings";

const { ENGLISH, CHINESE, RUSSIAN } = strings;

describe('GIVEN: ', ()=>{
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
  describe('WHEN: The user clicks the language button twice,', () => {
    test('THEN: The site switches to Russian', () => {
      //
    });
  });
});
