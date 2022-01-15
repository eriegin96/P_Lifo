// import { useEffect, useState } from 'react';
// import { db } from '../firebase/config';
// import { query, where, collection, onSnapshot, orderBy } from 'firebase/firestore';

// export const useFirestore = (collectionName, condition) => {
// 	const [documents, setDocuments] = useState([]);

// 	useEffect(() => {
// 		let docRef = collection(db, collectionName);
// 		let q = query(docRef);

// 		if (condition) {
// 			if (!condition.compareValue || !condition.compareValue.length) {
// 				return;
// 			}

// 			q = query(docRef, where(condition.fieldName, condition.operator, condition.compareValue));
// 		}

// 		const unsubscribe = onSnapshot(q, (snapshot) => {
// 			const data = snapshot.docs.map((doc) => ({
// 				...doc.data(),
// 				id: doc.id,
// 			}));

// 			setDocuments(data);
// 		});

// 		return unsubscribe;
// 	}, [collectionName, condition]);

// 	return documents;
// };

// export const useFirestoreAllList = (uid) => {
// 	const [userDocs, setUserDocs] = useState([]);
// 	const [roomDocs, setRoomDocs] = useState([]);

// 	useEffect(() => {
// 		let userRef = collection(db, 'users');
// 		let roomRef = collection(db, 'rooms');
// 		let q = query(roomRef, where('members', 'array-contains', uid));

// 		const userUnsubscribe = onSnapshot(userRef, (snapshot) => {
// 			const data = snapshot.docs.map((doc) => ({
// 				...doc.data(),
// 			}));

// 			setUserDocs(data);
// 		});

// 		const roomUnsubscribe = onSnapshot(q, (snapshot) => {
// 			const data = snapshot.docs.map((doc) => {
// 				const newArr = doc.data().members.slice();
// 				const idx = newArr.indexOf(uid);
// 				newArr.splice(idx, 1);
// 				return newArr[0];
// 			});

// 			setRoomDocs(data);
// 		});

// 		return () => {
// 			userUnsubscribe();
// 			roomUnsubscribe();
// 		};
// 	}, [uid]);

// 	const chatList = userDocs.filter((user) => roomDocs.includes(user.uid));

// 	return chatList;
// };

// export const useFirestoreSuggestList = (uid) => {
// 	const [userDocs, setUserDocs] = useState([]);
// 	const [matchedDocs, setMatchedDocs] = useState([]);

// 	useEffect(() => {
// 		let userRef = collection(db, 'users');
// 		let partnerRef = collection(db, 'users', uid, 'seen');

// 		const userUnsubscribe = onSnapshot(userRef, (snapshot) => {
// 			const data = snapshot.docs.map((doc) => ({
// 				...doc.data(),
// 			}));

// 			setUserDocs(data);
// 		});

// 		const matchedUnsubscribe = onSnapshot(partnerRef, (snapshot) => {
// 			const data = snapshot.docs.map((doc) => ({
// 				...doc.data(),
// 			}));

// 			setMatchedDocs(data);
// 		});

// 		return () => {
// 			userUnsubscribe();
// 			matchedUnsubscribe();
// 		};
// 	}, [uid]);

// 	const uidList = matchedDocs.map((item) => item.uid);
// 	uidList.push(uid);
// 	const suggestList = userDocs.filter((user) => !uidList.includes(user.uid));

// 	return suggestList;
// };

// export const useFirestoreMessages = (roomId) => {
// 	const [documents, setDocuments] = useState([]);

// 	useEffect(() => {
// 		let docRef = collection(db, 'rooms', roomId, 'messages');
// 		let q = query(docRef, orderBy('createdAt'));

// 		const unsubscribe = onSnapshot(q, (snapshot) => {
// 			const data = snapshot.docs.map((doc) => ({
// 				...doc.data(),
// 			}));

// 			setDocuments(data);
// 		});

// 		return unsubscribe;
// 	}, [roomId]);

// 	return documents;
// };

// export const useFirestoreObject = (collectionName, condition) => {
// 	const [documents, setDocuments] = useState({});

// 	useEffect(() => {
// 		let docRef = collection(db, collectionName);
// 		let q = query(docRef);

// 		if (condition) {
// 			if (!condition.compareValue || !condition.compareValue.length) {
// 				return;
// 			}

// 			q = query(docRef, where(condition.fieldName, condition.operator, condition.compareValue));
// 		}

// 		const unsubscribe = onSnapshot(q, (snapshot) => {
// 			const data = snapshot.docs.map((doc) => ({
// 				...doc.data(),
// 			}));

// 			setDocuments({ ...data[0] });
// 		});

// 		return unsubscribe;
// 	}, [collectionName, condition]);

// 	return documents;
// };
