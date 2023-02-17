import {useLocation, Navigate, Outlet} from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCurrentToken } from './authSlice';
import { routes } from '../../routes';

export function RequireAuth(props){
  const token = useSelector(selectCurrentToken);
  const location = useLocation();

  return (token)
    ? <>{props.children}</>
    : <Navigate to={routes.index} state={{ from: location }} replace />;
}