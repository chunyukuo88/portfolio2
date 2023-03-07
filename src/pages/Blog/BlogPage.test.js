import { Provider } from 'react-redux';
import { BlogPage } from './BlogPage';
import { mockStore } from '../../testUtils';
import { BrowserRouter as Router } from 'react-router-dom';
import { routes } from '../../routes';

import { render, screen } from '@testing-library/react';
import ReactGA from 'react-ga4';

const spy = jest.spyOn(ReactGA, 'send');
const payload = { hitType: 'pageview', page: routes.blog };
import { getData } from '../../common/utils';

jest.mock('../../common/utils');

let result;
beforeEach(() => {
  result = render(
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
    const expectedBlogData = [
      {
        "entityId": "01GTJJTGBTCA1CV7EGPDD6FFT0",
        "title": "My first blog post",
        "theme": "test",
        "imageUrl": "test",
        "likes": 0,
        "views": 0
      },
      {
        "entityId": "01GTJK868MG6FBXK37BMYH42GR",
        "title": "A second blog post",
        "theme": "test",
        "imageUrl": "test",
        "likes": 0,
        "views": 0
      },
    ];
    getData.mockReturnValueOnce(expectedBlogData);
    const blogTitle1 = screen.getByText(expectedBlogData[0].title);
    const blogTitle2 = screen.getByText(expectedBlogData[1].title);

    expect(blogTitle1).toBeInTheDocument();
    expect(blogTitle2).toBeInTheDocument();
  });
});
