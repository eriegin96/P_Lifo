import { useEffect, useState } from 'react';
import { db } from '../firebase/config';
import { query, collection, onSnapshot, orderBy } from 'firebase/firestore';

export const useHistory = (uid, collectionName) => {
	const [historyDocs, setHistoryDocs] = useState([]);

	useEffect(() => {
		let historyRef = collection(db, 'users', uid, collectionName);
		let q = query(historyRef, orderBy('createdAt', 'desc'));

		const unsubscribe = onSnapshot(q, (snapshot) => {
			const data = snapshot.docs.map((doc) => ({
				...doc.data(),
				id: doc.id,
			}));

			setHistoryDocs(data);
		});

		return () => {
			unsubscribe();
		};
	}, [uid]);

	return historyDocs;
};
