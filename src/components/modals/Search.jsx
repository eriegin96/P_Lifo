import React, { useContext, useState } from 'react';

import { Button } from '..';
import { AppContext } from '../../context/AppProvider';
import { closeIcon } from '../../assets/icons';

export default function Search() {
	const { draggableModalType, setDraggableModalType, setVideoId } = useContext(AppContext);
	const [input, setInput] = useState('');
	const [resultList, setResultList] = useState([]);
	const [loading, setLoading] = useState(false);

	function searchByKeyword() {
		setLoading(true);
		if (input) {
			fetch(
				`https://youtube.googleapis.com/youtube/v3/search?part=id&part=snippet&type=video&q=${input}&maxResults=10&key=${
					import.meta.env.VITE_FIREBASE_API
				}`
			)
				.then((response) => response.json())
				.then((data) => {
					setResultList(data.items);
					setLoading(false);
				});
		}
	}

	return (
		<div className='absolute top-24 left-1/2 transform -translate-x-1/2 animate-fadeIn'>
			<div className='p-6 w-[400px] flex flex-col justify-center items-center rounded-2xl bg-black'>
				<Button
					className='absolute top-4 right-4'
					onClick={() => {
						setDraggableModalType({ ...draggableModalType, search: false });
					}}
				>
					<img src={closeIcon} alt='close' />
				</Button>

				<h3 className='handle w-full text-3xl font-bold text-center cursor-move'>Youtube Video</h3>

				<div className='mt-4'>
					<label htmlFor='session' className='text-white opacity-50 text-sm'>
						Search for Youtube video
					</label>
					<input
						defaultValue={input}
						placeholder='Search...'
						onChange={(e) => setInput(e.target.value)}
						onKeyDown={(e) => {
							if (e.key === 'Enter') searchByKeyword();
						}}
						type='text'
						id='search'
						className='my-2 py-2 px-4 w-full bg-bg-200 rounded-xl'
					/>
				</div>

				<Button
					className='min-w-[120px] my-2 flex justify-center items-center p-2 bg-primary font-semibold text-md text-black rounded-full'
					onClick={searchByKeyword}
				>
					Search
				</Button>

				{resultList.length > 0 && (
					<div className='max-h-[300px] my-2 overflow-y-auto'>
						{loading && (
							<div className='mb-2 flex justify-center'>
								<svg
									className='animate-spin h-10 w-10 text-white'
									xmlns='http://www.w3.org/2000/svg'
									fill='none'
									viewBox='0 0 24 24'
								>
									<circle
										className='opacity-25'
										cx='12'
										cy='12'
										r='10'
										stroke='currentColor'
										strokeWidth='4'
									></circle>
									<path
										className='opacity-75'
										fill='currentColor'
										d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
									></path>
								</svg>
							</div>
						)}

						<ul className='flex flex-col gap-2'>
							{resultList?.map((result) => (
								<li
									key={result.id.videoId}
									className='p-2 flex justify-between items-center bg-bg-200 rounded-xl cursor-pointer duration-200 ease-out hover:opacity-70'
									onClick={() => {
										setDraggableModalType({ ...draggableModalType, videoPlayer: true });
										setVideoId(result.id.videoId);
									}}
								>
									<h4 className='text-sm mr-2'>{result.snippet.title}</h4>
									<img
										src={result.snippet.thumbnails.default.url}
										alt='img'
										width={120}
										height={90}
									/>
								</li>
							))}
						</ul>
					</div>
				)}
			</div>
		</div>
	);
}
