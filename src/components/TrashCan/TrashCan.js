import { useState } from 'react';
import { useMutation} from '@tanstack/react-query';

import { createHttpRequest, deleteBlog } from 'src/common/utils';
import { LoadingSpinner } from 'src/components/LoadingSpinner/LoadingSpinner';
import './TrashCan.css';

export function TrashCan(props){
  const { article, token } = props;
  const [modalIsVisible, setModalIsVisible] = useState(false);

  const mutation = useMutation((requestData) => deleteBlog(article.entityId, requestData));

  const deletionHandler = async () => {
    const requestData = createHttpRequest('DELETE', token, null);
   mutation.mutate(requestData);
  };

  const cancellationHandler = () => {
    setModalIsVisible(false);
  };

  const confirmationHandler = async (event) => {
    await deletionHandler(event);
    setModalIsVisible(false);
  };

  const Modal = () => (
    <div className='deletion-modal'>
      <p>Are you sure you want to delete this article?</p>
      <div className='deletion-buttons-container'>
        <button onClick={confirmationHandler}>Yeah</button>
        <button onClick={cancellationHandler}>Nah</button>
      </div>
    </div>
  );

  const style = {
    textAlign: 'center',
  };

  const FailureMsg = () => (
    <div className='deletion-error-message'>
      Failed to delete <span>{article.title}</span>
    </div>
  );

  const DeleteSuccessMsg = () => (
    <div>
      <span>{article.title}</span> has been deleted.
    </div>
  );

  return (
    <div style={style}>
      {modalIsVisible && <Modal />}
      {mutation.isError ? <FailureMsg /> : null}
      {mutation.isLoading ? <LoadingSpinner /> : null}
      {mutation.isSuccess ? <DeleteSuccessMsg /> : null}
      {modalIsVisible === false && <div className='trashcan' onClick={() => setModalIsVisible(true)}>🗑</div>}
    </div>
  );
}