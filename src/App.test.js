import App from './App';
import {render} from "@testing-library/react";

;

describe('GIVEN: ', ()=>{
  describe('WHEN: ', ()=>{
    test('THEN: ', ()=>{
      const { container } = render(<App />);

      const app = container.querySelector('.App');

      expect(app).toBeInTheDocument();
    });
  });
});
