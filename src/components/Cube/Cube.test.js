import { Cube } from './Cube';
import {render} from "@testing-library/react";

it('Renders successfully', () => {
  render(<Cube/>);
  const outermostDiv = document.querySelector('.cube');

  expect(outermostDiv).toBeInTheDocument();
});