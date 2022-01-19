import React, { useState } from 'react';

import moodIcon from '../../assets/icons/mood.svg';
import templateIcon from '../../assets/icons/template.svg';
import setIcon from '../../assets/icons/set.svg';
import focusIcon from '../../assets/icons/focus.svg';
import borderBrIcon from '../../assets/icons/border-br.svg';
import Mood from './Mood';

function MenuItem({ iconSrc, className, small, top, bottom, handleClick, isActive, current }) {
	return (
		<div
			className={`relative w-[70px] h-[70px] cursor-pointer ${top ? 'rounded-t-full' : ''} ${
				bottom ? 'rounded-b-full' : ''
			}`}
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
						className='absolute -top-1 right-5 w-[81px] h-[120px] transform -scale-y-100'
					/>
				)}
				<img
					src={iconSrc}
					alt='menu-item'
					className={`w-full h-full ${
						isActive ? 'opacity-100 brightness-100' : 'opacity-20 brightness-200'
					} `}
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
		<div className='fixed top-1/2 right-0 transform -translate-y-1/2 flex flex-row-reverse items-center'>
			<div className='relative mr-5 flex flex-col h-[280px] w-[70px] bg-transparent-b-60 rounded-full'>
				<MenuItem
					iconSrc={moodIcon}
					top
					current='mood'
					isActive={menuTab.mood}
					className='-top-5 -left-[22px]'
					handleClick={() => setMenuTab({ ...initialTab, mood: true })}
				/>
				<MenuItem
					iconSrc={templateIcon}
					current='template'
					isActive={menuTab.template}
					className='-top-7 -left-6'
					handleClick={() => setMenuTab({ ...initialTab, template: true })}
				/>
				<MenuItem
					iconSrc={setIcon}
					current='set'
					isActive={menuTab.set}
					className='-top-7 -left-5'
					handleClick={() => setMenuTab({ ...initialTab, set: true })}
				/>
				<MenuItem
					iconSrc={focusIcon}
					current='focus'
					isActive={menuTab.focus}
					bottom
					small
					className='top-4 left-5'
					handleClick={() => setMenuTab({ ...initialTab, focus: true })}
				/>
			</div>

			<div className='w-[345px] bg-bg-menu rounded-3xl px-8'>{menuTab.mood && <Mood />}</div>
		</div>
	);
}
