import { LoadingSpinner } from 'src/components/LoadingSpinner/LoadingSpinner';
import { render } from '@testing-library/react';

it('loads without a problem.', () => {
  render(<LoadingSpinner />);

  const spinner = document.querySelector('.lds-hourglass');

  expect(spinner).toBeInTheDocument();
});
