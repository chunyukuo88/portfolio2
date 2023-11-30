import { SiteInfo } from "src/components";
import {render} from "@testing-library/react";

describe('GIVEN: the component loads', () => {
  describe('WHEN: the menu is open,', () => {
    test('THEN: the content is blurry', () => {
      render(<SiteInfo menuIsOpen={true}/>);

      const article = document.querySelector('article');

      expect(article).toHaveClass('blurry');
    });
  });
  describe('WHEN: the menu is closed,', () => {
    test('THEN: the content is clear', () => {
      render(<SiteInfo menuIsOpen={false}/>);

      const article = document.querySelector('article');

      expect(article).not.toHaveClass('blurry');
    });
  });
});
