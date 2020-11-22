import {HYDRATE} from 'next-redux-wrapper';
import { combineReducers } from 'redux';

import user from './user';
import post from './post';

// reducer-----------------------------------
const rootReducer = combineReducers({
  // ssr을 위한 HYDRATE를 root에 추가.
  index: (state = {}, action) => {
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