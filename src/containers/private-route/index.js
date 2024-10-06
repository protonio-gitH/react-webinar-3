import { Navigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import useSelector from '../../hooks/use-selector';

function PrivateRoute({ children }) {
  const select = useSelector(state => ({
    isAuth: state.authorization.isAuth,
  }));

  if (location.pathname === '/login') {
    return select.isAuth ? <Navigate to={'/profile'} /> : children;
  }

  return select.isAuth ? children : <Navigate to="/login" />;
}

export default PrivateRoute;
