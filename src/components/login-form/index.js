import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function LoginForm({ onSubmit, exception, t }) {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const cn = bem('LoginForm');

  useEffect(() => {
    setError(exception);
  }, [exception]);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (!formData.username || !formData.password) {
      setError('Заполните все поля');
      return;
    }
    onSubmit(formData.username.trim(), formData.password.trim());
  };

  return (
    <div className={cn()}>
      <h1>{t('login.title')}</h1>
      <form onSubmit={handleSubmit}>
        <div className={cn('input-block')}>
          <label htmlFor="username">{t('login.username')}</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
        </div>
        <div className={cn('input-block')}>
          <label htmlFor="password">{t('login.password')}</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        {error && (
          <div style={{ color: 'red', marginTop: '10px', marginBottom: '10px' }}>{error}</div>
        )}
        <button onSubmit={handleSubmit} type="submit">
          {t('login.button')}
        </button>
      </form>
    </div>
  );
}

LoginForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  exception: PropTypes.string,
  t: PropTypes.func.isRequired,
};

LoginForm.defaultProps = {
  exception: '',
  t: key => key,
};

export default React.memo(LoginForm);
