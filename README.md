# (리뉴얼)React로 NodeBird SNS만들기 (Next사용)
## Next사용 버전 및 필요 라이브러리
* next 9 version [https://nextjs.org/blog/next-9](https://nextjs.org/blog/next-9)
  - 9버전에서 바뀐점 정리
* node 14 [https://nodejs.org/ko/](https://nodejs.org/ko/)
* ant design 4 [https://ant.design/](https://ant.design/)
  - 아이콘, Form부분이 살짝 바뀜.
* styled component는 5버전.

## 강좌 순서 및 바뀐점
* 프론트앤드 개발자 입장에서 개발 순서.
* react가 있는데 next를 사용하는 이유.
* next를 사용하는 이유
  - 가장큰 장점은 SSR(server side rendering)
    - 브라우저 ---> 프론트 서버 ---> 백앤드 서버 ---> DB
  - 리액트는 SPA방식(CSR)
    - html이 하나이고 데이터가 없음.
    - data는 backendserver에서 data만 브라우저로 받음.
## Next 역할
* SSR 지원 (검색엔지 노출에 의미가 있음.)
* `next에서 SSR 방식은, 처음 진입하여 호출시에는 ssr방식으로 가져오고 이후 부터는 spa방식으로 페이지를 가져옴.`
* 화면을 미리 불러오고 로딩창을 띄워준 후 이후에 백앤드에서 데이터만 가져와 화면에 뿌려준다.
  - 상황에 따라 SSR로 해야할지 CSR 으로 할지 결정해야한다.
* 코드 스플리팅 - 현재 로딩하는 화면에서만 사용하는 모듈 및 화면을 가져와 로딩시키는 기술.
* 프리렌더링 - 검색엔진일때만 SSR로 해서 보내주는 기술 (일반적일때는 SPA)

## 실무일때는
* SSR, 코드스플리팅은 거의 모두 적용 해줘야 한다.
* next를 쓸 필요 없을것 같은 화면은, 관리자화면같은 경우에는 안써도 될듯.

## Next 강좌 실전예제 준비사항
* 강좌소스 [https://github.com/ZeroCho/react-nodebird](https://github.com/ZeroCho/react-nodebird)
* node.js설치
* git설치
* 강좌 진행 소스를 올릴 폴더를 하나 만들어서 front폴더를 만든다.
* front 폴더에서 npm init 실행
  - 그럼 package.json파일이 생성된다.
* `[중요]` npm init한 후 git에 연결된 후부터는 무조건 .gitignore파일을 생성해서 올리지 말아야할 
파일들을 꼭 관리한다.
  - [https://www.gitignore.io/](https://www.gitignore.io/)
* front 프로젝트에 이제 next 9버전을 설치한다.
  - npm i next@9 (9버전 설치를 위함)
  - 설치 후 package.json의 script부분에 "dev":"next"로 수정한다.
* 혹시 nodejs강좌가 필요하면 thebook.io에서 node교과서 참조한다.[https://thebook.io/080229/](https://thebook.io/080229/)
* pages폴더 생성
  - index.js 파일 생성. 간단한 소스 코딩
  - next에서는 상단에 import React from 'react';를 안넣어도 된다. 찜찜하면 넣어도 됨.
  ```javascript
  const Home = () => {
    return (
      <div>Hello, Next!</div>
    );
  };

  export default Home;
  ```
* pages폴더는 꼭 이름을 똑같이 해줘야 한다.
* npm run dev를 실행해 본다.
  - error가 남 react react-dom을 설치 하라고 뜸.
* npm i react react-dom 설치
* 다시 npm run dev실행
  - localhost:3000에서 서버실행되면 "Hello, Next!" 문구를 확인할 수 있다.

## page와 레이아웃 설정
* pages폴더안에 profile.js, signup.js 페이지를 생성.
```javascript
// profile.js ------------------------
import React from 'react';

const Profile = () => {
  return (
    <div>프로필!</div>
  );
};

export default Profile;
// signup.js -------------------------
import React from 'react';

const Signup = () => {
  return (
    <div>회원가입 페이지!</div>
  );
};

export default Signup;
```
* next는 pages폴더에 있는 파일 및 폴더를 이용하여 라우팅을 적용해준다.
  - localhost:3000  <--- index.js파일
  - localhost:3000/profile  <---- profile.js
  - localhost:3000/signup  <---- signup.js
* [name].js 이런식으로 파일을 생성해서 동적 라우팅도 구현할 수 있다. 이것은 이 후 강좌에서 다룬다.
* page가 아닌 일반 component파일들은 components폴더를 만들어 그 안에 생성해서 관리한다.
  - 여기에 AppLayout.js 컴포넌트 생성
  - prop-types를 설치해서 사용한다. (npm i prop-types)
    - props로 넘어오는 것들은 PropTypes로 검사를 해주는게 좋음. (TypeScript라면 사용할 필요가 없음)
    - 만약 children에 아무것도 없으면 'Failed prop type: The prop \`children\` is marked as required in \`AppLayout\`, but its value is \`undefined\`.' 에러가 발생하였다.
  ```javascript
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
  // 위와같이 만들어진 AppLayout.js 컴포넌트를 index.js파일에서 사용하게 코딩해보자.
  // index.js
  import AppLayout from '../components/AppLayout';

  const Home = () => {
    return (
      <AppLayout> {/* 레이아웃을 이런식으로 감싸준다. */}
        <div>Hello, Next!</div>
      </AppLayout>
    );
  };

  export default Home;
  ```
  * 페이지별로 여러 다양한 레이아웃도 적용 가능하다.
    - 원하는 페이지의 jsx부분에 layout컴포넌트를 import해서 위처럼 감싸주면 된다.

## Link 사용
* next에서는 react-router사용 안함.
  - 자체적으로 Link라는것을 사용함.
  ```javascript
  // next/link를 import한다.
  import Link from 'next/link';

  // jsx부분에 아래와 같이 Link를 사용하고 href에 라우터 경로를 넣는다. 'a'태그에 href를 넣지 않는다.
  <Link href="/"><a>홈</a></Link>
  <Link href="/profile"><a>프로필</a></Link>
  <Link href="/signup"><a>회원가입</a></Link>
  ```
## eslint 설치 사용.
* npm i eslint eslint-plugin-import eslint-plugin-react eslint-plugin-react-hooks -D (개발시에만 사용할꺼기때문에)
* .eslintrc 파일 생성.
```javascript
{
  "parserOptions": {
    "ecmaVersion": 2020,  // js버전
    "sourceType": "module", // import export를 사용할꺼므로 module
    "ecmaFeatures": {
      "jsx": true // jsx를 사용
    }
  },
  "env": {  // 환경
    "browser": true,  // 브라우저 돌아감
    "node": true  // node에서 돌아감
  },
  "extends": [
    "eslint:recommended", // eslint의 기본규칙을 따른다.
    "plugin:react/recommended"
  ],
  "plugins": [
    "import", // 아까 설치한 plugin을 적음.
    "react-hooks" // 아까 설치한 plugin을 적음.
  ],
  "rules": {  // 개별적으로 룰을 끄거나 켤 수 있다.
    "jsx-a11y/label-has-associated-control": "off",
    "jsx-a11y/anchor-is-valid": "off"
  }
}
```
* eslint를 설치 했지만 vscode에서 연동 되려면 extension을 설치 해줘야 한다.

## antd 4버전 디자인템플릿 사용 (npm i antd @ant-design/icons)
* 프론트앤드 시각에서 더미 데이터를 가지고 진행.
* ant design [https://ant.design/](https://ant.design/)
* 아이콘은 용량이 많아서 따로 분리 되어서 icons을 따로 설치해준다.
* react-dropzone (이미지 등 드래그 앤 드롭 기능 라이브러리)[https://react-dropzone.js.org/](https://react-dropzone.js.org/)

## styled-components 사용(npm i styled-components)
* emotion(이모션): styled-components와 거의 비슷하나 `SSR에 더 편함`.
  - [https://emotion.sh/docs/introduction](https://emotion.sh/docs/introduction)
* npm trends에서 어떤게 더 대중적인지 알 수 있다. [https://www.npmtrends.com/](https://www.npmtrends.com/)

## antd를 사용하여 메뉴 만들기(_app.js)
* 대충 되어있는 메뉴 부분을 antd를 사용하여 수정해본다.
```javascript
// 기존소스
<div>
  <Link href="/"><a>홈</a></Link>
  <Link href="/profile"><a>프로필</a></Link>
  <Link href="/signup"><a>회원가입</a></Link>
  {children}
</div>
// antd디자인을 적용해보자.
import { Menu } from 'antd';

return (
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
```
* 위 처럼 했을때 변경 되기는 했지만 뭔가 CSS가 적용 안된듯 하다.
  - antd의 react에서 css를 연결해줘야한다. 공식문서의 DOCS의 설치방법을 참조해서 css를 로딩 시킨다.
  - css파일은 import를 못하는데 webpack이 css의 import를 도와 결과물에 style태그로 모두 가져오게 적용해준다.
    - antd의 css파일은 최상위 공통 컴포넌트에서 적용해준다.
      - _app.js는 index.js의 부모라고 생각하면 됨.
    - 이때 기본 next에서 제공해주는 pages안에 _app.js파일에 적용해준다.
    > (잠깐 참조) next에서 제공해주는 사용자 지정 기능
    >> _app.js [https://nextjs.org/docs/advanced-features/custom-app](https://nextjs.org/docs/advanced-features/custom-app)공통적인 레이아웃 유지 등등.<br><br>
    >> _document.js [https://nextjs.org/docs/advanced-features/custom-document](https://nextjs.org/docs/advanced-features/custom-document)화면의 html태그와 body태그의 보강을 도와준다.<br>
    >> _error.js [https://nextjs.org/docs/advanced-features/custom-error-page](https://nextjs.org/docs/advanced-features/custom-error-page) 404.js, 500.js도 만들 수 있으며 에러처리에 도움을 줍니다.
    ```javascript
    // _app.js
    import React from 'react';
    import ProTypes from 'prop-types';
    import 'antd/dist/antd.css';

    const NodeBird = ({ Component }) => {
      return (
        <Component />
      );
    };

    NodeBird.ProTypes = {
      Component: ProTypes.elementType.isRequired,
    };

    export default NodeBird;
    ```
## next에서 head태그 부분을 커스텀 하기
* 예를 들어 title이나 meta태그를 적용하고싶다 했을때
  - next에서 Head컴포넌트를 제공한다.[https://nextjs.org/docs/api-reference/next/head](https://nextjs.org/docs/api-reference/next/head)
  ```javascript
  // _app.js (모두 공통적용할 때)
  import Head from 'next/head';

  return (
    <>
    <Head>
      <title>NodeBird</title>
      <meta charSet="utf-8" />
    </Head>
    <Component />
    </>
  );
  ```
* 각각 페이지에 다르게 head를 적용해보자
```javascript
// profile.js (각각의 페이지에 head적용할 때)
import Head from 'next/head';
<>
    <Head>
      <title>내 프로필 : NodeBird</title>
      <meta charSet="utf-8" />
    </Head>
    <AppLayout>
      <div>프로필!</div>
    </AppLayout>
</>
// signup.js
import Head from 'next/head';
<>
    <Head>
      <title>회원가입 : NodeBird</title>
      <meta charSet="utf-8" />
    </Head>
    <AppLayout>
      <div>회원가입 페이지!</div>
    </AppLayout>
</>
```

## antd의 반응형 그리드 적용해보기
* antd의 grid시스템, input 적용해보기
* 먼저 antd의 Input Search넣어보기
```javascript
// 메뉴 넣었던 부분에 Input Search 넣기
import { Menu, Input } from 'antd';

<Input.Search enterButton style={{verticalAlign: 'middle'}} />
```
* grid 시스템 적용해보기
  - 모바일, 테블릿, pc에 따라 방응형으로 저절로 바뀌게 적용.
  - Row, Col
  - 반응형을 할때는 모발일 부터 점점 큰 사이즈로 진행해 나가는게 좋다.
  ```javascript
  // 최대 24를 기준으로 적용.
  // xs, sm, md, lg 등 다양한 크기에 대한 적용을 할 수있다.
  // gutter : 사이를 벌려주는 것
  // 속성중 target="_blank"는 보안위협이 있어서  rel="noreferrer noopener" 같이 써준다.
  <Row gutter={8}>
    <Col xs={24} md={6}>왼쪽</Col>
    <Col xs={24} md={12}>{children}</Col>
    <Col xs={24} md={6}>
      <a href="http://hyun0238.dothome.co.kr/redsky/devil" target="_blank" rel="noreferrer noopener">Made by Redsky</a>
    </Col>
  </Row>
  ```
  - 이건 UI 컴포넌트 제품마다 다 다르므로 공식문서에서 참고하면서 적용하면 됨.

## 로그인 폼 만들기
* 그리드의 왼쪽 부분에 로그인 폼을 만들어 보자.
* 초반 서버가 없는 상태에서는 임시 state를 만들어서 그 데이터를 이용하여 사용한다.
* 컴포넌트는 따로 components폴더를 만들어 그쪽에서 관리한다.
  - 예전에는 container와 component를 따로 기능에따라 따로 만들었는데 훅스 나오면서 이제 굳이 따로 구분할 필요가 없다.
```javascript
import UserProfile from '../components/UserProfile';
import LoginForm from '../components/LoginForm';

// 임시 상태값을 만들어 로그인 여부에따라 다른 컴포넌트를 보여주게 처리.
const [isLoggedIn, setIsLoggedIn] = useState(false);
{isLoggedIn ? <UserProfile /> : <LoginForm />}
```
* 임시 로그인 상태값을 이용하여 위처럼 로그인 여부에 따라 두가지 컴포넌트를 만들어 렌더링 시킨다.
  - [중요]`작업중 예상치 못한 에러가 발생하는 부분에 대하여 나중에 따로 블로그 같은곳에 해결방법 및 그때의 기억들을 자세히 정리하는 사전 느낌으로, 좋은 습관인거 같다.`
* LoginForm.js 파일 기본 코딩 해보기
```javascript
// LoginForm.js ---------------------------
import React, { useCallback, useState } from 'react';
import { Button, Form, Input } from 'antd';
import Link from 'next/link';

const LoginForm = () => {
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

  return (
    <Form>
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
      <div>
        <Button type="primary" htmlType="submit" loading={false}>로그인</Button>
        <Link href="/signup"><a>회원가입</a></Link>
      </div>
    </Form>
  );
};

export default LoginForm;
```
* 커스텀 훅에 대하여 공부할 필요가 있음.

## 리렌더링에 대하여
* react는 return부분 중에서 바뀐부분만 리렌더링 된다.
* styled-components를 사용할때 주의할 점.
  - 스타일 객체를 바로 jsx부분에 넣으면 안됨.
  - 객체가 jsx안에 있으면 hooks방식일 경우 render부분을 react가 파악할때 항상 새로운 객체가 생성되서 들어온것으로 판단하여 리렌더링 된다.
```javascript
// 좋지않은 방식
const Aaa = () => {
  render (
    <div style={{marginTop: 5}}>style적용하기</div>  // 객체를 바로 바인딩 시킨 형태는 리렌더링이 됨(주의).
  );
};
// styled-components로 수정하여 적용한 모습
import styled from 'styled-components';

// 일반 div태그같은 형태일때 적용한 모습
const StyleDiv = styled.div`
  margin-top: 5px;
`;
// antd와 같은 다른 것일때 적용한 모습
const SearchInput = styled(Input.Search)`
  margin-top: 5px;
`;

const Aaa = () => {
  render (
    <StyleDiv></StyleDiv>
    <SearchInput />
  );
};
```
* inline 스타일을 넣지말고 styled-components를 사용하거나 styled-components가 싫다면 useMemo를 사용하여 스타일을 적용한다.
```javascript
// useMemo사용한 방법
const style = useMemo(() => ({ marginTop: 10 }), []);

return (
  <div style={style}></div>
);
```

## 더미데이터로 로그인하기
* 서버가 없는 경우 더미데이터를 이용하여 로그인 화면 처리 하기
```javascript
// AppLayout.js----------------------------------
// (isLogedIn값을 이용하여 LoginForm컴포넌트를 보여주거나 숨기거나 한다.)
return (
  <Col>
  {isLoggedIn ? <UserProfile /> : <LoginForm setIsLoggedIn={setIsLoggedIn} />}
  </Col>
);
// LoginForm.js------------------------------------
// (props로 넘어온 setIsLoggedIn로 값을 변경한다.)
const onsubmitForm = useCallback(() => {
  // antd의 Form은 e.preventDefault() 가 이미 적용되어있으므로 할 필요없음.
  console.log(id, password);
  setIsLoggedIn(true);
}, []);

return (
  <Form onFinish={onsubmitForm}>
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
  </Form>
);
```
* 로그인 하고나면 UserProfile컴포넌트가 열리므로 UserProfile컴포넌트를 코딩한다.
```javascript
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
```

## 크롬확장프로그램 및 Q n A
* a태그에 target="_blank"를 하면 꼭 rel="noreferrer noopener" 를 붙여준다. 보안에 위협되는 것을 방지하기 위함.
* 크롬확장 프로그램에서 React Developer Tools와 Redux DevTools를 설치.

## 프로필 페이지 만들기
* 화면 처음 코딩할때 우선 들어갈 컴포넌트를 나열하는 식으로 대략 코딩을 한다.
* Form은 왠만하면 이미 만들어져있는 라이브러리를 사용하는걸 추천.
  - 아니면 미리 만들어놓고 그걸 재사용하는것도 나쁘지 않을거 같다고 생각...
```javascript
// profile.js-------------------------------------------------
import React from 'react';

import NicknameEditForm from '../components/NicknameEditForm';
import AppLayout from '../components/AppLayout';
import FollowList from '../components/FollowList';

const Profile = () => {
  const followerList = [{ nickname: '제로초' }, { nickname: '바보' }, { nickname: '노드버드오피셜' }];
  const followingList = [{ nickname: '제로초' }, { nickname: '바보' }, { nickname: '노드버드오피셜' }];

  return (
    <AppLayout>
      <NicknameEditForm />
      <FollowList
        header="팔로잉 목록"
        data={followingList}
      />
      <FollowList
        header="팔로워 목록"
        data={followerList}
      />
    </AppLayout>
  );
};

export default Profile;
```
* 더미데이터로 List를 그림.
* 인라인으로 들어가는 객체 데이터는 useMemo, styled-components등 으로 최적화 한다.
* antd의 icons는 따로 분리되어서 따로 가져와서 적용해준다.
* 예전에는 container에서 component의 구조로 되어있기 때문에 잘개 쪼개었을때 부담이 있었으나. hooks구조에서는 잘개 쪼개는거에 대한 부담이 없다고 생각하면 됨.
* 컴포넌트는 잘개잘개 쪼개자!! 
* 100줄 넘어가면 쪼개자!!
* 컴포넌트에 props개수가 너무 많아지면 쪼갠다 생각하면 됨.
```javascript
// FollowList.js-------------------------------------------------
import { Button, Card, List } from 'antd';
import { StopOutlined } from '@ant-design/icons';
import React from 'react';
import PropTypes from 'prop-types';

const FollowList = ({ header, data }) => (
  <List
    style={{ marginBottom: '20px' }}
    grid={{ gutter: 4, xs: 2, md: 3 }}
    size="small"
    header={<div>{header}</div>}
    loadMore={<div style={{ textAlign: 'center', margin: '10px 0'}}><Button>더 보기</Button></div>}
    bordered
    dataSource={data}
    renderItem={(item) => (
      <List.Item style={{ marginTop: '20px' }}>
        <Card actions={[<StopOutlined key="stop" />]}>
          <Card.Meta description={item.nickname} />
        </Card>
      </List.Item>
    )}
  />
);

FollowList.propTypes = {
  header: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
};

export default FollowList;
```
```javascript
// NicknameEditForm.js-------------------------------------------------
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
```

## 회원가입 페이지 만들기 &amp; 커스텀 훅!!
```javascript
import React, { useState, useCallback } from 'react';
import { Form, Input, Checkbox, Button } from 'antd';
import PropTypes from 'prop-types';

import AppLayout from '../components/AppLayout';
import useInput from '../hooks/useInput';

const TextInput = ({ value }) => {
  return (
    <div>{value}</div>
  )
};

TextInput.propTypes = {
  value: PropTypes.string,
};

const Signup = () => {
  const [passwordCheck, setPasswordCheck] = useState('');
  const [term, setTerm] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [termError, setTermError] = useState(false);

  const [id, onChangeId] = useInput('');
  const [nick, onChangeNick] = useInput('');
  const [password, onChangePassword] = useInput('');

  const onSubmit = useCallback(() => {
    if (password !== passwordCheck) {
      return setPasswordError(true);
    }
    if (!term) {
      return setTermError(true);
    }
  }, [password, passwordCheck, term]);

  const onChangePasswordCheck = useCallback((e) => {
    setPasswordError(e.target.value !== password);
    setPasswordCheck(e.target.value);
  }, [password]);

  const onChangeTerm = useCallback((e) => {
    setTermError(false);
    setTerm(e.target.checked);
  }, []);

  return (
    <AppLayout>
      <Form onFinish={onSubmit} style={{ padding: 10 }}>
        <TextInput value="135135" />
        <div>
          <label htmlFor="user-id">아이디</label>
          <br />
          <Input name="user-id" value={id} required onChange={onChangeId} />
        </div>
        <div>
          <label htmlFor="user-nick">닉네임</label>
          <br />
          <Input name="user-nick" value={nick} required onChange={onChangeNick} />
        </div>
        <div>
          <label htmlFor="user-password">비밀번호</label>
          <br />
          <Input name="user-password" type="password" value={password} required onChange={onChangePassword} />
        </div>
        <div>
          <label htmlFor="user-password-check">비밀번호체크</label>
          <br />
          <Input
            name="user-password-check"
            type="password"
            value={passwordCheck}
            required
            onChange={onChangePasswordCheck}
          />
          {passwordError && <div style={{ color: 'red' }}>비밀번호가 일치하지 않습니다.</div>}
        </div>
        <div>
          <Checkbox name="user-term" checked={term} onChange={onChangeTerm}>제로초 말을 잘 들을 것을 동의합니다.</Checkbox>
          {termError && <div style={{ color: 'red' }}>약관에 동의하셔야 합니다.</div>}
        </div>
        <div style={{ marginTop: 10 }}>
          <Button type="primary" htmlType="submit">가입하기</Button>
        </div>
      </Form>
    </AppLayout>
  );
};

export default Signup;
```
* 커스텀 훅스 만들기
  - 먼저 hooks폴더를 생성
  - js파일을 만들어 커스텀 훅스를 만든다. 여기서는 useInput.js
  - 특히 form부분의 input같은 것들은 중복인 소스들이 많다. 그럴때 커스텀 훅스를 만들어 사용하면 중복제거에 좋다.
  - 소스가 조금 다르면 커스텀훅스로 합치지 않아도 된다.
  ```javascript
  import { useState, useCallback } from 'react';

  export default (initValue = null) => {
    const [value, setter] = useState(initValue);
    const handler = useCallback((e) => {
      setter(e.target.value);
    }, []);
    return [value, handler];
  };
  ```

## 리덕스, 필요성
* redux, mobx 가 많이 쓰임
  - redux는 초보일때 사용하면 좋으나 코드량이 많음
  - 초보 탈출 이후에는 mobx을 사용하는게 생산성 측면에서 좋음.
* redux는 중앙 데이터 저장소 역할.
  - redux, mobx, context API모두 비슷함.
  - 너무 커지면 리듀서를 쪼개서 관리 할 수도 있음.
* 비동기 데이터 요청.
  - context API를 사용하면 요청, 성공, 실패 처리에 대한 로직을 직접 구현해야함.
    - component에서 비동기 요청을 하게되는 경우가 생김.(좋지않음)
    - 물론 따로 분리해서 만들 수도 있는데 그렇게 되면 결국 redux와 같게 됨.
## next일때 wrapper, 리덕스 기본 사용법
* 일단 `next`를 redux와 붙이는 과정이 꽤나 복잡한데 그걸 좀 쉽게 해주는 라이브러리가 있음.
  - next-redux-wrapper (next를 사용하지 않고 react만 사용하면 쓸필요없음)
  - next-redux-wrapper를 사용하면 일반 redux를 사용했을때와 동작이 좀 다를 수 있음.
  - npm i redux 리덕스설치
  - 설치 : npm i next-redux-wrapper (6버전)
    - 버전 달라지면 사용방법이 달라지므로 공식문서 꼭 확인해야함.
  - store폴더 생성하고 configureStore.js파일 생성.
    - wrapper의 기본구조
  ```javascript
  import { createWrapper } from 'next-redux-wrapper';
  import {createStore} from 'redux';

  const configureSotre = () => {
    //const store = createStore(reducer);
    //return store;
  };
  // next-redux-wrapper의 createWrapper를 사용하여 redux의 createStore를 감싸준다.
  // param : 첫번째는 redux의 store, 두번째는 옵션객체.
  const wrapper = createWrapper(configureSotre, {
    // 개발시에는 debug를 true로 켜두는게 좋음.
    debug: process.env.NODE_ENV === 'development,'
  });

  export default wrapper;
  ```
* _app.js 파일 수정.
  - next를 쓰면 Provider부분을 사용하지 않는다.
    - Provider는 react-redux에 있음.
  - 위에서 만든 wrapper로 앱 컴포넌트를 감싸준다.
  ```javascript
  // 만든 wrapper를 가져온다.
  import wrapper from '../store/configureStore';
  // 마지막 export부분에 감싸준다.
  export default wrapper.withRedux(NodeBird);
  ```

## next-redux-wrapper HYDRATE
* 추 후 6강에서 HYDRATE에 대하여 설명
* reducer의 case문에 HYDRATE를 하나 추가한다.

## 리덕스 원리와 불변성(중요)
* redux의 구조
  -  state ----> action(상태변경을 위한 action) -----> reducer(각 action의 구체적인 값 변경에 대한 로직구현) ----> state
* 변경할 state를 action을 통하여 불벼성(상태변경이 되었다고 react가 인식)으로 state를 변경.
* 원하는 상태값 변경을 할때마다 action을 만들고 reducer에 로직적용을 해줘야함.(코드량이 많아짐)
* reducer가 길어지면 쪼개서 관리.
* 상태변경을 {...state, name: 변경값} 이렇게 하는 이유.
  - 객체를 새로 만들어 상태값을 바꿔줘야 react가 인식함.
  - 그렇지 않고 바로할당 obj.name = 값; 이렇게 바꾸면 참조 관계가 되므로 실제 내부값은 변경되었지만 객체 자체가 바뀌지 않았으므로 history관리가 되지 않고 react는 변경에 대한 인식을 하지 못함.
  - ...state를 사용하는 이유 : 항상 새로운 겍체로 변경하면 메모리에 새로 생성 되므로 메모리 관리가 되지 않을 수 있음. ...state를 사용하면 객체 내부의 값들은 참조유지가 되므로 메모리 관리에 유리하다.
  - 어차피 배포모드에서는 가비지가 되므로 문제없음.

## Redux들어가기전 Redux관련 정리
* REACT_REDUX.md파일을 참조.
* redux 3원칙
  - 모든 상태는 하나의 소토어 안에서... 데이터 흐름의 원천은 store.
  - state는 readonly이다.
  - 상태변경은 action을 통한 dispatch로 기존 상태값을 가져와 새로운객체에 입력하여 return.
* action
```javascript
// action 생성함수
export const addCart = (item) => {
  // action객체 리턴
  return {
    type: 'ADD_ITEM',
    payload: item,
  };
};
```
  - action은 type속성을 가진 js객체.
  - action 생성함수는 액션객체를 생성.
  - dispatch 메서드에 넣어서 호출 (use dispatch)

## redux실제 구현(기본원리)
* 일단 react-redux의 connect를 사용하지 않고 적용하는 방법 설명.
* 루트에 reducers, store폴더 생성.
* react-redux의 useSelector, useDispatch사용하는 방법
* 일단 reducers폴더를 생성하고 index.js파일 생성.
  - 루트 리듀서를 만든다.(리듀서는 함수이다.)
  ```javascript
  // 리듀서의 기본구조
  const rootReducer = (state, action) => {
    switch (action.type) {
      default:
        return state;
    }
  };

  export default rootReducer;
  ```
  ```javascript
  // configureStore.js에 reducer를 연결시킨다.
  import reducer from '../reducers';

  const configureSotre = () => {
    const store = createStore(reducer); // reducer가져옴.
    return store;
  };
  ```
* initialState붙임, action객체연결
```javascript
// 초기 state
const initialState = {
  name: 'redsky',
  age: 30,
  password: 'babo',
};
// 액션객체(type속성이 포함되어있는 객체)
// 이 action객체를 dispatch할때 첫번째 인자로 사용한다.
const changeNickname = {
  type: 'CHANGE_NICKNAME',
  data: 'boogicho',
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    // dispatch하면 그 type에 해당하는 case가 실행됨.
    case 'CHANGE_NICKNAME':
      return { ...state, name: action.data };
    default:
      return state;
  }
};
```
* 매번 너무 많은 액션객체가 생길 수 있음. (문제점)
  - action creator(동적액션생성기) 사용
  - data를 인자로 받아 액션객체를 리턴하는 식으로 개선이 됨.
```javascript
// action creator
const changeNickname = (data) => {
  return {
    type: 'CHANGE_NICKNAME',
    data,
  };
};

// component부분에서 dispatch할때 값만 바꾸면 실행되게 할 수 있음.
store.dispatch(changeNickname('boogicho'));
```
* 다음은 async action creator가 있다.(saga때 배움)
## AppLayout.js, LoginForm에서 action사용해보기
* react-redux의 `useSelector, useDispatch`사용 (설치: `npm i react-redux`)
  - useSelector : redux의 state값을 가져오는것
  - useDispatch : redux의 action객체를 실행해서 해당 type의 reducer를 실행하는 것.
  - AppLayout.js에서 redux의 store의 사용할 값을 useSelector로 가져온다.
  ```javascript
  import {useSelector} from 'react-redux';

  const AppLayout = ({ children }) => {
    // redux의 state에서 값 가져옴
    const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

    return (
      {isLoggedIn ? <UserProfile /> : <LoginForm />}
    );
  };
  ```
  - LoginForm.js컴포넌트에서 dispatch해보기
  ```javascript
  import {useDispatch} from 'react-redux';
  import {loginAction} from '../reducers';

  const LoginForm = () => {
    const dispatch = useDispatch();

    const onsubmitForm = useCallback(() => {
      // redux의 상태값 변경 action실행
      dispatch(loginAction());
    }, []);

    return (<FormWrapper onFinish={onsubmitForm}></FormWrapper>);
  };
  ```
## 미들웨어, 리덕스 데브툴즈 연결
* 만든 reducer로 createStore를 통해 만든 store 코딩 부분이 있다.
  - 이때 createStore()의 첫번째인자는 reducer이고 두번째 인자에는 store에 미들웨어를 연결할 수 있다.
  - 설치한 react devtools와 연결하기 위하여 `npm i redux-devtools-extension` 설치하고 연결.
```javascript
// configureStore.js파일---------------------------------
import {composeWithDevTools} from 'redux-devtools-extension';
const configureSotre = () => {
  const middlewares = [];
  const enhancer = process.env.NODE_ENV === 'production' ?
                    compose(applyMiddleware(...middlewares)) // 배포용일때는 devtools와 연결하지 않음.
                    : composeWithDevTools(applyMiddleware(...middlewares)) // 개발일때는 devtools와 연결

  const store = createStore(reducer, enhancer);
  return store;
};
```
* 미들웨어를 배열로 따로 빼서 그것을 구조분해해서 applyMiddleware에 넘겨줘야 에러가 나지 않는다.

## 리듀서 쪼개기
* reducer가 너무 길어지면 다른 파일로 쪼개서 관리한다.
  - reducers폴더에 user.js, post.js파일을 따로 만들어서 리듀서를 쪼갠다.
  - 기존 reducers/index.js에 모두 모여있던 소스를 각 업무에 맞게 나눠서 소스를 분리해준다.
* reducers/index.js 파일 다시 정리
  - reducer는 함수이기때문에 객체는 합치기 쉽지만 함수는 합치기 어려우므로 combineReducer의 도움을 받아 합친다.
  - 각각의 initialState도 각 user안에, post안에 initialState가 들어가 있게 합쳐진다.
```javascript
import {HYDRATE} from 'next-redux-wrapper';
import { combineReducers } from 'redux'; // 흩어져있는 리듀서를 합치기 위한 것.

import user from './user';
import post from './post';

const rootReducer = combineReducers({
  // ssr을 위한 HYDRATE를 root에 추가.
  index: (state = initialState, action) => {
    switch (action.type) {
      case HYDRATE:
        console.log(HYDRATE);
        return {...state, ...action.payload};
      default:
        return state;
    }
  },
  user,
  post,
});

export default rootReducer;
```
```javascript
// reducers/user.js--------------------------------------------
const initialState = {
  isLoggedIn: false,
  user: null,
  signUpData: {},
  loginData: {},
};

// action creator
export const loginAction = (data) => {
  return {
    type: 'LOG_IN',
    data,
  };
};
export const logoutAction = (data) => {
  return {
    type: 'LOG_OUT',
    data,
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOG_IN':
      return {
        ...state,
          isLoggedIn: true,
          user: action.data,
      };
    case 'LOG_OUT':
      return {
        ...state,
        isLoggedIn: false,
        user: null,
      };
    default:
      return state;
  }
};

export default reducer;
```
```javascript
// reducers/post.js--------------------------------------------
const initialState = {
  mainPosts: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default reducer;
```
* 이렇게 분리해서 만들어진 reducer를 각 화면에서 불러오는 부분도 경로가 틀려졌기 때문에 수정해준다.

## 더미데이터를 이용하여 포스트폼 만들기
* 강좌 소스는 참조하는 방향으로 하고 나중에 내 애플리케이션 만들때 참조하자.
* 가운데 포스트부분을 만들기
* 먼저 post 리듀서를 만들어본다.
  - reducers/post.js
* 그 외 연관된 컴포넌트를 분리하여 코딩한다.
  - reducers/post.js
  - pages/index.js // post관련 컴포넌트를 연결
  - components/PostForm.js
  - components/PostCardContent.js
  - components/PostCard.js
  - components/CommentForm.js
  - components/FollowButton.js
  - components/PostImages.js
  - components/ImagesZoom/index.js
  - components/ImagesZoom/styles.js
* 의미가 있는 단위로 컴포넌트를 분리한다.
* 인라인 스타일은 처음엔 그냥 코딩하고 나중에 문제가 생겼다 할때 styled로 빼거나 useMemo로 빼면 된다.
* 원래 컴포넌트 생성하여 코딩할때 시간이 오래걸림.
```javascript
// state데이터는 서버개발자와 최대한 맞추는게 좋음(협의)
export const initialState = {
  mainPosts: [{
    id: 1,
    User: {
      id: 1,
      nickname: '제로초',
    },
    content: '첫 번째 게시글',
    Images: [{
      src: 'https://bookthumb-phinf.pstatic.net/cover/137/995/13799585.jpg?udate=20180726',
    }, {
      src: 'https://gimg.gilbut.co.kr/book/BN001958/rn_view_BN001958.jpg',
    }, {
      src: 'https://gimg.gilbut.co.kr/book/BN001998/rn_view_BN001998.jpg',
    }],
    Comments: [{
      User: {
        nickname: 'nero',
      },
      content: '우와 개정판이 나왔군요~',
    }, {
      User: {
        nickname: 'hero',
      },
      content: '얼른 사고싶어요~',
    }]
  }],
  imagePaths: [],
  postAdded: false,
};
// 액션타입은 변수로 빼는게 좋음.
const ADD_POST = 'ADD_POST';

export const addPost = {
  type: ADD_POST,
};

const dummyPost = {
  id: 2,
  content: '더미데이터입니다.',
  User: {
    id: 1,
    nickname: '제로초',
  },
  Images: [],
  Comments: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST: {
      return {
        ...state,
        mainPosts: [dummyPost, ...state.mainPosts],
        postAdded: true,
      };
    }
    default: {
      return {
        ...state,
      };
    }
  }
};
```
* 이제 pages/index.js에 화면을 뿌리기 위해 코딩을 한다.
```javascript
import React from 'react';
import { useSelector } from 'react-redux';

import PostForm from '../components/PostForm';
import PostCard from '../components/PostCard';
import AppLayout from '../components/AppLayout';

const Home = () => {
  const { isLoggedIn } = useSelector(state => state.user);
  const { mainPosts } = useSelector(state => state.post);

  return (
    <AppLayout>
      {isLoggedIn && <PostForm />}
      {mainPosts.map((c) => {
        return (
          <PostCard key={c.id} post={c} />
        );
      })}
    </AppLayout>
  );
};

export default Home;
```
* 내부에 분리된 컴포넌트 PostForm, PostCard가 있으므로 컴포넌트를 생성해서 코딩한다.
```javascript
// components/PostForm.js
import React, { useRef, useCallback, useState, useEffect } from 'react';
import { Form, Input, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import { addPost } from '../reducers/post';

const PostForm = () => {
  const { imagePaths, postAdded } = useSelector(state => state.post);
  const [text, setText] = useState('');
  const dispatch = useDispatch();
  const imageInput = useRef();

  const onClickImageUpload = useCallback(() => {
    imageInput.current.click();
  }, [imageInput.current]);

  useEffect(() => {
    if (postAdded) {
      setText('');
    }
  }, [postAdded]);

  const onChangeText = useCallback((e) => {
    setText(e.target.value);
  }, []);

  const onSubmit = useCallback(() => {
    dispatch(addPost);
  }, []);

  return (
    <Form style={{ margin: '10px 0 20px' }} encType="multipart/form-data" onFinish={onSubmit}>
      <Input.TextArea value={text} onChange={onChangeText} maxLength={140} placeholder="어떤 신기한 일이 있었나요?" />
      <div>
        <input type="file" multiple hidden ref={imageInput} />
        <Button onClick={onClickImageUpload}>이미지 업로드</Button>
        <Button type="primary" style={{ float: 'right' }} htmlType="submit">짹짹</Button>
      </div>
      <div>
        {imagePaths.map((v) => {
          return (
            <div key={v} style={{ display: 'inline-block' }}>
              <img src={'http://localhost:3000/' + v} style={{ width: '200px' }} alt={v} />
              <div>
                <Button>제거</Button>
              </div>
            </div>
          )
        })}
      </div>
    </Form>
  );
};

export default PostForm;
```
```javascript
// components/PostCard.js------------------------------------------
import React, { useState, useCallback } from 'react';
import { Card, Button, Avatar, Popover, List, Comment } from 'antd';
import PropTypes from 'prop-types';
import { RetweetOutlined, HeartTwoTone, HeartOutlined, MessageOutlined, EllipsisOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import Link from 'next/link';
import { useSelector } from 'react-redux';

import CommentForm from './CommentForm';
import PostCardContent from './PostCardContent';
import PostImages from './PostImages';
import FollowButton from './FollowButton';

const CardWrapper = styled.div`
  margin-bottom: 20px;
`;

const PostCard = ({ post }) => {
  const [commentFormOpened, setCommentFormOpened] = useState(false);
  const id = useSelector((state) => state.user.me && state.user.me.id);

  const [liked, setLiked] = useState(false);

  const onToggleLike = useCallback(() => {
    setLiked((prev) => !prev);
  }, []);

  const onToggleComment = useCallback(() => {
    setCommentFormOpened((prev) => !prev);
  }, []);

  return (
    <CardWrapper key={post.id}>
      <Card
        cover={post.Images[0] && <PostImages images={post.Images} />}
        actions={[
          <RetweetOutlined key="retweet" />,
          liked
            ? <HeartTwoTone twoToneColor="#eb2f96" key="heart" onClick={onToggleLike} />
            : <HeartOutlined key="heart" onClick={onToggleLike} />,
          <MessageOutlined key="message" onClick={onToggleComment} />,
          <Popover
            key="ellipsis"
            content={(
              <Button.Group>
                {id && post.User.id === id
                  ? (
                    <>
                      <Button>수정</Button>
                      <Button type="danger">삭제</Button>
                    </>
                  )
                  : <Button>신고</Button>}
              </Button.Group>
            )}
          >
            <EllipsisOutlined />
          </Popover>,
        ]}
        extra={<FollowButton post={post} />}
      >
        <Card.Meta
          avatar={<Avatar>{post.User.nickname[0]}</Avatar>}
          title={post.User.nickname}
          description={<PostCardContent postData={post.content} />}
        />
      </Card>
      {commentFormOpened && (
        <>
          <CommentForm post={post} />
          <List
            header={`${post.Comments.length} 댓글`}
            itemLayout="horizontal"
            dataSource={post.Comments}
            renderItem={(item) => (
              <li>
                <Comment
                  author={item.User.nickname}
                  avatar={(
                    <Link href={{ pathname: '/user', query: { id: item.User.id } }} as={`/user/${item.User.id}`}>
                      <a><Avatar>{item.User.nickname[0]}</Avatar></a>
                    </Link>
                  )}
                  content={item.content}
                />
              </li>
            )}
          />
        </>
      )}
    </CardWrapper>
  );
};

PostCard.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.number,
    User: PropTypes.object,
    content: PropTypes.string,
    createdAt: PropTypes.object,
    Comments: PropTypes.arrayOf(PropTypes.any),
    Images: PropTypes.arrayOf(PropTypes.any),
  }),
};

export default PostCard;
```
```javascript
// components/CommentForm.js------------------------------------------------
  
import { Button, Form, Input } from 'antd';
import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';

const CommentForm = ({ post }) => {
  const [commentText, setCommentText] = useState('');

  const onSubmitComment = useCallback(() => {
    console.log(commentText);
  }, [commentText]);

  const onChangeCommentText = useCallback((e) => {
    setCommentText(e.target.value);
  }, []);

  return (
    <Form onFinish={onSubmitComment}>
      <Form.Item style={{ position: 'relative', margin: 0 }}>
        <Input.TextArea rows={4} value={commentText} onChange={onChangeCommentText} />
        <Button style={{ position: 'absolute', right: 0, bottom: -40 }} type="primary" htmlType="submit">삐약</Button>
      </Form.Item>
    </Form>
  );
};

CommentForm.propTypes = {
  post: PropTypes.object.isRequired,
};

export default CommentForm;
```
```javascript
// components/PostCardContent.js--------------------------------------------------
import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';

const PostCardContent = ({ postData }) => (
  <div>
    {postData.split(/(#[^\s#]+)/g).map((v) => {
      if (v.match(/(#[^\s]+)/)) {
        return (
          <Link
            href={{ pathname: '/hashtag', query: { tag: v.slice(1) } }}
            as={`/hashtag/${v.slice(1)}`}
            key={v}
          >
            <a>{v}</a>
          </Link>
        );
      }
      return v;
    })}
  </div>
);

PostCardContent.propTypes = {
  postData: PropTypes.string.isRequired,
};

export default PostCardContent;
```
* 그 외 분리한 각 자식 컴포넌트들을 생성하여 코딩한다.
## 게시글(Post)구현 (위 소스에서 구현됨)
## 댓글구현(위 소스에서 구현됨)
## 이미지구현(위 소스에서 구현됨)
## 이미지 캐러셀 구현(위 소스에서 구현됨)
* 캐러셀 지원하는 컴포넌트 설치 npm i react-slick 사용
## 글로벌 스타일, 컴포넌트 폴더구조
* 글로벌적인 style은 따로 뺀다.(createGlobalStyle 사용)
  - 스타일을 모아놓는 폴더를 따로 만들어 글로벌로 사용할 styles.js파일을 만들어 그부분에 코딩한다.
  ```javascript
  // styled-components에 createGlobalStyle을 사용한다.
  import { createGlobalStyle } from 'styled-components';

  export const Global = createGlobalStyle`
    .slick-slide {
      display: inline-block;
    }
    .ant-card-cover {
      transform: none !important;
    }
  `
  ```
  - 기존의 style class를 이런식으로 덮어씌울 수 있다.
  - styled-components를 그냥 사용한것은 최종 class명이 유니크하게 변경되서 들어가지만.
  - createGlobalStyle를 사용한것은 그 class명이 그대로 바로 들어간다.
  - 브라우져 버그 : transform 안에 fixed는 제대로 구현이 되지 않아서 transform을 none해줘야함.
  - styled-components로 만들어진 소스들은 따로 styles.js파일로 빼서 관리한다.
    - 그리고 각 스타일들은 export해줘서 다른 컴포넌트에서 사용할 수 있게 한다.
## PostCardContent.js에서 해시태그 링크 구현
* 정규식을 사용하여 구현.

# Redux-saga 연동
## 우선 redux-thunk 이해
* 비동기 action을 처리할 수 있는 미들웨어
* npm i redux-thunk (나중에는 saga를 쓸꺼기때문에 이해만 하고 넘어가자)
* 미들웨어는 고차함수이다.
  - 아래는 내가 만든 미들웨어를 끼워넣은 모습.
```javascript
// 내가 만든 logger미들웨어
const loggerMiddleware = ({dispatch, getState}) => (next) => (action) => {
  console.log(action); // 간단하게 action실행했을때 로그 찍어주는 기능의 미들웨어
  return next(action);
};

const configureSotre = () => {
  const middlewares = [loggerMiddleware]; // 미들웨어를 여기에 장착한다.
  const enhancer = process.env.NODE_ENV === 'production' ?
                    compose(applyMiddleware(...middlewares)) // 배포용일때는 devtools와 연결하지 않음.
                    : composeWithDevTools(applyMiddleware(...middlewares)) // 개발일때는 devtools와 연결

  const store = createStore(reducer, enhancer);
  return store;
};
```
* thunk의 비동기 처리에는 request, success, failure 3가지가 셋트로 구성된다.
  - 함수안에서 비동기 호출시 dispatch를 나눠서 실행한다.
    - request dispatch, 성공dispatch, 실패dispatch
* thunk는 이렇게 비동기 action creator를 할 수 있고 dispatch를 나눠서 여러번 처리할 수 있다는 것. (이게 thunk의 기능 다이다. 나머지 기능은 모두 필요하면 구현해야함.)
```javascript
export const loginAction = (data) => {
  return (dispatch, getState) => {
    const state = getState();
    dispatch(loginRequestAction());
    axios.post('/api/login')
      .then((res) => {
        dispatch(loginSuccessAction(res.data));
      })
      .catch((err) => {
        dispatch(loginFailureAction(err));
      })
  };
};
```
* 기능이 많이 부족하므로 무조건 redux-saga를 쓴다.
## saga 설치, generator 함수 이해하기.
* npm i redux-saga
* next에서 saga를 사용하려면 npm i next-redux-saga 설치.
* configureStore.js에 saga관련 추가 설정 코딩을 한다.
  - 사가 추가부분 주석 참조.
```javascript
// redux-saga를 가져온다.
import createSagaMiddleware from 'redux-saga';

import reducer from '../reducers';
// 리듀서처럼 루트사가를 폴더를 생성하여 만든다.
import rootSaga from '../sagas';

const configureStore = () => {
  // saga미들웨어를 가져온다.
  const sagaMiddleware = createSagaMiddleware();
  // 미들웨어 배열에 넣어준다.
  const middlewares = [sagaMiddleware];

  const enhancer = process.env.NODE_ENV === 'production' ?
                    compose(applyMiddleware(...middlewares)) // 배포용일때는 devtools와 연결하지 않음.
                    : composeWithDevTools(applyMiddleware(...middlewares)) // 개발일때는 devtools와 연결

  const store = createStore(reducer, enhancer);
  // 스토어의 사가타스크에 루트사가를 연결한다.
  store.sagaTask = sagaMiddleware.run(rootSaga);

  return store;
};
```
* 또한 _app.js에 루트 컴포넌트인 NodeBird컴포넌트를 사라로 감싸준다.
  - next를 사용하기때문에 next랑 연결해주기 위하여 사용.
```javascript
import withReduxSaga from 'next-redux-saga';
// 사가를 고차함수로 감싸준다. 
export default wrapper.withRedux(withReduxSaga(NodeBird));
```
* sagas폴더를 생성하고 index.js파일 생성하여 사가를 만들어 본다.
  - generator함수를 사용, 이해하고 공부 필요.
  - 제너레이터는 중단점이 있는 함수이다. yield부분에서 멈춤.
```javascript
// 제너레이터 함수
const gen = function* () {
  console.log(1);
  yield 1;
  console.log(2);
  yield 2;
  console.log(3);
  yield 3;
};
const g = gen():
// 실행시키기
g.next();
```
* saga는 이 제너레이터 함수를 이용하여 이벤트리스너 처럼 활용하여 만든거임.

## saga 이펙트 알아보기
* all, fork, call, put, take 등등
* 제너레이터 함수의 멈추는 부분 yield부분에서 saga이펙트를 실행한다.
  - all : 배열을 인자로 받는 이펙트 --> 배열안에 것들을 한방에 실행하여 모두 등록.
  - fork : 인자인 제너레이터함수를 실행하는것. (비동기)
  - call : 인자인 제너레이터함수를 실행하는것. (동기)
  - take : 인자인 제너레이터함수의 action이 실행될때까지 기다리겠다는 의미.
  - put : dispatch라 생각하면 됨.
```javascript
import {take, put, call, fork, all} from 'redux-saga/effects';

// api호출하는 함수는 제너레이터로 만들지 않는다.
// 넘겨진 인자 받는부분 기억하기
function logInAPI(data, a, b) {
  //axios호출
}
function* logIn(action) {
  try {
    // call은 동기 이기때문에 result에 받을 수 있지만
    // 만약 fork로 사용했다면 result로 받기전에 아래쪽 put이 실행되버린다.
    // 인자들 받아서 처리하는 부분 기억하기
    const result = yield call(logInAPI, action.data, 'a', 'b');
    yield put({
      type: 'LOG_IN_SUCCESS',
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: 'LOG_IN_FAILURE',
      data: err.response.data,
    });
  }
}
function* watchLogIn() {
  yield take('LOG_IN_REQUEST', logIn);
}
function* watchLogOut() {
  yield take('LOG_OUT_REQUEST');
}
function* watchAddPost() {
  yield take('ADD_POST_REQUEST');
}
export default function* rootSaga() {
  // all로 3가지 함수를 등록하였다.
  yield all([
    fork(watchLogIn),
    fork(watchLogOut),
    fork(watchAddPost),
  ]);
}
```
## saga이펙트의 take, take시리즈 이펙트, throttle 알아보기
* take : 1회만 실행.
  - 한번 실행하면 다음부터는 실행되지 않는 이펙트
```javascript
// watchLogIn제너레이터 함수를 실행하면 한번만 실행되고 다음부터는 실행되지 않는다.
function* watchLogIn() {
  yield take('LOG_IN_REQUEST', logIn);
}
// 그래서 아래와 같이 코딩할 수 있따.
// 하지만 이와같이 while방식은 직관적이지 않고 좋은 코딩방식이 아니라 다른 이펙트를 사용한다.
function* watchLogIn() {
  while(true) {
    yield take('LOG_IN_REQUEST', logIn);
  }
}
```
* takeEvery : 실행한 횟수만큼 모두 실행해주는 이펙트
```javascript
// watchLogIn을 실행한 횟수만큼 모두 실행해준다.
// 하지만 takeEvery는 순간적으로 두 번 클릭했을경우에도 무조건 두 번 다 실행해 주므로 문제가 생길 수 있다.
function* watchLogIn() {
  yield takeEvery('LOG_IN_REQUEST', logIn);
}
```
* takeLatest : 순간적으로 여러번 실행했을때 맨 마지막 실행 요건만 실행하는 것.
  - 물론 여러번 실행했을때 결과가 서버로 부터 도착하지 않았을때의 경우만 해당된다.
  - 그것은 곧 request는 모든 실행에 대하여 막지 못하고 발생된다는 의미이고, reponse만 마지막것만 실행된다는 의미이다.
  - 치명적인 프론트 단점이므로 백앤드 서버쪽에서 똑같은 request가 왔을때 하나만 처리하게끔 처리를 해줘야만 한다.
* takeLeading : 반대로 순간적으로 여러번 실행했을때 맨 첫번째 것만 실행하는 것.
* throttle : 그런 단점을 좀 더 개선하기 위하여 사용하는 이펙트.
  - 타임제한을 줘서 그 시간동안은 실행되지 않게 처리하는 것.
```javascript
function* watchLogIn() {
  // 2초 동안은 순간적으로 실행되지 않게 처리.
  yield throttle('LOG_IN_REQUEST', logIn, 2000);
}
```
* 결론 : 보통은 takeLatest로적용을 하고 순간적인 동일 request는 서버에서 검증을 하는 방향으로 한다.
  - throttle은 특수한 경우에 적용하는 방향으로 한다.
* 지금까지 예제 소스는 서버가 없으므로 delay이펙트를 사용하여 더미데이터로 데이터를 제공하게 코딩한다.
* 이펙트중에 쓰로틀링, 디바운싱 이 기능이 비슷한데 zerocho블로그를 참조해서 파악 필요.
  - [쓰로틀링, 디바운싱 비교](https://www.zerocho.com/category/JavaScript/post/59a8e9cb15ac0000182794fa)