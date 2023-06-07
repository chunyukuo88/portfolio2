import { render } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactElement } from 'react';

const generateQueryClient = () => {
  return new QueryClient();
};

/**
 * A wrapper for React components that acts similarly to Root but is used for tests only.
 * @param { ReactElement } reactElement - The component being tested.
 * @param { QueryClient } client - Required to be able to access React Query via msw.
 */
export function renderWithQueryClient(reactElement, client) {
  const queryClient = client ?? generateQueryClient();

  return render(<
    QueryClientProvider client={queryClient}>
      {reactElement}
    </QueryClientProvider>
  );
}
