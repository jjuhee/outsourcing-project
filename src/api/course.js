import { db } from '../firebase/firebase.config';
import {
  collection,
  doc,
  getDocs,
  orderBy,
  query,
  setDoc
} from 'firebase/firestore';

const getDatingCourses = async () => {
  const courseSnapshot = await getDocs(
    query(collection(db, 'datingCourse'), orderBy('createAt', 'desc'))
  );
  const initialCourses = [];
  courseSnapshot.forEach((place) => {
    initialCourses.push(place.data());
  });
  return initialCourses;
};

const addDatingCourse = async (newDatingCourse) => {
  const courseApplyRef = collection(db, 'datingCourse');
  const newDocRef = doc(courseApplyRef);
  await setDoc(newDocRef, { ...newDatingCourse, courseUid: newDocRef.id });
};

export { getDatingCourses, addDatingCourse };

//   try {
//     await setDoc(newDocRef, {
//       courseUid: newDocRef.id,
//       // 현재 임시로 uuid 랜덤 생성 -> 유저 가입 uid로 바꿔놓기
//       userUid: uuid4(),
//       courseTitle: courseTitle,
//       place: selectedPlaces,
//       createAt: TODAY
//     });
//     alert('코스가 등록되었습니다!');
//   } catch (error) {
//     console.log(error);
//   }
