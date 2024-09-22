import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { plural } from '../../utils';
import './style.css';

function Item(props) {
  // Счётчик выделений
  const [count, setCount] = useState(0);

  const callbacks = {};

  return (
    <div className={'Item'}>
      <div className="Item-code">{props.item.code}</div>
      <div className="Item-info">
        <div className="Item-title">{props.item.title}</div>
        <div className="Item-price">{props.item.price} ₽</div>
      </div>
      <div className="Item-actions">
        <button onClick={() => props.onFunc(props.item.code)}>Добавить</button>
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    selected: PropTypes.bool,
    count: PropTypes.number,
  }).isRequired,
  onFunc: PropTypes.func,
};

Item.defaultProps = {
  onFunc: () => {},
};

export default React.memo(Item);
