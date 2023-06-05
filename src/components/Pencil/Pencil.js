import { useRef, useState } from 'react';
import { LoadingSpinner } from '../LoadingSpinner/LoadingSpinner';
import { createHttpRequest, updateBlogPost } from 'src/common/utils';
import { useMutation } from '@tanstack/react-query';

export function Pencil(props) {
  const { article, token, aspect } = props;
  const [modalIsVisible, setModalIsVisible] = useState(false);
  const inputRef = useRef(null);

  const mutation = useMutation((requestData) => updateBlogPost(article.entityId, requestData));

  // TODO: Validation

  const updateHandler = async () => {
    const data = {
      [aspect]: inputRef.current.value,
    };
    const requestData = createHttpRequest('PUT', token, data);
    mutation.mutate(requestData);
  };

  const cancellationHandler = () => {
    setModalIsVisible(false);
  };

  const confirmationHandler = async () => {
    await updateHandler();
    setModalIsVisible(false);
  };

  const style = { fontSize: '1rem' };

  const Modal = () => (
    <div className='update-modal'>
      <p className='update-modal-header'>Update the {aspect}</p>
      <textarea style={style} ref={inputRef} type='text' defaultValue={article[aspect]}/>
      <div className='update-buttons-container'>
        <button onClick={confirmationHandler}>Confirm</button>
        <button onClick={cancellationHandler}>Nvrmnd</button>
      </div>
    </div>
  );

  return (
    <>
      {modalIsVisible && <Modal />}
      {mutation.isLoading ? <LoadingSpinner /> : null}
      {!modalIsVisible && <div className='pencil' onClick={() => setModalIsVisible(true)}>✏️</div>}
    </>
  );
}
