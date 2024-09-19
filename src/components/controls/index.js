import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

function Controls({ onOpenOrCloseModal }) {
  return (
    <div className="Controls">
      <button onClick={() => onOpenOrCloseModal()}>Перейти</button>
    </div>
  );
}

Controls.propTypes = {
  onOpenOrCloseModal: PropTypes.func,
};

Controls.defaultProps = {
  onOpenOrCloseModal: () => {},
};

export default React.memo(Controls);
