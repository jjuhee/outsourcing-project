import { db } from '../firebase/firebase.config';
import {
  collection,
  deleteDoc,
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
  if ([...newDatingCourse.places].length > 1) {
    await setDoc(newDocRef, { ...newDatingCourse, courseUid: newDocRef.id });
    alert('코스가 등록되었습니다!');
  } else {
    alert('코스에 장소를 담아주세요!');
    return false;
  }
};

const deleteDatingCourse = async (uid) => {
  const delCheck = window.confirm('정말 삭제하시겠습니까?');
  if (delCheck) {
    await deleteDoc(doc(db, 'datingCourse', uid));
  } else {
    return false;
  }
};

export { getDatingCourses, addDatingCourse, deleteDatingCourse };
