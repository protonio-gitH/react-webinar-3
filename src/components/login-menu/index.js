import React from 'react';
import { cn as bem } from '@bem-react/classname';
import './style.css';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

function LoginMenu({ isAuth, onExit, loginLink, profileLink, profileName, t }) {
  const cn = bem('LoginMenu');
  const navigate = useNavigate();
  const handleLoginClick = () => {
    const searchParams = window.location.search;
    navigate(loginLink, { state: { from: window.location.pathname + searchParams } });
  };
  return (
    <div className={cn()}>
      {!isAuth && <button onClick={handleLoginClick}>{t('login.title')}</button>}
      {isAuth && (
        <div>
          <Link
            className={cn('profile-name')}
            to={profileLink}
            style={{ marginRight: '15px', fontSize: '13px' }}
          >
            {profileName}
          </Link>
          <button onClick={onExit}>{t('login.exit')}</button>
        </div>
      )}
    </div>
  );
}

export default React.memo(LoginMenu);
