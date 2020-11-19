const initialState = {
  user: {
    isLoggedIn: false,
    user: null,
    signUpData: {},
    loginData: {},
  },
  post: {
    mainPosts: [],
  },
};

// action---------------------------------
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

// reducer-----------------------------------
const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOG_IN':
      return {
        ...state,
        user: {
          ...state.user,
          isLoggedIn: true,
          user: action.data,
        }
      };
    case 'LOG_OUT':
      return {
        ...state,
        user: {
          ...state.user,
          isLoggedIn: false,
          user: null,
        }
      };
    default:
      return state;
  }
};

export default rootReducer;