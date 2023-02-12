import { BlogPage } from './BlogPage';
import { render } from '@testing-library/react';
import { store } from '../../globalState/store';
import Root from '../../Root';

it('The page renders properly', () => {
  render(
    <Root store={store}>
      <BlogPage/>
    </Root>
  );
  const component = document.querySelector('main');

  expect(component).toBeInTheDocument();
});
