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