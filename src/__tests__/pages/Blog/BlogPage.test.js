import { renderWithQueryClient } from "src/__tests__/__msw__/testUtils";
import { mockStore, mockStoreLoggedIn } from 'src/testUtils';
import { screen, waitFor } from '@testing-library/react';

import { BlogPage } from 'src/pages/Blog/BlogPage';
import { routes } from 'src/routes';
import ReactGA from 'react-ga4';

const spy = jest.spyOn(ReactGA, 'send');
const payload = { hitType: 'pageview', page: routes.blog };
jest.spyOn(console, 'log').mockImplementation(jest.fn());
jest.spyOn(console, 'error').mockImplementation(jest.fn());

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


afterEach(() => {
  jest.clearAllMocks();
});

describe('GIVEN: The user is not logged in (as administrator), ', () => {
  beforeEach(() => {
    renderWithQueryClient(<BlogPage />, mockStore);
  });
  describe('WHEN: The page loads,', () => {
    it('THEN: renders properly', async () => {
      await waitFor(() => {
        const component = document.querySelector('main');
        expect(component).toBeInTheDocument();
      });
    });
    it('THEN: ReactGA sends info to Google Analytics.', () => {
      expect(spy).toBeCalledTimes(1);
      expect(spy).toBeCalledWith(payload);
    });
    it('THEN: It shows the first three blog posts.', async () => {
      await waitFor(() => {
        const blogTitle1 = screen.getByText(ordinaryBlogData[0].title);
        const blogTitle2 = screen.getByText(ordinaryBlogData[1].title);
        const blogTitle3 = screen.getByText(ordinaryBlogData[2].title);
        expect(blogTitle1).toBeInTheDocument();
        expect(blogTitle2).toBeInTheDocument();
        expect(blogTitle3).toBeInTheDocument();
      })
    });
    it('THEN: little trashcans are NOT rendered next to each blog post title.', () => {
      const trashcanEmoji = screen.queryAllByText('🗑');

      expect(trashcanEmoji).toHaveLength(0);
    });
    it('THEN: no pencil emoji appears.', () => {
      const pencil = screen.queryAllByText('✏️');

      expect(pencil).toHaveLength(0);
    });
  });
});
describe('GIVEN: The user is an administrator, ', () => {
  beforeEach(() => {
    renderWithQueryClient(<BlogPage />, mockStoreLoggedIn);
  });
  describe('WHEN: The page loads,', () => {
    it('THEN: little trashcans are rendered next to each blog post title.', async  () => {
      await waitFor(() => {
        const trashcanEmoji = screen.getAllByText('🗑')[0];

        expect(trashcanEmoji).toBeInTheDocument();
      });
    });
    it('THEN: a little pencil appears next to each title.', async () => {
      await waitFor(() => {
        const pencil = screen.queryAllByText('✏️')[0];

        expect(pencil).toBeInTheDocument();
      })
    });
  });
});
