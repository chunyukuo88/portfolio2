import { Provider } from 'react-redux';
import { QueryClientProvider, QueryClient} from '@tanstack/react-query';
import { BrowserRouter as Router } from 'react-router-dom';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const queryClient = new QueryClient();

export default function Root(props) {
  const { store, children } = props;
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <Router>
          {children}
        </Router>
      </Provider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}