import React, { useContext, useState } from 'react';

import { arrowLeftIcon } from '../../assets/icons';
import { Button } from '..';
import { AppContext } from '../../context/AppProvider';
import { SETS } from '../../constants';
import { newBackground } from '../../utils';
import { updateUser } from '../../firebase/services';
import { AuthContext } from '../../context/AuthProvider';

export default function Set() {
	const { uid } = useContext(AuthContext);
	const { background } = useContext(AppContext);

	const [setMode, setSetMode] = useState();

	const handleChangeBg = (item) => {
		const condition = {
			set: setMode,
			scene: item.scene,
			day: background.set === setMode ? background.day : true,
			rainy: background.set === setMode ? background.rainy : false,
		};
		const newBg = newBackground(background, condition);

		updateUser(uid, { background: newBg });
	};

	return (
		<div className='min-h-[400px]'>
			{!setMode ? (
				<>
					<h4 className='font-bold text-xl mb-2'>Change Set</h4>

					<div className='h-[500px] text-center overflow-auto rounded-lg'>
						{SETS.map((item) => (
							<Button
								key={item.set}
								className='mt-2 cursor-pointer'
								onClick={() => setSetMode(item.set)}
							>
								<img src={item.link} alt='set' className='animate-fadeIn1s' />
							</Button>
						))}
					</div>
				</>
			) : (
				<>
					<div className='flex justify-between items-center'>
						<Button onClick={() => setSetMode(null)}>
							<img src={arrowLeftIcon} alt='back' className='w-[14px] h-[14px]' />
						</Button>

						<h4 className='font-bold text-xl'>Switch scene</h4>

						<div className='w-[14px] h-[14px]' />
					</div>

					<div className='max-h-[500px] flex flex-col justify-between w-full text-center overflow-auto rounded-lg'>
						{/* Background Video */}
						{SETS.find((item) => item.set === setMode).scenes.map((item) => (
							<Button
								key={item.scene}
								className='w-full mt-4 cursor-pointer'
								onClick={() => handleChangeBg(item)}
							>
								<img src={item.link} alt='scene' className='w-full rounded-xl animate-fadeIn1s' />
							</Button>
						))}
					</div>
				</>
			)}
		</div>
	);
}
