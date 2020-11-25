import { createWrapper } from 'next-redux-wrapper';
import {createStore, applyMiddleware, compose} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';

import reducer from '../reducers';
import rootSaga from '../sagas';

const loggerMiddleware = ({dispatch, getState}) => (next) => (action) => {
  console.log(action); // 간단하게 action실행했을때 로그 찍어주는 기능의 미들웨어
  return next(action);
};

const configureSotre = () => {
  const sagaMiddleware = createSagaMiddleware();
  const middlewares = [sagaMiddleware, loggerMiddleware];
  const enhancer = process.env.NODE_ENV === 'production' ?
                    compose(applyMiddleware(...middlewares)) // 배포용일때는 devtools와 연결하지 않음.
                    : composeWithDevTools(applyMiddleware(...middlewares)) // 개발일때는 devtools와 연결

  const store = createStore(reducer, enhancer);
  store.sagaTask = sagaMiddleware.run(rootSaga);
  return store;
};
// next-redux-wrapper의 createWrapper를 사용하여 redux의 createStore를 감싸준다.
// param : 첫번째는 redux의 store, 두번째는 옵션객체.
const wrapper = createWrapper(configureSotre, {
  // 개발시에는 debug를 true로 켜두는게 좋음.
  debug: process.env.NODE_ENV === 'development,'
});

export default wrapper;