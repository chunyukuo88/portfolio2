import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { QueryClientProvider, QueryClient} from '@tanstack/react-query';

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
    </QueryClientProvider>
  );
}
