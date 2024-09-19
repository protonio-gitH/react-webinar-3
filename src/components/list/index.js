import React from 'react';
import PropTypes from 'prop-types';
import Item from '../item';
import './style.css';

function List({ list, renderItem, onFunc }) {
  return (
    <div className="List">
      {list.map(item => (
        <div key={item.code} className="List-item">
          {renderItem(item, onFunc)}
        </div>
      ))}
    </div>
  );
}

List.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.number.isRequired,
    }),
  ).isRequired,
  renderItem: PropTypes.func.isRequired,
  onFunc: PropTypes.func,
};

List.defaultProps = {
  list: [],
  renderItem: () => {},
  onFunc: () => {},
};

export default React.memo(List);
