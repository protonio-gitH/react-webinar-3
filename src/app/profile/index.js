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
import ProfileCard from '../../components/profile-card';
import { useNavigate } from 'react-router-dom';

function Profile() {
  const store = useStore();
  const { t } = useTranslate();
  const navigate = useNavigate();
  const select = useSelector(state => ({
    waiting: state.authorization.waiting,
    profile: state.authorization.profile,
    isAuth: state.authorization.isAuth,
  }));

  return (
    <PageLayout>
      <Head title={t('title')}>
        <LocaleSelect />
      </Head>
      <Navigation />
      <Spinner active={select.waiting}>
        <ProfileCard
          name={select.profile.profile?.name}
          phone={select.profile.profile?.phone}
          email={select.profile.email}
          t={t}
        />
      </Spinner>
    </PageLayout>
  );
}

export default Profile;
