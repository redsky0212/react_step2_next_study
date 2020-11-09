import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

const AppLayout = ({ children }) => {
  return (
    <div>
      <Link href="/"><a>홈</a></Link>
      <Link href="/profile"><a>프로필</a></Link>
      <Link href="/signup"><a>회원가입</a></Link>
      {children}
    </div>
  );
};

// props로 넘어오는 것들을 type설정을 해준다.
AppLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppLayout;