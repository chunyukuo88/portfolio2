import { AboutMe } from 'src/components';
import { render } from '@testing-library/react';
import Root from 'src/Root';
import { store } from 'src/globalState/store';
import { storeWithGermanDefault } from 'src/__mocks__/mockStores';

describe('GIVEN: the component loads', () => {
  describe('WHEN: the menu is open', () => {
    test('THEN: the article looks blurry.', () => {
      render(
        <Root store={store}>
          <AboutMe menuIsOpen={true} />
        </Root>
      );

      const article = document.querySelector('article');

      expect(article).toHaveClass('blurry');
    });
  });
  describe('WHEN: the menu is closed', () => {
    test('THEN: the article looks clear.', () => {
      render(
        <Root store={store}>
          <AboutMe menuIsOpen={false} />
        </Root>
      );

      const article = document.querySelector('article');

      expect(article).not.toHaveClass('blurry');
    });
  });
  describe('WHEN: the language is set to German', () => {
    test('THEN: the font size is adjusted.', () => {
      render(
        <Root store={storeWithGermanDefault}>
          <AboutMe menuIsOpen={false} />
        </Root>
      );
      const expectedStyle = {
        fontSize: '1rem',
      };

      const article = document.querySelector('section');

      expect(article).toHaveStyle(expectedStyle);
    });
  });
  describe('WHEN: the language is not German', () => {
    test('THEN: the font size is inherited from its parent component..', () => {
      render(
        <Root store={store}>
          <AboutMe menuIsOpen={false} />
        </Root>
      );
      const expectedStyle = {
        fontSize: '1rem',
      };

      const article = document.querySelector('section');

      expect(article).not.toHaveStyle(expectedStyle);
    });
  });
});