import { useState } from 'react';
import { createHttpRequest, postData } from '../../common/utils';

export function NewCrossword({ token }){
  const [solution, setSolution] = useState('');
  const [title, setTitle] = useState('');
  const [theme, setTheme] = useState('');
  const [cluesAcross, setAcrossClues] = useState('');
  const [cluesDown, setDownClues] = useState('');

  const submissionHandler = async (event) => {
    event.preventDefault();
    const formattedData = [
      {
        solution,
        author: 'Alex Gochenour',
        title,
        theme,
        cluesAcross,
        cluesDown,
      }
    ];
    const mappedData = createHttpRequest('POST', token, formattedData);
    await postData(process.env.REACT_APP_POST_CROSSWORD_INFO, mappedData);
  };

  const handleSolution = (event) => setSolution(event.target.value);
  const handleTitle = (event) => setTitle(event.target.value);
  const handleTheme = (event) => setTheme(event.target.value);
  const handleAcrossClues = (event) => setAcrossClues(event.target.value);
  const handleDownClues = (event) => setDownClues(event.target.value);

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
        <label className='publish-panel-label'>
          <span className='label-text'>Across: </span>
          <input
            className='publish-panel-input'
            data-testid='crossword-panel-across'
            type='text'
            onChange={handleAcrossClues}
            placeholder='A comma-delineated string'
          />
        </label>
        <label className='publish-panel-label'>
          <span className='label-text'>Down: </span>
          <input
            className='publish-panel-input'
            data-testid='crossword-panel-down'
            type='text'
            onChange={handleDownClues}
            placeholder='A comma-delineated string'
          />
        </label>
        <div className='button-wrapper'>
          <button className='publish-panel-button'>Publish</button>
        </div>
      </form>
    </section>

  );
}