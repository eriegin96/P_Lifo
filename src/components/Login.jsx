import React from 'react';
import {
	signInWithPopup,
	GoogleAuthProvider,
	FacebookAuthProvider,
	fetchSignInMethodsForEmail,
} from 'firebase/auth';

import { Button } from '.';
import { logoImg } from '../assets/images';
import { auth } from '../firebase/config';
import { addUser } from '../firebase/services';

export default function Login() {
	const googleProvider = new GoogleAuthProvider();

	const checkUserExist = (additionalUserInfo, user) => {
		if (additionalUserInfo?.isNewUser) {
			addUser(user.uid, {
				displayName: user.displayName,
				email: user.email,
				photoURL: user.photoURL,
				uid: user.uid,
				providerId: additionalUserInfo.providerId,
			});
			return;
		}
	};

	const handleLogin = () => {
		signInWithPopup(auth, googleProvider)
			.then((result) => {
				console.log(result);
				const { _tokenResponse, user } = result;
				checkUserExist(_tokenResponse, user);
			})
			.catch((error) => {
				const pendingCred = error.credential;
				const email = error.email;

				if (error.code === 'auth/account-exists-with-different-credential') {
					fetchSignInMethodsForEmail(auth, email).then((methods) => {
						const confirmation = window.confirm(
							'Your email is already connected with another provider. Do you want to link to that account?'
						);

						if (confirmation === true) {
							signInWithPopup(auth, methods).then((result) =>
								result.user.linkWithCredential(pendingCred)
							);
							return;
						}
					});
				}
			});
	};

	return (
		<div className='flex flex-col items-center'>
			<img src={logoImg} alt='logo' className='my-8 h-[130px]' />
			<h1 className='my-4 text-5xl font-bold'>Welcome!</h1>
			<h4 className='text-xl font-bold'>Log in to your account</h4>
			<Button
				className='mt-8 mb-4 py-1.5 px-4 bg-primary rounded-full text-black font-semibold text-lg'
				onClick={handleLogin}
			>
				Login with Google
			</Button>
		</div>
	);
}
