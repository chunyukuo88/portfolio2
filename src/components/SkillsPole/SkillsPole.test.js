import { SkillsPole } from './SkillsPole';
import { render } from '@testing-library/react';

it('The component renders', () => {
  render(<SkillsPole />);

  const component = document.getElementById('skills-pole');

  expect(component).toBeInTheDocument();
});
