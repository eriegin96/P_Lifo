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

	// async function asyncSetDoc() {
	await setDoc(userRef, {
		...data,
		createdAt: serverTimestamp(),
		modifiedAt: serverTimestamp(),
	});
	// }

	// asyncSetDoc();
};

export const addTask = async (uid, data) => {
	const taskRef = collection(db, 'users', uid, 'tasks');

	// async function asyncAddTask() {
	await addDoc(taskRef, {
		...data,
		createdAt: serverTimestamp(),
		modifiedAt: serverTimestamp(),
	});
	// }

	// asyncAddTask();
};

export const updateTask = async (uid, taskId, data) => {
	const taskRef = doc(db, 'users', uid, 'tasks', taskId);

	await updateDoc(taskRef, { ...data, modifiedAt: serverTimestamp() });
};

export const removeTask = async (uid, taskId) => {
	const taskRef = doc(db, 'users', uid, 'tasks', taskId);

	await deleteDoc(taskRef);
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
