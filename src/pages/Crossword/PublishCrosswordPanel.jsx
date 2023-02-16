import React, { useState } from 'react';
import './PublishCrosswordPanel.css';

function PublishCrosswordPanel() {
  const [solution, setSolution] = useState('');
  const [title, setTitle] = useState('');
  const [theme, setTheme] = useState('');
  const [acrossClues, setAcrossClues] = useState('');
  const [downClues, setDownClues] = useState('');

  const submissionHandler = (event) => {
    event.preventDefault();

  };

  const handleSolution = (event) => setSolution(event.target.value);
  const handleTitle = (event) => setTitle(event.target.value);
  const handleTheme = (event) => setTheme(event.target.value);
  const handleAcrossClues = (event) => setAcrossClues(event.target.value);
  const handleDownClues = (event) => setDownClues(event.target.value);
  return (
    <section className='publish-panel'>
      <h1 className='publish-panel-title'>Create a New Crossword</h1>
      <form onSubmit={submissionHandler}>
        <label className='publish-panel-label'>
          <span className='label-text'>Solution: </span>
          <input
            className='publish-panel-input'
            type="text"
            onChange={handleSolution}
            placeholder='Flatten all rows into a string'
          />
        </label>
        <label className='publish-panel-label'>
          <span className='label-text'>Title: </span>
          <input
            className='publish-panel-input'
            type="text"
            onChange={handleTitle}
            placeholder='Three Arabic Words'
          />
        </label>
        <label className='publish-panel-label'>
          <span className='label-text'>Theme: </span>
          <input className='publish-panel-input' type="text" onChange={handleTheme}/>
        </label>
        <label className='publish-panel-label'>
          <span className='label-text'>Across: </span>
          <input
            className='publish-panel-input'
            type="text"
            onChange={handleAcrossClues}
            placeholder='A comma-delineated string'
          />
        </label>
        <label className='publish-panel-label'>
          <span className='label-text'>Down: </span>
          <input
            className='publish-panel-input'
            type="text"
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

export default PublishCrosswordPanel;