import React, { useCallback } from 'react';
import { Button, Card } from 'antd';
import Avatar from 'antd/lib/avatar/avatar';
import {useDispatch} from 'react-redux';
import {logoutAction} from '../reducers/user';
const UserProfile = () => {
  const dispatch = useDispatch();
  const onLogout = useCallback(() => {
    //setIsLoggedIn(false);
    dispatch(logoutAction());
  }, []);
  
  return (
    <Card
      actions={[
        <div key="twit">짹짹</div>,
        <div key="twit">짹짹</div>,
        <div key="twit">짹짹</div>,
      ]}>
      <Card.Meta
        avatar={<Avatar>ZC</Avatar>}
        title="ZeroCho"
      />
      <Button onClick={onLogout}>로그아웃</Button>
    </Card>
  );
};

export default UserProfile;