import React, { useContext, useState } from 'react';

import { Button } from '..';
import { AppContext } from '../../context/AppProvider';
import { closeIcon } from '../../assets/icons';

const SAMPLE = [
	{
		id: { videoId: 'dKPVhZgiKa8' },
		snippet: {
			title:
				'Dogs - HVOB (Original Version) || Nhạc Nền Hot Tik Tok Trung Quốc || TikTok || 抖音 DouYin | Loi Music',
			thumbnails: {
				default: {
					url: 'https://i.ytimg.com/vi/1B2JMfAD5Tw/default.jpg',
					width: 120,
					height: 90,
				},
			},
		},
	},
	{
		id: { videoId: 'k_flsuDhkXU' },
		snippet: {
			title: '🤣 Funniest 🐶 Dogs and 😻 Cats - Awesome Funny Pet Animals Life Videos 😇',
			thumbnails: {
				default: {
					url: 'https://i.ytimg.com/vi/3dcli9i_pvA/default.jpg',
					width: 120,
					height: 90,
				},
			},
		},
	},
	{
		id: { videoId: 'Hqg2NNWirnU' },
		snippet: {
			title: '🤣Funny Dog Videos 2020🤣 🐶 It&#39;s time to LAUGH with Dog&#39;s life',
			thumbnails: {
				default: {
					url: 'https://i.ytimg.com/vi/1HygThMLzGs/default.jpg',
					width: 120,
					height: 90,
				},
			},
		},
	},
	{
		snippet: {
			title:
				'Dogs - HVOB (Original Version) || Nhạc Nền Hot Tik Tok Trung Quốc || TikTok || 抖音 DouYin | Loi Music',
			thumbnails: {
				default: {
					url: 'https://i.ytimg.com/vi/1B2JMfAD5Tw/default.jpg',
					width: 120,
					height: 90,
				},
			},
		},
	},
	{
		snippet: {
			title: '🤣 Funniest 🐶 Dogs and 😻 Cats - Awesome Funny Pet Animals Life Videos 😇',
			thumbnails: {
				default: {
					url: 'https://i.ytimg.com/vi/3dcli9i_pvA/default.jpg',
					width: 120,
					height: 90,
				},
			},
		},
	},
	{
		snippet: {
			title: '🤣Funny Dog Videos 2020🤣 🐶 It&#39;s time to LAUGH with Dog&#39;s life',
			thumbnails: {
				default: {
					url: 'https://i.ytimg.com/vi/1HygThMLzGs/default.jpg',
					width: 120,
					height: 90,
				},
			},
		},
	},
];

export default function Custom() {
	const { draggableModalType, setDraggableModalType, setVideoId } = useContext(AppContext);
	const [input, setInput] = useState('');
	const [resultList, setResultList] = useState([]);

	function searchByKeyword() {
		if (input) {
			fetch(
				`https://youtube.googleapis.com/youtube/v3/search?part=id&part=snippet&type=video&q=${input}&maxResults=10&key=${
					import.meta.env.VITE_FIREBASE_API
				}`
			)
				.then((response) => response.json())
				.then((data) => {
					setResultList(data.items);
				});
		}
	}

	return (
		<div className='absolute top-24 left-1/2 transform -translate-x-1/2 animate-fadeIn'>
			<div className='p-6 w-[400px] flex flex-col justify-center items-center rounded-2xl bg-black'>
				<Button
					className='absolute top-4 right-4'
					onClick={() => {
						setDraggableModalType({ ...draggableModalType, custom: false });
					}}
				>
					<img src={closeIcon} alt='close' />
				</Button>

				<h3 className='handle w-full text-3xl font-bold text-center cursor-move'>Custom</h3>

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

				<div className='max-h-[300px] mt-2 overflow-y-auto'>
					<ul className='flex flex-col gap-2'>
						{resultList?.map((result) => (
							<li
								key={result.id.videoId}
								className='p-2 flex items-center bg-bg-200 rounded-xl cursor-pointer duration-200 ease-out hover:opacity-70'
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
			</div>
		</div>
	);
}
