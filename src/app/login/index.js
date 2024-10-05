import React, { useCallback, useEffect } from 'react';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import LoginForm from '../../components/login-form';
import LocaleSelect from '../../containers/locale-select';
import useTranslate from '../../hooks/use-translate';
import Navigation from '../../containers/navigation';
import useStore from '../../hooks/use-store';
import useSelector from '../../hooks/use-selector';
import Spinner from '../../components/spinner';
import { useNavigate } from 'react-router-dom';

function Login() {
  const store = useStore();
  const { t } = useTranslate();
  const navigate = useNavigate();
  const select = useSelector(state => ({
    isAuth: state.authorization.isAuth,
    waiting: state.authorization.waiting,
    exception: state.authorization.exception,
    profile: state.authorization.profile,
  }));

  const callbacks = {
    // Логин
    login: useCallback(
      (login, password) => store.actions.authorization.login(login, password),
      [store],
    ),
  };

  return (
    <PageLayout>
      <Head title={t('title')}>
        <LocaleSelect />
      </Head>
      <Navigation />
      <Spinner active={select.waiting}>
        <LoginForm onSubmit={callbacks.login} exception={select.exception} t={t} />
      </Spinner>
    </PageLayout>
  );
}

export default Login;
