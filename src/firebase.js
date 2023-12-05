// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "MY_API_KEY",
  authDomain: "my-nbc-project-d5117.firebaseapp.com",
  projectId: "my-nbc-project-d5117",
  storageBucket: "my-nbc-project-d5117.appspot.com",
  messagingSenderId: "243139549178",
  appId: "MY_APP_ID",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// React에서 정상적으로 동작하는 지 확인하기 위해서 임시로 export 시켜줍니다. app이 정상적으로 출력되는 것을 확인하고 나면, 지워줍니다.
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);

export default app;
