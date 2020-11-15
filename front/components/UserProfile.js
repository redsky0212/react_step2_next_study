import React, { useCallback } from 'react';
import { Button, Card } from 'antd';
import Avatar from 'antd/lib/avatar/avatar';

const UserProfile = ({ setIsLoggedIn }) => {
  
  const onLogout = useCallback(() => {
    setIsLoggedIn(false);
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