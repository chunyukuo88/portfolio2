import {routes} from 'src/routes';
import BlogIcon from 'src/common/icons/blog.svg';
import { Link, useNavigate } from 'react-router-dom';
import strings from 'src/common/strings';
import Puzzle from 'src/common/icons/puzzle.svg';
import LanguageIcon from 'src/common/icons/language.svg';
import Language from 'src/features/language/Language';
import Admin from 'src/common/icons/admin.svg';
import {selectCurrentLanguage} from 'src/features/language/languageSlice';
import {selectCurrentUser} from 'src/features/auth/authSlice';
import { useSelector } from 'react-redux';
import './MainMenu.css';

export default function MainMenu(){
  const language = useSelector(selectCurrentLanguage);
  const username = useSelector(selectCurrentUser);
  const navigate = useNavigate();

  return (
    <ul className='main-menu-wrapper'>
      <li id='blog-button' role='button' onClick={() => navigate(routes.blog)} className='menu-block'>
        <span><img className='main-icons' src={BlogIcon} alt='blog icon'/></span>
        <Link to={routes.blog}>{strings.blog[language]}</Link>
      </li>
      <li id='puzzle-button' role='button' onClick={() => navigate(routes.puzzle)} className='menu-block'>
        <span><img className='main-icons' src={Puzzle} alt='Puzzle icon'/></span>
        <Link to={routes.puzzle}>{strings.puzzle[language]}</Link>
      </li>
      {
        username
          ? <li role='button' onClick={() => navigate(routes.publishCrossword)} className='menu-block'>
            <span><img className='main-icons' src={Puzzle} alt='Puzzle icon'/></span>
            <Link to={routes.publishCrossword}>{strings.publishContent[language]}</Link>
          </li>
          : null
      }
      <li role='button' className='menu-block'>
        <span><img className='main-icons' src={LanguageIcon} alt='Language icon'/></span>
        <div><Language/></div>
      </li>
      <li id='login-button' role='button' onClick={() => navigate(routes.login)} className='menu-block'>
        <span><img className='main-icons' src={Admin} alt='Admin icon'/></span>
        <Link to={routes.login} >
          {strings.admin[language]}
        </Link>
      </li>
    </ul>
  );
}