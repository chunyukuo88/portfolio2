import { useState } from 'react';
import { createHttpRequest } from 'src/common/utils';
import { LoadingSpinner } from 'src/components/LoadingSpinner/LoadingSpinner';
import { useMutation } from '@tanstack/react-query';


export function NewBlogPost({ token }) {
  const [ title, setTitle ] = useState('');
  const [ body, setBody ] = useState('');
  const [ imageUrl, setImageUrl ] = useState('');

  const handleTitle = (event) => setTitle(event.target.value);
  const handleBody = (event) => setBody(event.target.value);
  const handleImg = (event) => setImageUrl(event.target.value);

  const clearAllInputs = () => {
    setTitle('');
    setBody('');
    setImageUrl('');
  };

  const mutation = useMutation({
    mutationFn: async (blogData) => {
      return await fetch(process.env.REACT_APP_POST_BLOG_ENTRY, blogData);
    }
  });

  const createDataObject = () => ({
    title,
    creationTimeStamp: Date.now(),
    theme: body,
    imageUrl,
    likes: 0,
    views: 0,
  });

  const submissionHandler = async (event) => {
    event.preventDefault();
    const mappedData = createHttpRequest('POST', token, createDataObject());
    await mutation.mutateAsync(mappedData);
  };

  if (mutation.isSuccess) {
    clearAllInputs();
  }
  if (mutation.isError) {
    console.error('Unable to publish your rubbish content: ', mutation.error.message);
    return <h1 onClick={() => mutation.reset()}>Failed to publish blog post: {mutation.error}</h1>;
  }
  // if (mutation.isLoading) return <LoadingSpinner />;

  return (
    <section className='content-card'>
      {mutation.isSuccess ? <h1>The blog post has been published successfully.</h1> : null}
      <h1 className='publish-panel-title'>Write a Blog Post</h1>
      <form
        className='content-form'
        onSubmit={submissionHandler}
      >
        <label className='publish-panel-label'>
          <span className='label-text'>Title: </span>
          <input
            type='text'
            className='publish-panel-input'
            data-testid='blog-panel-title'
            onChange={handleTitle}
            placeholder='With other companies in mind'
          />
        </label>
        <label className='publish-panel-label'>
          <span className='label-text'>Body: </span>
          <textarea
            type='text'
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
            type='text'
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