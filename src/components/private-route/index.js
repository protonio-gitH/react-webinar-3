import { Navigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

function PrivateRoute({ children, isAuth }) {
  const location = useLocation();

  const searchParams = window.location.search;
  if (location.pathname === '/login') {
    const from = location.state?.from || '/';
    return isAuth ? <Navigate to={from} /> : children;
  }

  return isAuth ? children : <Navigate to="/login" />;
}

export default PrivateRoute;
