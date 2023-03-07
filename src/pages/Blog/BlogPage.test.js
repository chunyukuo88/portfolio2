import { Provider } from 'react-redux';
import { BlogPage } from './BlogPage';
import { mockStore } from '../../testUtils';
import { BrowserRouter as Router } from 'react-router-dom';
import { routes } from '../../routes';

import { render } from '@testing-library/react';
import ReactGA from 'react-ga4';

const spy = jest.spyOn(ReactGA, 'send');
const payload = { hitType: 'pageview', page: routes.blog };

beforeEach(() => {
  render(
    <Provider store={mockStore}>
      <Router>
        <BlogPage/>
      </Router>
    </Provider>
  );
});

describe('WHEN: The page loads,', () => {
  it('THEN: renders properly', () => {
    const component = document.querySelector('main');

    expect(component).toBeInTheDocument();
  });
  it('THEN: ReactGA sends info to Google Analytics.', () => {
    expect(spy).toBeCalledTimes(1);
    expect(spy).toBeCalledWith(payload);
  });
  it('THEN: It shows blog posts.', () => {
    const blogTitle = document.querySelectorAll('.blog-title')[0];

    expect(blogTitle).toBeInTheDocument();
  });
});
