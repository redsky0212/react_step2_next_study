import React, { useCallback, useState } from 'react';
import { Button, Form, Input } from 'antd';
import Link from 'next/link';
import styled from 'styled-components';

const ButtonWrapper = styled.div`
  margin-top: 10px;
`;

const FormWrapper = styled(Form)`
  padding: 10px;
`;

const LoginForm = ({ setIsLoggedIn }) => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');

  // onChange와 같은 자주쓰는 기능의 함수들은 나중에 커스텀 훅으로 따로 빼서 만들어 주는게 좋음.
  // 단순히 모든 컴포넌트에 중복으로 들어가는 기능의 함수 이므로...
  const onChangeId = useCallback((e) => {
    setId(e.target.value);
  }, []);

  const onChangePassword = useCallback((e) => {
    setPassword(e.target.value);
  }, []);

  const onsubmitForm = useCallback(() => {
    // antd의 Form은 e.preventDefault() 가 이미 적용되어있으므로 할 필요없음.
    console.log(id, password);
    setIsLoggedIn(true);
  }, []);

  return (
    <FormWrapper onFinish={onsubmitForm}>
      <div>
      <label htmlFor="user-id">아이디</label>
        <br />
        <Input name="user-id" value={id} onChange={onChangeId} required />
      </div>
      <div>
      <label htmlFor="user-password">비밀번호</label>
        <br />
        <Input
          name="user-password"
          value={password}
          onChange={onChangePassword}
          required
        />
      </div>
      <ButtonWrapper>
        <Button type="primary" htmlType="submit" loading={false}>로그인</Button>
        <Link href="/signup"><a>회원가입</a></Link>
      </ButtonWrapper>
    </FormWrapper>
  );
};

export default LoginForm;