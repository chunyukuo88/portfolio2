import { render } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider } from 'react-redux';
import { EnhancedStore } from '@reduxjs/toolkit';
import { BrowserRouter as Router } from 'react-router-dom';
import { ReactElement } from 'react';

const generateQueryClient = () => {
  return new QueryClient();
};

/**
 * A wrapper for React components that acts similarly to Root but is used for tests only.
 * @param { ReactElement } reactElement - The component being tested.
 * @param { EnhancedStore } store - A mock Redux store, representing authenticated and non-authenticated states.
 * @param { QueryClient } [client] - To access React Query via msw.
 */
export function renderWithQueryClient(reactElement, store, client) {
  const queryClient = client ?? generateQueryClient();

  return render(
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <Router>
          {reactElement}
        </Router>
      </Provider>
    </QueryClientProvider>
  );
}
