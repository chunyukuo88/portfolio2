import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { NewCrossword } from './NewCrossword';
import { NewBlogPost } from './NewBlogPost';
import { selectCurrentToken } from '../../features/auth/authSlice';
import { selectCurrentLanguage } from '../../features/language/languageSlice';
import { routes } from '../../routes';
import strings from '../../common/strings';
import { LinkStyling } from '../../common/globalStyles';
import './PublishContent.css';

function PublishContent() {
  const token = useSelector(selectCurrentToken);
  const language = useSelector(selectCurrentLanguage);

  const withCenter = {
    ...LinkStyling,
    textAlign: 'center',
    margin: '3rem',
  };

  return (
    <>
      <Link style={withCenter} to={routes.index}>
        {strings.homePage[language]}
      </Link>
      <section className='publish-panel'>
        <NewBlogPost  token={token}/>
        <div />
        <NewCrossword token={token}/>
      </section>
    </>
  );
}

export default PublishContent;
