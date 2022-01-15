import React from 'react';
import { About, Contact, Profile, Share, Tutorial, Upgrade } from '..';

export default function Modal({ type }) {
	return (
		<>
			{type === 'tutorial' && <Tutorial />}
			{type === 'upgrade' && <Upgrade />}
			{type === 'contact' && <Contact />}
			{type === 'about' && <About />}
			{type === 'profile' && <Profile />}
			{type === 'share' && <Share />}
		</>
	);
}
