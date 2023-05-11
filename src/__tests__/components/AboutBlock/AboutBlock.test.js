import { AboutBlock } from '../../../components/AboutBlock/AboutBlock';
import { render } from '@testing-library/react';

describe('WHEN: AboutBlock', () => {
  it('THEN: The component renders properly', () => {
    render(<AboutBlock />);
    const component = document.querySelector('#shadow');

    expect(component).toBeInTheDocument();
  });
});
