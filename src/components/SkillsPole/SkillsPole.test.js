import { SkillsPole } from './SkillsPole';
import { render } from '@testing-library/react';

// TODO: Now that each block on the pole has its own handlers, they need tests.
it('The component renders', () => {
  render(<SkillsPole />);

  const component = document.getElementById('skills-pole');

  expect(component).toBeInTheDocument();
});
