import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { Menu, Input, Row, Col } from 'antd';

import {useSelector} from 'react-redux';

import UserProfile from '../components/UserProfile';
import LoginForm from '../components/LoginForm';

const AppLayout = ({ children }) => {
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  // redux의 state에서 값 가져옴
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
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
          <Input.Search enterButton style={{verticalAlign: 'middle'}} />
        </Menu.Item>
        <Menu.Item>
          <Link href="/signup"><a>회원가입</a></Link>
        </Menu.Item>
      </Menu>
      <Row gutter={8}>
        <Col xs={24} md={6}>
          {isLoggedIn ? <UserProfile /> : <LoginForm />}
        </Col>
        <Col xs={24} md={12}>{children}</Col>
        <Col xs={24} md={6}>
          <a href="http://hyun0238.dothome.co.kr/redsky/devil" target="_blank" rel="noreferrer noopener">Made by Redsky</a>
        </Col>
      </Row>
    </>
  );
};

// props로 넘어오는 것들을 type설정을 해준다.
AppLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppLayout;