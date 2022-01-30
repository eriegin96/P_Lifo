import React, { useContext, useState } from 'react';

import { arrowLeftIcon } from '../../assets/icons';
import { Button } from '..';
import { AppContext } from '../../context/AppProvider';
import { BACKGROUND_LINKS, SETS } from '../../constants';

export default function Set() {
	const { background, setBackground } = useContext(AppContext);

	const [sceneMode, setSceneMode] = useState();

	return (
		<div className='min-h-[400px]'>
			{!sceneMode ? (
				<>
					<h4 className='font-bold text-xl mb-2'>Change Set</h4>

					<div className='h-[500px] text-center overflow-auto rounded-lg'>
						{SETS.map((item) => (
							<Button
								key={item.set}
								className='mt-2 cursor-pointer'
								onClick={() => setSceneMode(item.set)}
							>
								<img src={item.link} alt='set' className='animate-fadeIn1s' />
							</Button>
						))}
					</div>
				</>
			) : (
				<>
					<div className='flex justify-between items-center'>
						<Button onClick={() => setSceneMode(null)}>
							<img src={arrowLeftIcon} alt='back' className='w-[14px] h-[14px]' />
						</Button>

						<h4 className='font-bold text-xl'>Switch scene</h4>

						<div className='w-[14px] h-[14px]' />
					</div>

					<div className='max-h-[500px] flex flex-col justify-between w-full text-center overflow-auto rounded-lg'>
						{/* Background Video */}
						{SETS.find((item) => item.set === sceneMode).scenes.map((item) => (
							<Button
								key={item.scene}
								className='w-full mt-4 cursor-pointer'
								onClick={() =>
									setBackground({
										...background,
										set: sceneMode,
										scene: item.scene,
										linkTop: BACKGROUND_LINKS[sceneMode][item.scene][background.top],
										linkBot: BACKGROUND_LINKS[sceneMode][item.scene][background.bot],
									})
								}
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
