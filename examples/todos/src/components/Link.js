import React from 'react';
import PropTypes from 'prop-types';

const Link = ({ active, children, onClick, filter}) => {
  if (active === filter) {
    return <span>{children}</span>
  }

  return (
    <a href="#"
       onClick={e => {
         e.preventDefault();
         onClick(filter)
       }}
    >
      {children}
    </a>
  )
};

Link.propTypes = {
  active: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired
};

export default Link
