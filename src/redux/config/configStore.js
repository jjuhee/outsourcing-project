import { createStore, combineReducers } from "redux";
import { authReducer } from "../module/auth";
import postReducer from "redux/module/post";

// 1. rootReducer를 만들 고 reducer들을 합친다.

const rootReducer = combineReducers({
  auth: authReducer,
});

// 2. 이것을 이용해서 store 만든다.

const store = createStore(rootReducer);

// 3. export 해서 다른 파일에서 import 할 수 있도록 한다.
export default store;
