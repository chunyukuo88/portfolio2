import { getData } from '../../../common/utils';
import { Provider } from 'react-redux';
import { BlogPage } from '../../../pages/Blog/BlogPage';
import { mockStore} from '../../testUtils';
import { BrowserRouter as Router } from 'react-router-dom';
import { routes } from '../../../routes';

import { render, screen, waitFor } from '@testing-library/react';
import ReactGA from 'react-ga4';

const spy = jest.spyOn(ReactGA, 'send');
const payload = { hitType: 'pageview', page: routes.blog };

jest.mock('../../../common/utils');

describe('WHEN: The page loads,', () => {
  const ordinaryBlogData = [
    {
      "entityId": "01GTJJTGBTCA1CV7EGPDD6FFT0",
      "title": "My first blog post",
      "theme": "test",
      "imageUrl": "test",
      "creationTimeStamp": 1,
      "likes": 0,
      "views": 0
    },
    {
      "entityId": "01GTJK868MG6FBXK37BMYH42GR",
      "title": "A second blog post",
      "theme": "test",
      "imageUrl": "test",
      "creationTimeStamp": 2,
      "likes": 0,
      "views": 0
    },
  ];
  beforeEach(() => {
    getData.mockResolvedValueOnce(ordinaryBlogData);
  });
  it('THEN: renders properly', () => {
    render(
      <Provider store={mockStore}>
        <Router>
          <BlogPage />
        </Router>
      </Provider>
    );

    const component = document.querySelector('main');

    expect(component).toBeInTheDocument();
  });
  it('THEN: ReactGA sends info to Google Analytics.', () => {
    render(
      <Provider store={mockStore}>
        <Router>
          <BlogPage />
        </Router>
      </Provider>
    );

    expect(spy).toBeCalledTimes(1);
    expect(spy).toBeCalledWith(payload);
  });
  it('THEN: It shows blog posts.', async () => {
    render(
      <Provider store={mockStore}>
        <Router>
          <BlogPage />
        </Router>
      </Provider>
    );

    await waitFor(() => {
      const blogTitle1 = screen.getByText(ordinaryBlogData[0].title);
      const blogTitle2 = screen.getByText(ordinaryBlogData[1].title);
      expect(blogTitle1).toBeInTheDocument();
      expect(blogTitle2).toBeInTheDocument();
    })
  });
});
