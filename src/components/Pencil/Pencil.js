import { useRef, useState } from 'react';
import { LoadingSpinner } from 'src/components/LoadingSpinner/LoadingSpinner';
import { createHttpRequest, updateBlogPost } from 'src/common/utils';
import { useMutation } from '@tanstack/react-query';
import { primaryColor } from 'src/common/strings';
import './Pencil.css';

export function Pencil(props) {
  const { article, token, aspect } = props;
  const [modalIsVisible, setModalIsVisible] = useState(false);
  const inputRef = useRef(null);

  const mutation = useMutation((requestData) => updateBlogPost(article.page, requestData));

  const updateHandler = async () => {
    article[aspect] = inputRef.current.value;
    const requestData = createHttpRequest('PUT', token, article);
    mutation.mutate(requestData);
  };

  const cancellationHandler = () => {
    setModalIsVisible(false);
  };

  const confirmationHandler = async () => {
    await updateHandler();
    setModalIsVisible(false);
  };

  const style = { fontSize: '1rem', width: '85%', height: '85%' };

  const Modal = () => (
    <div className='update-modal'>
      <p>Update the {aspect}</p>
      <textarea style={style} ref={inputRef} defaultValue={article[aspect]}/>
      <div>
        <span onClick={confirmationHandler} role='button'>Confirm</span>
        <span onClick={cancellationHandler} role='button'>Nvrmnd</span>
      </div>
    </div>
  );

  const PencilSvg = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="35">
      <line x1="5" y1="5" x2="26" y2="25" stroke={primaryColor} strokeWidth="1" />
      <line x1="5" y1="5" x2="0" y2="10" stroke={primaryColor} strokeWidth="1" />
      <line x1="0" y1="10" x2="20" y2="30" stroke={primaryColor} strokeWidth="1" />
      <line x1="25" y1="25" x2="20" y2="30" stroke={primaryColor} strokeWidth="1" />
      <line x1="26" y1="24.5" x2="25" y2="30" stroke={primaryColor} strokeWidth="1" />
      <line x1="20" y1="30" x2="25" y2="30" stroke={primaryColor} strokeWidth="1" />
    </svg>
  );

  const pencilClickHandler = () => setModalIsVisible(true);

  return (
    <>
      {modalIsVisible ? <Modal /> : null}
      {mutation.isLoading ? <LoadingSpinner /> : null}
      {!modalIsVisible
        ? <div onClick={pencilClickHandler}><PencilSvg /></div>
        : null}
    </>
  );
}
