import React from 'react';
import { Button } from '..';

import { startSessionIcon, tomatoIcon, notesIcon, historyIcon } from '../../assets/icons';

const focustList = [
	{ label: 'Start Session', icon: startSessionIcon },
	{ label: 'Timer and Tasks', icon: tomatoIcon },
	{ label: 'Notes', icon: notesIcon },
	{ label: 'History', icon: historyIcon },
];

export default function Focus() {
	return (
		<div>
			<h4 className='font-bold mb-4 text-xl'>Focus Mode</h4>

			<div>
				{focustList.map((item) => (
					<Button
						key={item.label}
						className='w-full flex items-center mt-3 py-2 px-4 bg-bg-200 rounded-xl cursor-pointer'
					>
						<img src={item.icon} alt='icon' className='w-7 h-7' />
						<h6 className='mx-4 font-medium'>{item.label}</h6>
					</Button>
				))}
			</div>
		</div>
	);
}
