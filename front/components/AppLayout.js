import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { Menu } from 'antd';


const AppLayout = ({ children }) => {
  return (
    // <div>
    //   <Link href="/"><a>홈</a></Link>
    //   <Link href="/profile"><a>프로필</a></Link>
    //   <Link href="/signup"><a>회원가입</a></Link>
    //   {children}
    // </div>
    <>
      <Menu mode="horizontal">
        <Menu.Item>
          <Link href="/"><a>홈</a></Link>
        </Menu.Item>
        <Menu.Item>
          <Link href="/profile"><a>프로필</a></Link>
        </Menu.Item>
        <Menu.Item>
          <Link href="/signup"><a>회원가입</a></Link>
        </Menu.Item>
      </Menu>
      {children}
    </>
  );
};

// props로 넘어오는 것들을 type설정을 해준다.
AppLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppLayout;