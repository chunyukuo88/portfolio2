import { useState } from 'react';
import { createHttpRequest, postData } from '../../common/utils';

export function NewCrossword({ token }){
  const [solution, setSolution] = useState('');
  const [title, setTitle] = useState('');
  const [theme, setTheme] = useState('');
  const [across1, setAcrossClues1] = useState('');
  const [across2, setAcrossClues2] = useState('');
  const [across3, setAcrossClues3] = useState('');
  const [across4, setAcrossClues4] = useState('');
  const [across5, setAcrossClues5] = useState('');
  const [down1, setDownClues1] = useState('');
  const [down2, setDownClues2] = useState('');
  const [down3, setDownClues3] = useState('');
  const [down4, setDownClues4] = useState('');
  const [down5, setDownClues5] = useState('');

  const collateClues = (c1, c2, c3, c4, c5) => {
    return `1. ${c1}&&2. ${c2}&&3. ${c3}&&4. ${c4}&&5. ${c5}`;
  }
  
  const submissionHandler = async (event) => {
    event.preventDefault();
    const formattedData = [
      {
        solution,
        author: 'Alex Gochenour',
        title,
        theme,
        cluesAcross: collateClues(across1, across2, across3, across4, across5),
        cluesDown: collateClues(down1, down2, down3, down4, down5),
      }
    ];
    const mappedData = createHttpRequest('POST', token, formattedData);
    await postData(process.env.REACT_APP_POST_CROSSWORD_INFO, mappedData);
  };

  const handleSolution = (event) => setSolution(event.target.value);
  const handleTitle = (event) => setTitle(event.target.value);
  const handleTheme = (event) => setTheme(event.target.value);
  const handleAcross1Clue = (event) => setAcrossClues1(event.target.value);
  const handleAcross2Clue = (event) => setAcrossClues2(event.target.value);
  const handleAcross3Clue = (event) => setAcrossClues3(event.target.value);
  const handleAcross4Clue = (event) => setAcrossClues4(event.target.value);
  const handleAcross5Clue = (event) => setAcrossClues5(event.target.value);
  const handleDown1Clues = (event) => setDownClues1(event.target.value);
  const handleDown2Clues = (event) => setDownClues2(event.target.value);
  const handleDown3Clues = (event) => setDownClues3(event.target.value);
  const handleDown4Clues = (event) => setDownClues4(event.target.value);
  const handleDown5Clues = (event) => setDownClues5(event.target.value);

  return (
    <section className='content-card'>
      <h1 className='publish-panel-title'>Create a New Crossword</h1>
      <form
        className='content-form'
        onSubmit={submissionHandler}
      >
        <label className='publish-panel-label'>
          <span className='label-text'>Solution: </span>
          <input
            className='publish-panel-input'
            data-testid='crossword-panel-solution'
            type='text'
            onChange={handleSolution}
            placeholder='Flatten all rows into a string'
          />
        </label>
        <label className='publish-panel-label'>
          <span className='label-text'>Title: </span>
          <input
            className='publish-panel-input'
            data-testid='crossword-panel-title'
            type='text'
            onChange={handleTitle}
            placeholder='Three Arabic Words'
          />
        </label>
        <label className='publish-panel-label'>
          <span className='label-text'>Theme: </span>
          <input
            className='publish-panel-input'
            data-testid='crossword-panel-theme'
            type='text'
            onChange={handleTheme}
          />
        </label>
        <p className='label-text'>No need to include the numbers; numbers are added automatically.</p>
        <label className='publish-panel-label'>
          <span className='label-text'>Across 1: </span>
          <input
            className='publish-panel-input'
            data-testid='crossword-panel-across'
            type='text'
            onChange={handleAcross1Clue}
            placeholder='The clue for Across 1'
          />
        </label>
        <label className='publish-panel-label'>
          <span className='label-text'>Across 2: </span>
          <input
            className='publish-panel-input'
            data-testid='crossword-panel-across'
            type='text'
            onChange={handleAcross2Clue}
            placeholder='The clue for Across 2'
          />
        </label>
        <label className='publish-panel-label'>
          <span className='label-text'>Across 3: </span>
          <input
            className='publish-panel-input'
            data-testid='crossword-panel-across'
            type='text'
            onChange={handleAcross3Clue}
            placeholder='The clue for Across 3'
          />
        </label>
        <label className='publish-panel-label'>
          <span className='label-text'>Across 4: </span>
          <input
            className='publish-panel-input'
            data-testid='crossword-panel-across'
            type='text'
            onChange={handleAcross4Clue}
            placeholder='The clue for Across 4'
          />
        </label>
        <label className='publish-panel-label'>
          <span className='label-text'>Across 5: </span>
          <input
            className='publish-panel-input'
            data-testid='crossword-panel-across'
            type='text'
            onChange={handleAcross5Clue}
            placeholder='The clue for Across 5'
          />
        </label>
        <label className='publish-panel-label'>
          <span className='label-text'>Down 1: </span>
          <input
            className='publish-panel-input'
            data-testid='crossword-panel-down'
            type='text'
            onChange={handleDown1Clues}
            placeholder='Clue for Down 1'
          />
        </label>
        <label className='publish-panel-label'>
          <span className='label-text'>Down 2: </span>
          <input
            className='publish-panel-input'
            data-testid='crossword-panel-down'
            type='text'
            onChange={handleDown2Clues}
            placeholder='Clue for Down 2'
          />
        </label>
        <label className='publish-panel-label'>
          <span className='label-text'>Down 3: </span>
          <input
            className='publish-panel-input'
            data-testid='crossword-panel-down'
            type='text'
            onChange={handleDown3Clues}
            placeholder='Clue for Down 3'
          />
        </label>
        <label className='publish-panel-label'>
          <span className='label-text'>Down 4: </span>
          <input
            className='publish-panel-input'
            data-testid='crossword-panel-down'
            type='text'
            onChange={handleDown4Clues}
            placeholder='Clue for Down 4'
          />
        </label>
        <label className='publish-panel-label'>
          <span className='label-text'>Down 5: </span>
          <input
            className='publish-panel-input'
            data-testid='crossword-panel-down'
            type='text'
            onChange={handleDown5Clues}
            placeholder='Clue for Down 5'
          />
        </label>
        <div className='button-wrapper'>
          <button className='publish-panel-button'>Publish</button>
        </div>
      </form>
    </section>
  );
}