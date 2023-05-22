import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { mockStore } from 'src/testUtils';
import { CluesCube } from 'src/pages/Crossword/CluesCube';

const mockData = {
  id: 6,
  created_at: '2023-02-17T22:02:19.133891+00:00',
  solution: 'lgtooarepagonerovertseras',
  author: 'Alex Gochenour',
  title: 'For Famous Flutist',
  theme: "",
  cluesAcross: '1. Samsung Apple Google and&&2. Corny Columbian snack&&3. A moribund person&&4. Not subtle&&5. One way to pluralize serum',
  cluesDown: '1. Nigerian financial hub&&2. A stand of trees&&3. Spanish word for has&&4. A cake or an art&&5. Origami or oil paint for example'
};


describe('GIVEN: An props that do not include clue data,', () => {
  describe('WHEN: This component renders,', () => {
    it('THEN: It displays loading spinners.', () => {
      render(
        <Provider store={mockStore}>
          <Router>
            <CluesCube language='english'/>
          </Router>
        </Provider>
      );

      const loadingSpinner = document.querySelector('.lds-hourglass');

      expect(loadingSpinner).toBeInTheDocument();
    });
  });
});
describe('GIVEN: An props including clue data,', () => {
  describe('WHEN: This component renders,', () => {
    it('THEN: It displays the clues on the cube.', () => {
      render(
        <Provider store={mockStore}>
          <Router>
            <CluesCube language='english' todaysPuzzle={mockData}/>
          </Router>
        </Provider>
      );

      const clues = document.querySelectorAll('.clue');

      expect(clues).toHaveLength(10);
      clues.forEach(clue => {
        expect(clue).toBeInTheDocument();
      });
    });
  });
  describe('WHEN: The user clicks the front of the cube once,', () => {
    it('THEN: The side and top faces change to face the user.', () => {
      render(
        <Provider store={mockStore}>
          <Router>
            <CluesCube language='english' todaysPuzzle={mockData}/>
          </Router>
        </Provider>
      );
      const frontFace = screen.getByRole('button');
      let westFace = screen.getByTestId('west-face');
      let topFace = screen.getByTestId('top-face');

      expect(westFace).toHaveClass('west-face-not-clicked');
      expect(topFace).toHaveClass('top-face-not-clicked');

      fireEvent.click(frontFace);
      westFace = screen.getByTestId('west-face');
      topFace = screen.getByTestId('top-face');

      expect(westFace).toHaveClass('west-face-clicked');
      expect(topFace).toHaveClass('top-face-clicked');
    });
  });
});