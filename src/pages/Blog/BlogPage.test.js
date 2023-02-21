import { BlogPage } from './BlogPage';
import { render } from '@testing-library/react';
import ReactGA from 'react-ga4';
import { Provider } from 'react-redux';
import { mockStore } from '../../testUtils';
import { BrowserRouter as Router } from 'react-router-dom';
import { routes } from '../../routes';

describe('WHEN: The page loads,', () => {
  it('THEN: renders properly', () => {
    render(
      <Provider store={mockStore}>
        <Router>
          <BlogPage/>
        </Router>
      </Provider>
    );
    const component = document.querySelector('main');

    expect(component).toBeInTheDocument();
  });
  it('THEN: ReactGA sends info to Google Analytics.', () => {
    const spy = jest.spyOn(ReactGA, 'send');
    const payload = { hitType: 'pageview', page: routes.blog };
    render(
      <Provider store={mockStore}>
        <Router>
          <BlogPage/>
        </Router>
      </Provider>
    );

    expect(spy).toBeCalledTimes(1);
    expect(spy).toBeCalledWith(payload);
  });
});
