import { useState } from 'react';
import { createHttpRequest, postData } from 'src/common/utils';


export function NewBlogPost({ token }) {
  const [ title, setTitle ] = useState('');
  const [ body, setBody ] = useState('');
  const [ imageUrl, setImageUrl ] = useState('');

  const clearAllInputs = () => {
    setTitle('');
    setBody('');
    setImageUrl('');
  };

  const submissionHandler = async (event) => {
    event.preventDefault();
    const data = {
      title,
      creationTimeStamp: Date.now(),
      theme: body,
      imageUrl,
      likes: 0,
      views: 0,
    };
    const mappedData = createHttpRequest('POST', token, data);
    try {
      await postData(process.env.REACT_APP_POST_BLOG_ENTRY, mappedData);
      alert('Success!');
      return clearAllInputs();
    } catch (e) {
      console.error('Unable to publish your rubbish content: ', e);
    }
  };

  const handleTitle = (event) => setTitle(event.target.value);
  const handleBody = (event) => {
    setBody(event.target.value);
  }
  const handleImg = (event) => setImageUrl(event.target.value);

  return (
    <section className='content-card'>
      <h1 className='publish-panel-title'>Write a Blog Post</h1>
      <form
        className='content-form'
        onSubmit={submissionHandler}
      >
        <label className='publish-panel-label'>
          <span className='label-text'>Title: </span>
          <input
            type="text"
            className='publish-panel-input'
            data-testid='blog-panel-title'
            onChange={handleTitle}
            placeholder='With other companies in mind'
          />
        </label>
        <label className='publish-panel-label'>
          <span className='label-text'>Body: </span>
          <textarea
            type="text"
            id='blog-body-input'
            className='publish-panel-input'
            data-testid='blog-panel-body'
            onChange={handleBody}
            placeholder='Max 512 MB'
          />
        </label>
        <label className='publish-panel-label'>
          <span className='label-text'>Image URL: </span>
          <input
            type="text"
            className='publish-panel-input'
            data-testid='blog-panel-img'
            onChange={handleImg}
            placeholder='Not required'
          />
        </label>
        <div className='button-wrapper'>
          <button
              className='publish-panel-button'
              data-testid='blog-submission-btn'
          >
            Publish
          </button>
        </div>
      </form>
    </section>
  );
}