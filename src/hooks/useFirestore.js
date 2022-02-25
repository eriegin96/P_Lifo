import { useEffect, useState } from 'react';
import { db } from '../firebase/config';
import { query, where, doc, collection, onSnapshot, orderBy } from 'firebase/firestore';

// export const unsub = onSnapshot(doc(db, 'users', 'AlMa4aSBPgmaSe0uagnac0o38Bf7'), (doc) => {
// 	console.log('Current data: ', doc.data());
// });

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

// export const useUser = (uid) => {
// 	const [userDoc, setUserDoc] = useState({});

// 	useEffect(() => {
// 		let userRef = doc(db, 'users', uid);

// 		const userUnsubscribe = onSnapshot(userRef, (snapshot) => {
// 			setUserDoc(snapshot.data());
// 		});

// 		return () => {
// 			userUnsubscribe();
// 		};
// 	}, [uid]);

// 	return userDoc;
// };

export const useSessions = (uid) => {
	const [sessionDocs, setSessionDocs] = useState([]);

	useEffect(() => {
		let sessionsRef = collection(db, 'users', uid, 'sessions');

		const sessionsUnsubscribe = onSnapshot(sessionsRef, (snapshot) => {
			const data = snapshot.docs.map((doc) => ({
				...doc.data(),
				id: doc.id,
			}));

			setSessionDocs(data);
		});

		return () => {
			sessionsUnsubscribe();
		};
	}, [uid]);

	return sessionDocs;
};

export const useNotes = (uid) => {
	const [noteDocs, setNoteDocs] = useState([]);

	useEffect(() => {
		let notesRef = collection(db, 'users', uid, 'notes');

		const notesUnsubscribe = onSnapshot(notesRef, (snapshot) => {
			const data = snapshot.docs.map((doc) => ({
				...doc.data(),
				id: doc.id,
			}));

			setNoteDocs(data);
		});

		return () => {
			notesUnsubscribe();
		};
	}, [uid]);

	return noteDocs;
};

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
