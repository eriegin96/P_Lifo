import React, { useContext, useState } from 'react';

import { Button } from '..';
import { closeIcon } from '../../assets/icons';
import { AppContext } from '../../context/AppProvider';

function FormInput({ type = 'text', label, inputId, value }) {
	return (
		<div className='relative'>
			<label htmlFor={inputId} className='absolute top-2 left-3 opacity-50 text-sm'>
				{label}
			</label>
			<input
				type={type}
				id={inputId}
				className='min-h-[60px] mb-1 px-3 pt-4 pb-0 w-full bg-bg-200 rounded-sm text-sm focus:outline outline-1 outline-transparent-w-30 transition-all duration-100 ease-linear'
				defaultValue={value}
			/>
		</div>
	);
}

export default function Profile() {
	const { setModalType } = useContext(AppContext);
	const [nav, setNav] = useState('profile');

	return (
		<div className='animate-fadeIn'>
			<div className='relative h-full min-w-[420px] py-4 px-6 flex flex-col justify-center items-center rounded-2xl bg-black'>
				<Button className='absolute top-4 right-4' onClick={() => setModalType(null)}>
					<img src={closeIcon} alt='close' />
				</Button>

				<div className='w-full flex min-h-[580px] max-h-screen'>
					{/* Left */}
					<div className='w-[180px] flex flex-col'>
						<img
							src='https://memberstack-logos.nyc3.cdn.digitaloceanspaces.com/square/1629549845267Lofi.jpg'
							alt='logo'
							className='w-12 h-12 invert mb-4'
						/>
						<div className='flex flex-col items-start'>
							<button
								className={`min-h-[40px] font-semibold opacity-70 hover:opacity-100 cursor-pointer ${
									nav === 'profile' ? 'text-primary' : ''
								}`}
								onClick={() => setNav('profile')}
							>
								Profile
							</button>
							<button
								className={`min-h-[40px] font-semibold opacity-70 hover:opacity-100 transition durartion-200 ease-in cursor-pointer ${
									nav === 'membership' ? 'text-primary' : ''
								}`}
								onClick={() => setNav('membership')}
							>
								Membership
							</button>
							<button className='min-h-[40px] mt-10 font-semibold opacity-70 hover:opacity-100 cursor-pointer'>
								Logout
							</button>
						</div>
					</div>

					{/* Right */}
					<div className='w-[360px] max-w-[470px] pt-12'>
						{nav === 'profile' && (
							<>
								<div className='mb-8'>
									<div className='flex justify-between items-center mb-2'>
										<div className='font-bold text-lg'>My information</div>

										<Button className='border py-1.5 px-4 font-semibold rounded-full text-sm'>
											Update
										</Button>
									</div>

									<FormInput label='Username' inputId='profile-username' value='eriegin96' />
								</div>

								<div className='mb-8'>
									<div className='flex justify-between items-center mb-2'>
										<div className='font-bold text-lg'>Email Address</div>

										<Button className='border py-1.5 px-4 font-semibold rounded-full text-sm'>
											Update Email
										</Button>
									</div>

									<FormInput
										type='email'
										label='Email Address'
										inputId='profile-email'
										value='eriegin96@gmail.com'
									/>
								</div>

								<div className='mb-5'>
									<div className='flex justify-between items-center mb-2'>
										<div className='font-bold text-lg'>Change Password</div>

										<Button className='border py-1.5 px-4 font-semibold rounded-full text-sm'>
											Change Password
										</Button>
									</div>

									<FormInput type='password' label='Current Password' inputId='profile-password' />
									<FormInput type='password' label='New Password' inputId='profile-new-password' />
									<FormInput type='password' label='Confirm' inputId='profile-confirm' />
								</div>
							</>
						)}

						{nav === 'membership' && (
							<div>
								<div className='mt-4 mb-2.5 font-bold'>Manage Membership</div>
								<div className='flex items-center justify-between bg-bg-200 py-5 px-4 rounded-md'>
									<div className='font-semibold text-sm'>
										<div className='mr-1'>
											Free Plan
											<span className='ml-2 text-xs border border-green-500 py-px px-1'>
												Active
											</span>
										</div>
										<div>FREE</div>
									</div>
									<div className='text-primary text-sm font-semibold cursor-pointer'>Cancel</div>
								</div>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}
