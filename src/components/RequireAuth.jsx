import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export function RequireAuth(props){
  const auth = useSelector((state) => state.auth.value);
  return (!auth.user)
    ? <Navigate to={'/login'} />
    : <>{props.children}</>;
}