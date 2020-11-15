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
