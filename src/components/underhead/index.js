import React from 'react';
import Controls from '../controls';
import BasketInfo from '../basketinfo';
import PropTypes from 'prop-types';
import './style.css';

function UnderHead({ onOpenOrCloseModal, count, sum }) {
  return (
    <div className="UnderHead">
      <BasketInfo count={count} sum={sum} />
      <Controls onOpenOrCloseModal={onOpenOrCloseModal} />
    </div>
  );
}

UnderHead.propTypes = {
  onOpenOrCloseModal: PropTypes.func,
  count: PropTypes.number,
  sum: PropTypes.number,
};

UnderHead.defaultProps = {
  onOpenOrCloseModal: () => {},
  count: 0,
  sum: 0,
};

export default React.memo(UnderHead);
