import React, { useContext, useRef, useState } from 'react';

import { Button } from '..';
import { AppContext } from '../../context/AppProvider';
import { closeIcon, twitterIcon } from '../../assets/icons';

export default function Share() {
	const { setModalType } = useContext(AppContext);
	const [copied, setCopied] = useState(false);
	const linkRef = useRef();

	const copyToClipboard = () => {
		navigator.clipboard.writeText(linkRef.current.value);

		setCopied(true);
	};

	return (
		<div className='animate-fadeIn'>
			<div className='relative p-6 w-[440px] flex flex-col justify-center items-center rounded-2xl bg-black'>
				<Button
					className='absolute top-4 right-4'
					onClick={() => {
						setModalType(null);
						setCopied(false);
					}}
				>
					<img src={closeIcon} alt='close' />
				</Button>

				<h3 className='text-3xl font-bold'>Share</h3>
				<p className='opacity-50 my-2 text-sm text-center'>
					Copy the link to share your combination of music, scenery and sounds with your friends!
				</p>

				<div
					ref={linkRef}
					className={`w-full bg-bg-200 mt-4 mb-4 py-1 px-4 text-xs rounded-lg cursor-pointer ${
						copied ? 'border border-green-400' : ''
					}`}
					onClick={copyToClipboard}
				>
					https://lofi.co?s=Y2hpbGxfdmliZXMmMCYwMDA1MCY=
				</div>

				{copied && <div className='text-green-500 mb-6'>Copied</div>}

				<Button className='min-w-[120px] flex justify-center items-center p-2 bg-primary font-semibold text-sm text-black rounded-full'>
					<img src={twitterIcon} alt='twitter' className='invert brightness-1000 mr-2' />
					Share
				</Button>
			</div>
		</div>
	);
}
