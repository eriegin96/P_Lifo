import React, { useState } from 'react';

import {
	setChillImg,
	setDeskImg,
	setForestImg,
	setOceanImg,
	setCafeImg,
	setVanImg,
	setSummerImg,
	sceneChill1Img,
	sceneChill2Img,
	sceneDesk1Img,
	sceneDesk2Img,
	sceneDesk3Img,
} from '../../assets/images';
import { arrowLeftIcon } from '../../assets/icons';
import { Button } from '..';

export default function Set() {
	const setList = [
		{ scene: 'chill', img: setChillImg },
		{ scene: 'desk', img: setDeskImg },
		{ scene: 'forest', img: setForestImg },
		{ scene: 'ocean', img: setOceanImg },
		{ scene: 'cafe', img: setCafeImg },
		{ scene: 'van', img: setVanImg },
		{ scene: 'summer', img: setSummerImg },
	];
	// TODO: other scene thumbnails
	const sceneList = {
		chill: [sceneChill1Img, sceneChill2Img],
		desk: [sceneDesk1Img, sceneDesk2Img, sceneDesk3Img],
		forest: [],
		ocean: [],
		cafe: [],
		van: [],
		summer: [],
	};

	const [sceneMode, setSceneMode] = useState();

	return (
		<div>
			{!sceneMode ? (
				<>
					<h4 className='font-bold text-xl'>Change Set</h4>

					<div className='h-[500px] text-center overflow-auto rounded-lg'>
						{setList.map((item) => (
							<Button
								key={item.scene}
								className='mt-4 cursor-pointer'
								onClick={() => setSceneMode(item.scene)}
							>
								<img src={item.img} alt='set' />
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

					<div className='max-h-[500px] text-center overflow-auto rounded-lg'>
						{sceneList[sceneMode].map((item, i) => (
							<Button key={i} className='mt-2 cursor-pointer'>
								<img src={item} alt='scene' className='rounded-xl' />
							</Button>
						))}
					</div>
				</>
			)}
		</div>
	);
}
