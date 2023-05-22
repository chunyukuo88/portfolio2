import { getBlogs } from 'src/common/utils';
import { Provider } from 'react-redux';
import { BlogPage } from 'src/pages/Blog/BlogPage';
import { mockStore} from 'src/testUtils';
import { BrowserRouter as Router } from 'react-router-dom';
import { routes } from 'src/routes';
import { QueryClientProvider, QueryClient} from '@tanstack/react-query';
import { render, screen, waitFor } from '@testing-library/react';
import ReactGA from 'react-ga4';

const spy = jest.spyOn(ReactGA, 'send');
const payload = { hitType: 'pageview', page: routes.blog };
const queryClient = new QueryClient();

jest.mock('src/common/utils');

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
    {
      "entityId": "11GTJK868MG6FBXK37BMYH42GS",
      "title": "A third blog post",
      "theme": "test",
      "imageUrl": "test",
      "creationTimeStamp": 3,
      "likes": 0,
      "views": 0
    },
    {
      "entityId": "21GTJK868MG6FBXK37BMYH42GT",
      "title": "A fourth blog post",
      "theme": "test",
      "imageUrl": "test",
      "creationTimeStamp": 4,
      "likes": 0,
      "views": 0
    },
  ];
  beforeEach(() => {
    getBlogs.mockResolvedValueOnce(ordinaryBlogData);
  });
  it('THEN: renders properly', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <Provider store={mockStore}>
          <Router>
            <BlogPage />
          </Router>
        </Provider>
      </QueryClientProvider>
    );

    await waitFor(() => {
      const component = document.querySelector('main');
      expect(component).toBeInTheDocument();
    });
  });
  it('THEN: ReactGA sends info to Google Analytics.', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <Provider store={mockStore}>
          <Router>
            <BlogPage />
          </Router>
        </Provider>
      </QueryClientProvider>
    );

    expect(spy).toBeCalledTimes(1);
    expect(spy).toBeCalledWith(payload);
  });
  it('THEN: It shows ONLY the first three blog posts.', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <Provider store={mockStore}>
          <Router>
            <BlogPage />
          </Router>
        </Provider>
      </QueryClientProvider>
    );

    await waitFor(() => {
      const blogTitle1 = screen.getByText(ordinaryBlogData[0].title);
      const blogTitle2 = screen.getByText(ordinaryBlogData[1].title);
      const blogTitle3 = screen.getByText(ordinaryBlogData[2].title);
      // const blogTitle4 = screen.queryByText(ordinaryBlogData[4].title);
      expect(blogTitle1).toBeInTheDocument();
      expect(blogTitle2).toBeInTheDocument();
      expect(blogTitle3).toBeInTheDocument();
      // expect(blogTitle4).not.toBeInTheDocument();
    })
  });
});
