import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function ProfileCard({ name, phone, email, t }) {
  const cn = bem('ProfileCard');
  return (
    <div className={cn()}>
      <h1>{t('profile')}</h1>
      <p className={cn('name')}>
        {t('profile.name')}: <b>{name}</b>
      </p>
      <p className={cn('phone')}>
        {t('profile.phone')}: <b>{phone}</b>
      </p>
      <p className={cn('email')}>
        email: <b>{email}</b>
      </p>
    </div>
  );
}

ProfileCard.propTypes = {
  name: PropTypes.string,
  phone: PropTypes.string,
  email: PropTypes.string,
  t: PropTypes.func.isRequired,
};

ProfileCard.defaultProps = {
  name: 'Имя не указано',
  phone: 'Телефон не указан',
  email: 'Email не указан',
  t: key => key,
};

export default memo(ProfileCard);
