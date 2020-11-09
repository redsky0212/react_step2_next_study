import React from 'react';
import PropTypes from 'prop-types';

const AppLayout = ({ children }) => {
  return (
    <div>
      <div>공통메뉴</div>
      {children}
    </div>
  );
};

// props로 넘어오는 것들을 type설정을 해준다.
AppLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppLayout;