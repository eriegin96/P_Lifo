import React, { useState } from 'react';

import { moodIcon, templateIcon, setIcon, focusIcon, borderBrIcon } from '../../assets/icons';
import Mood from './Mood';
import Template from './Template';
import Focus from './Focus';
import Set from './Set';

function MenuItem({ iconSrc, className, small, top, bottom, handleClick, isActive, current }) {
	return (
		<div
			className={`relative w-[70px] h-[70px] cursor-pointer ${top ? 'rounded-t-full' : ''} ${
				bottom ? 'rounded-b-full' : ''
			} ${isActive ? 'bg-bg-menu' : ''}`}
			onClick={handleClick}
		>
			<div
				className={`absolute pointer-events-none ${
					small ? 'w-8 h-8' : 'w-[115px] h-[115px]'
				} ${className}`}
			>
				{current === 'mood' && isActive && (
					<img
						src={borderBrIcon}
						alt='border-icon'
						className='absolute -top-1 left-[13px] w-[81px] h-[120px] transform -scale-y-100'
					/>
				)}
				{current === 'focus' && isActive && (
					<div className='absolute -top-[41px] -left-7 w-[81px] h-[120px]'>
						<img src={borderBrIcon} alt='border-icon' className='absolute w-full h-full' />
					</div>
				)}
				<img
					src={iconSrc}
					alt='menu-item'
					className={`w-full h-full ${
						isActive ? 'opacity-100 brightness-100' : 'opacity-20 brightness-200'
					}`}
				/>
			</div>
			{!small && !isActive && (
				<div className='relative w-[50px] border-b-2 border-transparent-w-30 transform top-full left-1/2 -translate-x-1/2' />
			)}
		</div>
	);
}

export default function Menu() {
	const initialTab = { mood: false, template: false, set: false, focus: false };
	const [menuTab, setMenuTab] = useState(initialTab);

	return (
		<div className='fixed top-1/2 right-0 transform -translate-y-1/2 flex flex-row-reverse items-center z-10'>
			<div className='relative mr-5 flex flex-col h-[280px] w-[70px] bg-transparent-b-60 rounded-full z-20'>
				<MenuItem
					iconSrc={moodIcon}
					top
					current='mood'
					isActive={menuTab.mood}
					className='-top-5 -left-[22px]'
					handleClick={() => {
						menuTab.mood ? setMenuTab(initialTab) : setMenuTab({ ...initialTab, mood: true });
					}}
				/>
				<MenuItem
					iconSrc={templateIcon}
					current='template'
					isActive={menuTab.template}
					className='-top-7 -left-6'
					handleClick={() => {
						menuTab.template
							? setMenuTab(initialTab)
							: setMenuTab({ ...initialTab, template: true });
					}}
				/>
				<MenuItem
					iconSrc={setIcon}
					current='set'
					isActive={menuTab.set}
					className='-top-7 -left-5'
					handleClick={() => {
						menuTab.set ? setMenuTab(initialTab) : setMenuTab({ ...initialTab, set: true });
					}}
				/>
				<MenuItem
					iconSrc={focusIcon}
					current='focus'
					isActive={menuTab.focus}
					bottom
					small
					className='top-4 left-5'
					handleClick={() => {
						menuTab.focus ? setMenuTab(initialTab) : setMenuTab({ ...initialTab, focus: true });
					}}
				/>
			</div>

			{(menuTab.mood || menuTab.template || menuTab.set || menuTab.focus) && (
				<>
					<div
						className={`w-[345px] bg-bg-menu rounded-3xl p-6 z-20 ${menuTab.focus ? 'mt-40' : ''}`}
					>
						{menuTab.mood && <Mood />}
						{menuTab.template && <Template />}
						{menuTab.set && <Set />}
						{menuTab.focus && <Focus />}
					</div>

					<div
						className='absolute w-screen h-screen z-10'
						onClick={() => setMenuTab({ ...initialTab })}
					/>
				</>
			)}
		</div>
	);
}
