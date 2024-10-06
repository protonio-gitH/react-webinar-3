import React, { useCallback } from 'react';
import LoginMenu from '../../components/login-menu';
import useStore from '../../hooks/use-store';
import useSelector from '../../hooks/use-selector';
import useTranslate from '../../hooks/use-translate';

function LoginMenuContainer() {
  const store = useStore();
  const { t } = useTranslate();
  const select = useSelector(state => ({
    waiting: state.authorization.waiting,
    profile: state.authorization.profile,
    isAuth: state.authorization.isAuth,
  }));
  const callbacks = {
    // Выход
    exit: useCallback(() => store.actions.authorization.exit(), [store]),
  };
  return (
    <LoginMenu
      isAuth={select.isAuth}
      onExit={callbacks.exit}
      loginLink={'/login'}
      profileLink={'/profile'}
      profileName={select.profile.profile?.name}
      t={t}
    />
  );
}

export default LoginMenuContainer;
