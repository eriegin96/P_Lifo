import React, { useContext } from 'react';

import { Button } from '..';
import { closeIcon } from '../../assets/icons';
import { AppContext } from '../../context/AppProvider';

export default function Contact() {
	const { setModalType } = useContext(AppContext);

	const submitForm = (e) => {
		e.preventDefault();
		console.log('form submitted');
	};

	return (
		<div className='relative w-[420px] py-4 px-8 flex flex-col justify-center items-center rounded-2xl bg-black'>
			<Button className='absolute top-4 right-4' onClick={() => setModalType(null)}>
				<img src={closeIcon} alt='close' />
			</Button>

			<h4 className='my-4 text-xl font-bold'>Contact Us</h4>
			<form className='w-full flex flex-col items-start text-[#5b5a67]'>
				<label htmlFor='contact-name' className='my-2'>
					Your name
				</label>
				<input
					type='text'
					id='contact-name'
					className='my-2 py-2 px-4 w-full bg-bg-200 rounded-lg'
					required
				/>

				<label htmlFor='contact-email' className='my-2'>
					Your email
				</label>
				<input
					type='text'
					id='contact-email'
					className='my-2 py-2 px-4 w-full bg-bg-200 rounded-lg'
					required
				/>

				<label htmlFor='contact-subject' className='my-2'>
					Subject
				</label>
				<textarea
					id='contact-subject'
					className='h-[120px] mb-6 py-2 px-4 w-full bg-bg-200 rounded-lg resize-none'
					required
				/>

				<Button
					className='min-w-full py-1.5 px-4 rounded-2xl bg-primary text-black font-semibold'
					onClick={submitForm}
				>
					Send
				</Button>
			</form>
		</div>
	);
}
