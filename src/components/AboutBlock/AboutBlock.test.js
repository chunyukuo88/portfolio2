import { AboutBlock, AboutBlockWrapper } from './AboutBlock';
import { render } from '@testing-library/react';

describe('WHEN: AboutBlock', () => {
  it('THEN: The component renders properly', () => {
    render(<AboutBlock />);
    const component = document.querySelector('#shadow');

    expect(component).toBeInTheDocument();
  });
});
describe('WHEN: AboutBlockWrapper', () => {
  it('THEN: The component renders properly', () => {
    render(<AboutBlockWrapper />);
    const component = document.querySelector('.contact-links-wrapper');

    expect(component).toBeInTheDocument();
  });
});
