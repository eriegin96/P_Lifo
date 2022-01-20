import React from 'react';

import {
	setChillImg,
	setDeskImg,
	setForestImg,
	setOceanImg,
	setCafeImg,
	setVanImg,
	setSummerImg,
} from '../../assets/images';
import { Button } from '..';

export default function Set() {
	const setList = [
		setChillImg,
		setDeskImg,
		setForestImg,
		setOceanImg,
		setCafeImg,
		setVanImg,
		setSummerImg,
	];

	return (
		<div>
			<h4 className='font-bold text-xl'>Saved templates</h4>

			<div className='h-[500px] text-center overflow-auto rounded-lg'>
				{setList.map((item, i) => (
					<Button key={i} className='mt-4 cursor-pointer'>
						<img src={item} alt='set' />
					</Button>
				))}
			</div>
		</div>
	);
}
