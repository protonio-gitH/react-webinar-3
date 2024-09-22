import React from 'react';
import './style.css';
import PropTypes from 'prop-types';

function ModalLayout({ children }) {
  return <div className="Modal">{children}</div>;
}

export default React.memo(ModalLayout);

ModalLayout.propTypes = {
  children: PropTypes.node,
};
