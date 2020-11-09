# (리뉴얼)React로 NodeBird SNS만들기 (Next사용)
## Next사용 버전 및 필요 라이브러리
* next 9 version [https://nextjs.org/blog/next-9](https://nextjs.org/blog/next-9)
  - 9버전에서 바뀐점 정리
* node 14 [https://nodejs.org/ko/](https://nodejs.org/ko/)
* ant design 4 [https://ant.design/](https://ant.design/)
  - 아이콘, Form부분이 살짝 바뀜.

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
* SSR 지원
* 코드스플리팅
* next에서 SSR 방식은, 처음 진입하여 호출시에는 ssr방식으로 가져오고 이후 부터는 spa방식으로 페이지를 가져옴.
