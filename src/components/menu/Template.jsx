import React from 'react';
import { Button } from '..';
import { TEMPLATES } from '../../constants';

export default function Template() {
	return (
		<div>
			<h4 className='font-bold mb-3 text-xl'>Saved templates</h4>

			{TEMPLATES.length !== 0 ? (
				<div className='min-h-[100px] flex flex-col items-center justify-evenly'>
					<p className='italic opacity-50'>You have no saved templates</p>
					<Button className='py-1.5 px-4 flex items-center border border-[#5293f3] rounded-full bg-[rgba(82,147,243,.1)]'>
						Save Template
					</Button>
				</div>
			) : (
				<div className='grid grid-cols-2'>
					{TEMPLATES.slice(0, 3).map((item) => (
						<div
							key={item.template}
							className='relative h-[170px] col-span-1 m-2 rounded-2xl cursor-pointer hover:opacity-50 duration-200 ease-out'
						>
							<img
								src={item.img}
								alt='image'
								className='absolute top-0 h-full object-cover rounded-2xl'
							/>
							<div className='absolute bottom-0 w-full h-full bg-gradient-half flex flex-col-reverse rounded-b-2xl'>
								<p className='mb-5 pl-2'>{item.template}</p>
							</div>
						</div>
					))}
				</div>
			)}
		</div>
	);
}
