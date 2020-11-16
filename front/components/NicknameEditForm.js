import { Form, Input } from 'antd';
import React from 'react';

const NicknameEditForm = () => {
  // style은 useMemo나 styled-components를 사용해서 최적화 하는게 좋다.
  return (
    <Form style={{ marginBottom: '20px', border: '1px solid #d9d9d9', padding: '20px' }}>
      <Input.Search addonBefore="닉네임" enterButton="수정" />
    </Form>
  );
};

export default NicknameEditForm;