import { BlogPage } from './BlogPage';
import { render } from '@testing-library/react';
import { store } from '../../globalState/store';
import ReactGA from 'react-ga4';
import Root from '../../Root';

describe('WHEN: The page loads,', () => {
  it('THEN: renders properly', () => {
    render(
      <Root store={store}>
        <BlogPage/>
      </Root>
    );
    const component = document.querySelector('main');

    expect(component).toBeInTheDocument();
  });
  it('THEN: ReactGA sends info to Google Analytics.', () => {
    const spy = jest.spyOn(ReactGA, 'send');
    const payload = { hitType: 'pageview', page: '/blog' };
    render(
      <Root store={store}>
        <BlogPage/>
      </Root>
    );

    expect(spy).toBeCalledTimes(1);
    expect(spy).toBeCalledWith(payload);
  });
});
