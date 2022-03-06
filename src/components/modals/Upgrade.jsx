import React, { useContext, useState } from 'react';
import Switch from 'react-switch/dist/react-switch.dev.js';
import Slick from 'react-slick';

import { Button } from '..';
import { closeIcon, checkIcon, xIcon } from '../../assets/icons';
import { mosaicImg } from '../../assets/images';
import { BASIC_PACKAGE, PREMIUM_PACKAGE } from '../../constants';
import { AppContext } from '../../context/AppProvider';

function Carousel() {
	const settings = {
		arrows: false,
		autoplay: true,
		infinite: true,
		dots: false,
		swipe: false,
		speed: 100000,
		autoplaySpeed: 1000,
		cssEase: 'linear',
		slidesToShow: 1,
		slidesToScroll: 1,
	};

	return (
		<Slick {...settings}>
			<img src={mosaicImg} alt='mosaic' />
			<img src={mosaicImg} alt='mosaic' />
		</Slick>
	);
}

export default function Upgrade() {
	const { setModalType } = useContext(AppContext);
	const [yearly, setYearly] = useState(true);

	return (
		<div className='h-screen m-auto'>
			<div className='relative h-full flex justify-center items-center rounded-2xl bg-transparent-b-70'>
				<Button className='absolute top-4 right-4' onClick={() => setModalType(null)}>
					<img src={closeIcon} alt='close' />
				</Button>

				{/* Left part */}
				<div className='bg-black h-full p-4 rounded-2xl font-bold text-sm'>
					<div className='h-full rounded-b-2xl overflow-y-auto'>
						<h3 className='text-3xl font-bold m-4'>Get more done with premium</h3>
						<div className='my-4 flex justify-center items-center'>
							<div className={`${yearly ? 'opacity-40' : ''}`}>Pay monthly</div>
							<Switch
								className='mx-4'
								onChange={() => setYearly(!yearly)}
								checked={yearly}
								uncheckedIcon={false}
								checkedIcon={false}
								handleDiameter={26}
								onHandleColor='#f3a952'
								offHandleColor='#f3a952'
								offColor='#24242f'
								onColor='#24242f'
								height={30}
								width={56}
								activeBoxShadow='0px 0px 0px 0px transparent'
							/>
							<div className={`${!yearly ? 'opacity-40' : ''}`}>Pay yearly</div>
							<div
								className={`text-black bg-primary rounded-xl font-semibold py-1 px-2 ml-4 ${
									yearly ? 'visible' : 'invisible'
								}`}
							>
								Save 25%
							</div>
						</div>

						<div className='max-w-[560px] grid grid-cols-2 gap-x-4 gap-y-2'>
							<div className='m-2 flex flex-col items-center col-span-1 bg-bg-200 rounded-2xl p-4'>
								<h3 className='text-3xl font-bold'>Basic</h3>
								<p className='my-3 text-primary text-3xl font-bold'>$0</p>
								<Button className='w-full my-3 py-1.5 px-4 text-primary bg-bg-400 border border-primary rounded-full font-semibold'>
									Current Plan
								</Button>
								<p className='min-h-[32px]'></p>
								{BASIC_PACKAGE.map((item, i) => (
									<div key={i} className='self-start flex items-center mt-1.5'>
										{item.checked ? (
											<img src={checkIcon} alt='check' className='ml-2.5 mr-5 w-5 h-4' />
										) : (
											<img
												src={xIcon}
												alt='not check'
												className='ml-2.5 mr-5 w-5 h-4 opacity-30 brightness-1000'
											/>
										)}
										<p className={`${!item.checked ? 'opacity-30' : ''}`}>{item.text}</p>
									</div>
								))}
							</div>
							<div className='m-2 flex flex-col items-center col-span-1 bg-bg-200 rounded-2xl border border-primary p-4'>
								<h3 className='text-3xl font-bold'>Premium</h3>
								<p className='my-3 text-primary text-3xl font-bold'>
									{yearly ? '$2,99' : '$3,99'} <span className='text-white text-sm'>/ mo</span>
								</p>
								<Button className='w-full my-3 py-1.5 px-4 text-black bg-primary rounded-full font-semibold'>
									Upgrade
								</Button>
								<p className='min-h-[32px] text-primary font-medium text-center'>
									*7-Day money back guarantee. Cancel anytime.
								</p>
								{PREMIUM_PACKAGE.map((item, i) => (
									<div key={i} className='self-start flex items-center mt-1.5'>
										{item.checked ? (
											<img src={checkIcon} alt='check' className='ml-2.5 mr-5 w-5 h-4' />
										) : (
											<img
												src={xIcon}
												alt='not check'
												className='ml-2.5 mr-5 w-5 h-4 opacity-30 brightness-1000'
											/>
										)}
										<p className={`${!item.checked ? 'opacity-30' : ''}`}>
											{item.accent && (
												<span className='text-primary font-bold mr-1'>{item.accent}</span>
											)}
											{item.text}
										</p>
									</div>
								))}
							</div>
							<div className='col-span-2 text-center text-xs'>
								*1% of every sale supports mental health organizations worldwide
							</div>
						</div>
					</div>
				</div>
				{/* Right part */}
				<div className='h-full w-[300px] flex flex-col font-bold overflow-x-hidden rounded-r-2xl'>
					<h3 className='m-8 text-3xl'>
						Join the <span className='text-primary'>lofi.co</span> family
					</h3>
					<div className='m-2 p-4 bg bg-bg-200 rounded-2xl text-center'>
						<h3 className='my-2 text-primary text-3xl'>+100.000</h3>
						<p className='my-2 font-semibold text-sm'>Users chilling every month</p>
					</div>
					<h3 className='my-4 mx-8 text-3xl'>Don't believe in numbers?</h3>
					<h6 className='my-4 mx-8 text-md'>Read what users write on socials about us.</h6>

					<div className='w-[2600px] h-[450px]'>
						<Carousel />
					</div>
				</div>
			</div>
		</div>
	);
}
