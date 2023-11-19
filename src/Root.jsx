import { Provider } from 'react-redux';
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import { QueryClientProvider, QueryClient} from '@tanstack/react-query';
import { AboutMe } from './components/PrimaryContent/AboutMe/AboutMe';
import { SiteInfo } from './components/PrimaryContent/SiteInfo/SiteInfo';
import { LoginPage } from './pages/Login/LoginPage';
import { InfiniteArticles } from './pages/BreadBlog/InfiniteArticles';
import App from './App';
import { routes } from './routes';

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: routes.index,
    element: <App />,
  },
  {
    path: routes.aboutMe,
    element: <AboutMe />,
  },
  {
    path: routes.siteInfo,
    element: <SiteInfo />,
  },
  {
    path: routes.login,
    element: <LoginPage />,
  },
  {
    path: routes.blog,
    element: <InfiniteArticles />,
  },
]);

export default function Root(props) {
  const { store } = props;
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </QueryClientProvider>
  );
}
