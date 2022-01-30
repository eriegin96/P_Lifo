import React, { useContext, useState } from 'react';

import { Button } from '..';
import { AppContext } from '../../context/AppProvider';
import { closeIcon } from '../../assets/icons';

// TODO: check CSS
export default function History() {
	const { draggableModalType, setDraggableModalType } = useContext(AppContext);
	const [newTab, setNewTab] = useState(true);

	return (
		<div className='absolute top-44 left-1/2 transform -translate-x-1/2 animate-fadeIn'>
			<div className='p-6 w-[440px] flex flex-col justify-center items-center rounded-2xl bg-black'>
				<Button
					className='absolute top-4 right-4'
					onClick={() => {
						setDraggableModalType({ ...draggableModalType, history: false });
					}}
				>
					<img src={closeIcon} alt='close' />
				</Button>

				<h3 className='handle w-full text-3xl font-bold text-center cursor-move'>History</h3>
				<div className='w-full my-6 p-2 flex items-center bg-bg-200 rounded-full font-semibold'>
					<div
						className={`w-1/2 py-1.5 px-6 rounded-full text-center cursor-pointer ${
							newTab ? 'bg-primary text-black' : 'text-gray-500'
						}`}
						onClick={() => setNewTab(!newTab)}
					>
						New session
					</div>
					<div
						className={`w-1/2 py-1.5 px-6 rounded-full text-center cursor-pointer ${
							!newTab ? 'bg-primary text-black' : 'text-gray-500'
						}`}
						onClick={() => setNewTab(!newTab)}
					>
						Saved templates
					</div>
				</div>

				<div className='mb-4'>
					<label htmlFor='session' className='text-gray-400 font-semibold'>
						Insert a session name
					</label>
					<input
						type='text'
						id='session'
						className='my-2 py-2 px-4 w-full bg-bg-200 rounded-xl'
						required
					/>
				</div>

				<Button className='min-w-[120px] flex justify-center items-center p-2 bg-primary font-semibold text-md text-black rounded-full'>
					Start
				</Button>
			</div>
		</div>
	);
}
