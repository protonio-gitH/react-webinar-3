import { useCallback, useContext, useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import useSelector from '../hooks/use-selector';
import Main from './main';
import Basket from './basket';
import Article from './article';
import LoginMenu from '../components/login-menu';
import Login from './login';
import useStore from '../hooks/use-store';
import useInit from '../hooks/use-init';
import Profile from './profile';
import useTranslate from '../hooks/use-translate';
import PrivateRoute from '../components/private-route';

/**
 * Приложение
 * Маршрутизация по страницам и модалкам
 */
function App() {
  const activeModal = useSelector(state => state.modals.name);
  const { t } = useTranslate();
  const store = useStore();
  const select = useSelector(state => ({
    isAuth: state.authorization.isAuth,
    profile: state.authorization.profile,
  }));

  useInit(
    () => {
      store.actions.authorization.recoverySession();
    },
    [],
    true,
  );

  const callbacks = {
    // Выход
    exit: useCallback(() => store.actions.authorization.exit(), [store]),
  };

  return (
    <>
      <LoginMenu
        isAuth={select.isAuth}
        onExit={callbacks.exit}
        loginLink={'/login'}
        profileLink={'/profile'}
        profileName={select.profile.profile?.name}
        t={t}
      />
      <Routes>
        <Route path={''} element={<Main />} />
        <Route path={'/articles/:id'} element={<Article />} />
        <Route
          path={'/login/'}
          element={
            <PrivateRoute isAuth={select.isAuth}>
              <Login />
            </PrivateRoute>
          }
        />
        <Route
          path={'/profile/'}
          element={
            <PrivateRoute isAuth={select.isAuth}>
              <Profile />
            </PrivateRoute>
          }
        />
      </Routes>

      {activeModal === 'basket' && <Basket />}
    </>
  );
}

export default App;
