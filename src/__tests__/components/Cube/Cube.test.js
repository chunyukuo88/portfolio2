import { renderWithQueryClient } from 'src/__msw__/testUtils';
import { mockStore } from 'src/testUtils';
import { Cube } from 'src/components/Cube/Cube';

it('Renders successfully', () => {
  renderWithQueryClient(<Cube />, mockStore);
  const outermostDiv = document.querySelector('.cube');

  expect(outermostDiv).toBeInTheDocument();
});
