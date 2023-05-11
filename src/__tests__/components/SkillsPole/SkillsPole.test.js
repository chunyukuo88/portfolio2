import { SkillsPole } from 'src/components/SkillsPole/SkillsPole';
import { render, screen, fireEvent } from '@testing-library/react';

it('The component renders', () => {
  render(<SkillsPole />);

  const component = document.getElementById('skills-pole');

  expect(component).toBeInTheDocument();
});
describe('SkillsPole.jsx', () => {
  describe('WHEN: the user hovers over a block,', () => {
    it.each`
      skillName                 | dataTestId
      ${'React + Redux'}        | ${'redux-icon'}
      ${'AWS'}                  | ${'aws-icon'}
      ${'Node.js'}              | ${'node-icon'}
      ${'Svelte'}               | ${'svelte-icon'}
      ${'Docker'}               | ${'docker-icon'}
      ${'Serverless Framework'} | ${'serverless-icon'}
    `('THEN: that block\'s icon is displayed.', ({ skillName, dataTestId }) => {
      render(<SkillsPole />);

      let component = screen.getByText(skillName);
      let icon = screen.queryByTestId(dataTestId);

      expect(component).toBeInTheDocument();
      expect(icon).not.toBeInTheDocument();

      fireEvent.mouseEnter(component);
      component = screen.queryByTestId(skillName);
      icon = screen.getByTestId(dataTestId);

      expect(component).not.toBeInTheDocument();
      expect(icon).toBeInTheDocument();

      fireEvent.mouseLeave(icon);
      component = screen.getByText(skillName);
      icon = screen.queryByTestId(dataTestId);

      expect(component).toBeInTheDocument();
      expect(icon).not.toBeInTheDocument();
    });
  });
});
