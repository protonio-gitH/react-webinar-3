import React from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

const ProductBody = ({ description, country, category, year, price, onAdd, id }) => {
  const cn = bem('ProductBody');

  return (
    <div className={cn()}>
      <p className={cn('about')}>{description}</p>
      <p className={cn('country')}>
        Страна производитель: <b>{country}</b>
      </p>
      <p className={cn('category')}>
        Категория: <b>{category}</b>
      </p>
      <p className={cn('year')}>
        Год выпуска: <b>{year}</b>
      </p>
      <p className={cn('year')}>
        <b>Цена: {price} ₽</b>
      </p>
      <button onClick={() => onAdd(id)}>Добавить</button>
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
