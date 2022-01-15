import React, { createContext, useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase/config';
import { getUserData } from '../firebase/services';
import { SplashScreen } from '../components';

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
	const [user, setUser] = useState({});
	const [isAuthLoading, setIsAuthLoading] = useState(true);

	useEffect(() => {
		const unsubscribed = onAuthStateChanged(auth, (user) => {
			if (user) {
				getUserData(user.uid).then((data) => {
					setUser(data);
					setIsAuthLoading(false);
				});
			} else {
				setUser({ displayName: '', photos: [], uid: '' });
				setIsAuthLoading(false);
			}
		});

		return () => {
			unsubscribed();
		};
	}, []);

	return (
		<AuthContext.Provider value={{ user }}>
			{isAuthLoading ? <SplashScreen /> : children}
		</AuthContext.Provider>
	);
}
