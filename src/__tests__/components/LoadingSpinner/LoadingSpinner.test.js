import { LoadingSpinner } from '../../../components/LoadingSpinner/LoadingSpinner';
import { render, screen } from '@testing-library/react';
import strings from '../../../common/strings';

describe('WHEN: passed a language prop,', () => {
  it.each`
    language
    ${strings.ENGLISH}
    ${strings.CHINESE}
    ${strings.RUSSIAN}
  `('THEN: loads without a problem', ({ language }) => {
    render(<LoadingSpinner language={language}/>);

    const displayedText = screen.getByText(strings.loading[language]);

    expect(displayedText).toBeInTheDocument();
  });
});
