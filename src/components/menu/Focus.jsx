import React, { useContext } from 'react';
import { Button } from '..';

import { FOCUS_ICONS } from '../../constants';
import { AppContext } from '../../context/AppProvider';

export default function Focus({ setMenuTab, initialTab }) {
	const { setDraggableModalType, draggableModalType } = useContext(AppContext);

	return (
		<div>
			<h4 className='font-bold mb-4 text-xl'>Focus Mode</h4>

			<div>
				{FOCUS_ICONS.map((item) => (
					<Button
						key={item.label}
						className='w-full flex items-center mt-3 py-2 px-4 bg-bg-200 rounded-xl cursor-pointer'
						onClick={() => {
							setDraggableModalType({ ...draggableModalType, [item.modalType]: true });
							setMenuTab(initialTab);
						}}
					>
						<img src={item.icon} alt='icon' className='w-7 h-7' />
						<h6 className='mx-4 font-medium'>{item.label}</h6>
					</Button>
				))}
			</div>
		</div>
	);
}
