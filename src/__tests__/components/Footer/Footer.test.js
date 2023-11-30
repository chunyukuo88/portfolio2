import { Footer } from 'src/components';
import { render } from '@testing-library/react';

describe('WHEN: The component loads', () => {
  test('THEN: The spans representing clickable icons are all visible.', () => {
    render(<Footer />);

    const gitHubIcon = document.querySelectorAll('img')[0];
    const npmIcon = document.querySelectorAll('img')[1];
    const linkedInIcon = document.querySelectorAll('img')[2];

    expect(gitHubIcon).toBeVisible();
    expect(npmIcon).toBeVisible();
    expect(linkedInIcon).toBeVisible();
  });
});
