import React from 'react';
import { About, Contact, Profile, Share, Tutorial, Upgrade } from '..';

export default function Modal({ type, setType }) {
	return (
		<>
			{type && (
				<div
					className={`absolute inset-0 z-10 ${
						type === 'tutorial' ? 'bg-transparent-b-70 backdrop-blur-xl' : 'bg-transparent-b-50'
					}`}
					onClick={() => {
						type !== 'tutorial' && setType(null);
					}}
				>
					{type === 'tutorial' && <Tutorial setType={setType} />}
					{type === 'upgrade' && <Upgrade />}
					{type === 'contact' && <Contact />}
					{type === 'about' && <About />}
					{type === 'profile' && <Profile />}
					{type === 'share' && <Share />}
				</div>
			)}
		</>
	);
}
