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
  
