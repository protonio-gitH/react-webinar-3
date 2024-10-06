import { Navigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import useSelector from '../../hooks/use-selector';

function PrivateRoute({ children }) {
  //   const location = useLocation();

  const select = useSelector(state => ({
    isAuth: state.authorization.isAuth,
  }));

  //   const searchParams = window.location.search;
  if (location.pathname === '/login') {
    // const from = location.state?.from || '/';
    return select.isAuth ? <Navigate to={'/profile'} /> : children;
  }

  return select.isAuth ? children : <Navigate to="/login" />;
}

export default PrivateRoute;
