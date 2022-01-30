import React, { useContext } from 'react';
import Draggable from 'react-draggable';
import { Session, Tasks, Notes, History } from '..';
import { AppContext } from '../../context/AppProvider';

export default function DraggableModal() {
	const {
		draggableModalType: { session, tasks, notes, history },
	} = useContext(AppContext);

	return (
		<>
			{session && (
				<Draggable handle='.handle'>
					<div className='relative z-40'>
						<Session />
					</div>
				</Draggable>
			)}
			{tasks && (
				<Draggable handle='.handle'>
					<div className='relative z-40'>
						<Tasks />
					</div>
				</Draggable>
			)}
			{notes && (
				<Draggable handle='.handle'>
					<div className='relative z-40'>
						<Notes />
					</div>
				</Draggable>
			)}
			{history && (
				<Draggable handle='.handle'>
					<div className='relative z-40'>
						<History />
					</div>
				</Draggable>
			)}
		</>
	);
}
