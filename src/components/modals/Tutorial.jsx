import React, { useContext, useEffect, useRef, useState } from 'react';
import Slick from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';

import { Button } from '..';
import { closeIcon } from '../../assets/icons';
import { logoImg } from '../../assets/images';
import { TUTORIAL_VIDEOS_LINKS } from '../../constants';
import { AppContext } from '../../context/AppProvider';

function CarouselText({
	first,
	last,
	title1,
	title2,
	des1,
	des2,
	button,
	handleNext,
	handlePrev,
	setType,
}) {
	return (
		<div className='mt-[50px] text-center'>
			<h2 className='text-primary text-3xl font-bold'>{title1}</h2>
			<h2 className='text-primary text-3xl font-bold'>{title2}</h2>
			<p className={`my-4 text-sm ${des2 ? 'text-left' : 'text-center'}`}>{des1}</p>
			<p className='mb-4 text-sm text-left whitespace-pre-wrap'>{des2}</p>

			{!first && (
				<>
					<Button
						className='min-w-[120px] bg-primary text-black py-1.5 px-4 rounded-full font-semibold'
						onClick={handlePrev}
					>
						Previous
					</Button>

					<div className='inline-block w-4 h-1'> </div>
				</>
			)}

			{!last && (
				<Button
					className='min-w-[120px] bg-primary text-black py-1.5 px-4 rounded-full font-semibold'
					onClick={handleNext}
				>
					{button}
				</Button>
			)}

			{last && (
				<Button
					className='min-w-[120px] bg-primary text-black py-1.5 px-4 rounded-full font-semibold'
					onClick={() => setType(null)}
				>
					Done
				</Button>
			)}
		</div>
	);
}

function Carousel({ setType }) {
	const slickRef = useRef();
	const [, setRerender] = useState(false);

	useEffect(() => {
		setRerender(true);
	}, []);

	const settings = {
		arrows: false,
		autoplay: false,
		infinite: false,
		dots: true,
		swipe: false,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1,
		appendDots: (dots) => (
			<ul style={{ top: '320px', bottom: 'unset', display: 'flex', justifyContent: 'center' }}>
				{dots}
			</ul>
		),
		customPaging: () => (
			<div className='w-full h-full py-1 opacity-50 hover:opacity-100 duration-200 ease-in'>
				<div className='h-1 bg-white rounded-2xl'></div>
			</div>
		),
	};

	return (
		<Slick {...settings} ref={slickRef}>
			<div>
				<img src={logoImg} alt='logo' className='mb-[100px]' />

				<CarouselText
					first
					title1='Lofi.co: Focus Music'
					title2='You Can Vibe With'
					des1='Welcome to lofi.co. Let us show you around!'
					button='Take tour'
					handleNext={slickRef?.current?.slickNext}
					handlePrev={slickRef?.current?.slickPrev}
				/>
			</div>

			{TUTORIAL_VIDEOS_LINKS.map((video) => (
				<div key={video.name}>
					<video
						src={video.link}
						muted
						autoPlay
						loop
						className='w-[300px] h-[300px] m-auto rounded-2xl object-cover'
					></video>

					<CarouselText
						last={video.name === 'tutorial-4'}
						title1={video.title1}
						title2={video.title2}
						des1={video.des1}
						des2={video.des2}
						button='Next'
						handleNext={slickRef?.current?.slickNext}
						handlePrev={slickRef?.current?.slickPrev}
						setType={setType}
					/>
				</div>
			))}
		</Slick>
	);
}

export default function Tutorial() {
	const { setModalType } = useContext(AppContext);

	return (
		<div className='w-full h-full animate-fadeIn'>
			<Button className='absolute top-8 right-8' onClick={() => setModalType(null)}>
				<img src={closeIcon} alt='close' />
			</Button>

			<div className='h-full flex flex-col items-center'>
				<div className='h-full max-w-[500px] overflow-x-hidden pt-4'>
					<Carousel setType={setModalType} />
				</div>
			</div>
		</div>
	);
}
