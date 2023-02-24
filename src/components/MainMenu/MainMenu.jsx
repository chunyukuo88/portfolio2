import {routes} from "../../routes";
import BlogIcon from "../../common/icons/blog.svg";
import {Link, useNavigate} from "react-router-dom";
import strings from "../../common/strings";
import Puzzle from "../../common/icons/puzzle.svg";
import LanguageIcon from "../../common/icons/language.svg";
import Language from "../../features/language/Language";
import Admin from "../../common/icons/admin.svg";
import {selectCurrentLanguage} from "../../features/language/languageSlice";
import {selectCurrentUser} from "../../features/auth/authSlice";
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
            <Link to={routes.publishCrossword}>Publish Crossword</Link>
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
          {(username)
            ? username
            : strings.admin[language]
          }
        </Link>
      </li>
    </ul>
  );
}