import React, { createContext, useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, onSnapshot } from 'firebase/firestore';

import { SplashScreen } from '../components';
import { auth, db } from '../firebase/config';

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
	const [user, setUser] = useState({});
	const [isAuthLoading, setIsAuthLoading] = useState(true);
	const uid = user?.uid;
	const email = user?.email;

	useEffect(() => {
		const unsubscribed = onAuthStateChanged(auth, (user) => {
			if (user) {
				let userRef = doc(db, 'users', user.uid);

				onSnapshot(userRef, (snapshot) => {
					setUser(snapshot.data());
					setIsAuthLoading(false);
				});
			} else {
				setUser({ displayName: '', photoURL: '', uid: '' });
				setIsAuthLoading(false);
			}
		});

		return () => {
			unsubscribed();
		};
	}, []);

	return (
		<AuthContext.Provider value={{ user, uid, email, setIsAuthLoading }}>
			{isAuthLoading ? <SplashScreen /> : children}
		</AuthContext.Provider>
	);
}
