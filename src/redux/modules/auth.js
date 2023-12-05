// 1. 작업타입
export const SIGN_IN = "SIGN_IN";
export const UPDATE_USER = "UPDATE_USER";
// 2.작업 생성자 (액션 크리에이터)

export const signIn = (user) => {
  return { type: SIGN_IN, payload: user };
};
export const updateUser = (user) => {
  return { type: UPDATE_USER, payload: user };
};
// 스테이트 구조

export const initialState = {
  user: { photoURL: "", email: "" },
};

// 3. 리듀서 제작

export function authReducer(state = initialState, action) {
  switch (action.type) {
    case SIGN_IN:
      const user = action.payload;
      const newState = { ...state, user };
      return newState;
    case UPDATE_USER:
      return {
        ...state,
        user: {
          ...state.user,
          ...action.payload,
        },
      };
    default:
      return state;
  }
}
