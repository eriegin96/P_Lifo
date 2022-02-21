import { db } from './config';
import {
	collection,
	doc,
	addDoc,
	getDoc,
	setDoc,
	updateDoc,
	serverTimestamp,
	deleteDoc,
} from 'firebase/firestore';
import { ALARM_LINKS, BACKGROUND_LINKS_LIST } from '../constants';

export const getUserData = async (uid) => {
	const userRef = doc(db, 'users', uid);

	// async function asyncGetDoc() {
	const userSnap = await getDoc(userRef);

	if (userSnap.exists()) {
		return userSnap.data();
	} else {
		return {};
	}
	// }

	// return asyncGetDoc();
};

export const addUser = async (uid, data) => {
	const userRef = doc(db, 'users', uid);

	await setDoc(userRef, {
		...data,
		alarm: {
			isOn: true,
			link: ALARM_LINKS[0].link,
		},
		background: {
			mood: 'chill',
			set: 'chill',
			scene: 'scene1',
			show1: true,
			day: true,
			rainy: false,
			link1: BACKGROUND_LINKS_LIST.find(
				(item) =>
					item.set === 'chill' &&
					item.scene === 'scene1' &&
					item.day === true &&
					item.rainy === false
			).link,
			link2: '',
		},
		currentSession: {
			id: '',
			name: '',
			time: 0,
			pomodoroTime: 0,
			breakTime: 0,
			date: '',
			pomodorosCount: 0,
			breaksCount: 0,
			taskList: [],
		},
		createdAt: serverTimestamp(),
		modifiedAt: serverTimestamp(),
	});
};

export const updateUser = async (uid, data) => {
	const userRef = doc(db, 'users', uid);

	await updateDoc(userRef, {
		...data,
		modifiedAt: serverTimestamp(),
	});
};

export const updateSession = async (uid, sessionId, data) => {
	const sessionRef = doc(db, 'users', uid, 'sessions', sessionId);

	console.log({ ...sessionRef });
};

export const addSession = async (uid, data) => {
	const sessionRef = collection(db, 'users', uid, 'sessions');

	await setDoc(sessionRef, {
		...data,
		// name: 'study 1',
		// time: '3,492',
		// date: '05/02/2022',
		// completedTasks: ['123', '456', 'abc', '000'],
		// uncompletedTasks: ['123', '456', 'abc', '000'],
		createdAt: serverTimestamp(),
		modifiedAt: serverTimestamp(),
	});
};

export const addNote = async (uid, data) => {
	const noteRef = collection(db, 'users', uid, 'notes');

	await addDoc(noteRef, {
		...data,
		// id: '1',
		// title: 'note 1',
		// content: 'note 1 content',
		// time: '05/02/2022',
		createdAt: serverTimestamp(),
		modifiedAt: serverTimestamp(),
	});
};

export const updateNote = async (uid, noteId, data) => {
	const noteRef = doc(db, 'users', uid, 'notes', noteId);

	await updateDoc(noteRef, { ...data, modifiedAt: serverTimestamp() });
};

export const removeNote = async (uid, noteId) => {
	const noteRef = doc(db, 'users', uid, 'notes', noteId);

	await deleteDoc(noteRef);
};
