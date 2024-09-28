import React from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

const ProductBody = ({ description, country, category, year, price, onAdd, id, t }) => {
  const cn = bem('ProductBody');

  return (
    <div className={cn()}>
      <p className={cn('about')}>{description}</p>
      <p className={cn('country')}>
        {t('country')}: <b>{country}</b>
      </p>
      <p className={cn('category')}>
        {t('category')}: <b>{category}</b>
      </p>
      <p className={cn('year')}>
        {t('year')}: <b>{year}</b>
      </p>
      <p className={cn('year')}>
        <b>
          {t('price')}: {price} ₽
        </b>
      </p>
      <button onClick={() => onAdd(id)}>{t('add')}</button>
    </div>
  );
};

ProductBody.propTypes = {
  description: PropTypes.string,
  country: PropTypes.string,
  category: PropTypes.string,
  year: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  price: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  onAdd: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
};

ProductBody.defaultProps = {
  description: 'Описание отсутствует',
  country: 'Неизвестно',
  category: 'Без категории',
  year: 'Неизвестно',
  price: '0',
};

export default React.memo(ProductBody);
