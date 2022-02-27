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

	const userSnap = await getDoc(userRef);

	if (userSnap.exists()) {
		return userSnap.data();
	} else {
		return {};
	}
};

export const addUser = async (uid, data) => {
	const userRef = doc(db, 'users', uid);

	await setDoc(userRef, {
		...data,
		alarm: {
			isOn: true,
			link: ALARM_LINKS[0].link,
		},
		timer: {
			pomodoroTime: 25,
			breakTime: 5,
		},
		background: {
			mood: 'chill',
			set: 'chill',
			scene: 'chill1',
			show1: true,
			day: true,
			rainy: false,
			link1: BACKGROUND_LINKS_LIST.find(
				(item) =>
					item.set === 'chill' &&
					item.scene === 'chill1' &&
					item.day === true &&
					item.rainy === false
			).link,
			link2: '',
		},
		currentSession: {
			name: '',
			time: 0,
			pomodoroTime: 0,
			breakTime: 0,
			date: '',
			pomodoroCount: 0,
			breakCount: 0,
			taskList: [],
		},
		templates: [],
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

export const addSession = async (uid, data) => {
	const sessionRef = collection(db, 'users', uid, 'sessions');

	await addDoc(sessionRef, {
		...data,
		createdAt: serverTimestamp(),
		modifiedAt: serverTimestamp(),
	});
};

export const updateCurrentSession = async (uid) => {
	const userRef = doc(db, 'users', uid);

	await updateDoc(userRef, {
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
		modifiedAt: serverTimestamp(),
	});
};

export const addNote = async (uid, data) => {
	const noteRef = collection(db, 'users', uid, 'notes');

	await addDoc(noteRef, {
		...data,
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
