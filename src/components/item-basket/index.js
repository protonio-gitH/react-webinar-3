import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { plural } from '../../utils';
import './style.css';

function ItemBasket(props) {
  return (
    <div className={'Item'}>
      <div className="Item-code">{props.item.code}</div>
      <div className="Item-info">
        <div className="Item-title">{props.item.title}</div>
        <div className="Item-end">
          <div className="Item-price">{props.item.price} ₽</div>
          <div className="Item-count">{props.item.count} шт</div>
        </div>
      </div>
      <div className="Item-actions">
        <button onClick={() => props.onFunc(props.item.code)}>Удалить</button>
      </div>
    </div>
  );
}

ItemBasket.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    selected: PropTypes.bool,
    count: PropTypes.number,
  }).isRequired,
  onFunc: PropTypes.func,
};

ItemBasket.defaultProps = {
  onFunc: () => {},
};

export default React.memo(ItemBasket);
