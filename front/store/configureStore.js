import { createWrapper } from 'next-redux-wrapper';
import {createStore} from 'redux';

import reducer from '../reducers';

const configureSotre = () => {
  const store = createStore(reducer);
  return store;
};
// next-redux-wrapper의 createWrapper를 사용하여 redux의 createStore를 감싸준다.
// param : 첫번째는 redux의 store, 두번째는 옵션객체.
const wrapper = createWrapper(configureSotre, {
  // 개발시에는 debug를 true로 켜두는게 좋음.
  debug: process.env.NODE_ENV === 'development,'
});

export default wrapper;