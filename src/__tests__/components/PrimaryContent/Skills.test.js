import { Skills } from 'src/components';
import { render } from '@testing-library/react';

describe('GIVEN: the component has loaded', () => {
  describe('WHEN: the menu is open,', () => {
    test('THEN: the content is blurry', () => {
      render(<Skills menuIsOpen={true} />);

      const content = document.querySelector('ul');

      expect(content).toHaveAttribute('id', 'tech-skills-abridged__blurry');
    });
  });
  describe('WHEN: the menu is closed,', () => {
    test('THEN: the content is clear', () => {
      render(<Skills menuIsOpen={false} />);

      const content = document.querySelector('ul');

      expect(content).toHaveAttribute('id', 'tech-skills-abridged');
    });
  });
});
