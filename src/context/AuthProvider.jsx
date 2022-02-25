import React, { createContext, useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '../firebase/config';
import { getUserData } from '../firebase/services';
import { SplashScreen } from '../components';
import { doc, onSnapshot } from 'firebase/firestore';

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
	const [user, setUser] = useState({});
	const [isAuthLoading, setIsAuthLoading] = useState(true);

	useEffect(() => {
		const unsubscribed = onAuthStateChanged(auth, (user) => {
			if (user) {
				let userRef = doc(db, 'users', user.uid);

				onSnapshot(userRef, (snapshot) => {
					console.log(snapshot.data());
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
		<AuthContext.Provider value={{ user, setIsAuthLoading }}>
			{isAuthLoading ? <SplashScreen /> : children}
		</AuthContext.Provider>
	);
}
