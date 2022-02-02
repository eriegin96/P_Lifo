import { db } from './config';
import {
	collection,
	doc,
	addDoc,
	getDoc,
	setDoc,
	updateDoc,
	serverTimestamp,
} from 'firebase/firestore';

export const getUserData = (uid) => {
	const userRef = doc(db, 'users', uid);

	async function asyncGetDoc() {
		const userSnap = await getDoc(userRef);

		if (userSnap.exists()) {
			return userSnap.data();
		} else {
			return {};
		}
	}

	return asyncGetDoc();
};

export const addUser = (uid, data) => {
	const userRef = doc(db, 'users', uid);

	async function asyncSetDoc() {
		await setDoc(userRef, {
			...data,
			createdAt: serverTimestamp(),
			modifiedAt: serverTimestamp(),
		});
	}

	asyncSetDoc();
};

// export const updateUser = (uid, data) => {
// 	const userRef = doc(db, 'users', uid);

// 	async function asyncUpdateDoc() {
// 		await updateDoc(userRef, {
// 			...data,
// 			modifiedAt: serverTimestamp(),
// 		});
// 	}

// 	asyncUpdateDoc();
// };

// export const matchPartner = (uid, partnerId) => {
// 	const userRef = doc(db, 'users', uid);
// 	const matchedOfPartnerRef = doc(db, 'users', partnerId, 'matched', uid);
// 	const partnerRef = doc(db, 'users', partnerId);
// 	const matchedOfUserRef = doc(db, 'users', uid, 'matched', partnerId);

// 	async function asyncAddMatched() {
// 		// add user to partner
// 		const userSnap = await getDoc(userRef);
// 		await setDoc(matchedOfPartnerRef, {
// 			uid: uid,
// 			photos: userSnap.data().photos,
// 			displayName: userSnap.data().displayName,
// 			createdAt: serverTimestamp(),
// 			modifiedAt: serverTimestamp(),
// 		});

// 		// add partner to user
// 		const partnerSnap = await getDoc(partnerRef);
// 		await setDoc(matchedOfUserRef, {
// 			uid: partnerId,
// 			photos: partnerSnap.data().photos,
// 			displayName: partnerSnap.data().displayName,
// 			createdAt: serverTimestamp(),
// 			modifiedAt: serverTimestamp(),
// 		});
// 	}

// 	asyncAddMatched();
// };

// export const seenPartner = (uid, partnerId) => {
// 	const partnerRef = doc(db, 'users', partnerId);
// 	const seenOfUserRef = doc(db, 'users', uid, 'seen', partnerId);

// 	async function asyncAddSeen() {
// 		// add partner to user
// 		const partnerSnap = await getDoc(partnerRef);
// 		await setDoc(seenOfUserRef, {
// 			uid: partnerId,
// 			photos: partnerSnap.data().photos,
// 			displayName: partnerSnap.data().displayName,
// 			createdAt: serverTimestamp(),
// 			modifiedAt: serverTimestamp(),
// 		});
// 	}

// 	asyncAddSeen();
// };

// export const addRoom = (data) => {
// 	const roomRef = collection(db, 'rooms');

// 	async function asyncAddRoom() {
// 		await addDoc(roomRef, {
// 			...data,
// 			messagesCount: 0,
// 			createdAt: serverTimestamp(),
// 			modifiedAt: serverTimestamp(),
// 		});
// 	}

// 	asyncAddRoom();
// };

// export const addMessage = (roomId, data) => {
// 	const messageRef = collection(db, 'rooms', roomId, 'messages');
// 	const roomRef = doc(db, 'rooms', roomId);

// 	async function asyncAddMessage() {
// 		const roomSnap = await getDoc(roomRef);
// 		await addDoc(messageRef, {
// 			...data,
// 			createdAt: serverTimestamp(),
// 			modifiedAt: serverTimestamp(),
// 		});

// 		await updateDoc(roomRef, {
// 			messagesCount: roomSnap.messagesCount + 1,
// 			lastMessage: data.text,
// 			modifiedAt: serverTimestamp(),
// 		});
// 	}

// 	asyncAddMessage();
// };
