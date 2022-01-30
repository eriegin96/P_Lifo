import React from 'react';
import { Button } from '..';

export default function Template() {
	return (
		<div>
			<h4 className='font-bold mb-4 text-xl'>Saved templates</h4>

			<div className='text-center'>
				<p className='italic opacity-50'>Templates are a premium feature</p>
				<Button className='w-full mt-8 my-4 py-1.5 px-4 bg-primary text-center text-black font-semibold text-lg rounded-full'>
					Go Premium
				</Button>
			</div>
		</div>
	);
}
