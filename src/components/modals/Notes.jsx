import React, { useContext, useState } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import { Button } from '..';
import { AppContext } from '../../context/AppProvider';
import { binIcon, closeIcon, newNoteIcon, titleNotesIcon } from '../../assets/icons';

const NOTES = [
	{ id: '1', title: 'note 1', time: '05/02/2022', content: 'note 1 content' },
	{
		id: '2',
		title: 'note 2',
		time: '06/02/2022',
		content:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
	},
	{
		id: '3',
		title: 'note 3',
		time: '07/02/2022',
		content:
			'Etiam pharetra consectetur consectetur. Vivamus egestas sem ut blandit aliquam. In et porttitor metus, ac elementum quam. Aenean vestibulum placerat consequat. Aenean feugiat vitae tortor vel feugiat. Quisque viverra tristique congue. In nec sapien sed nisi feugiat suscipit. Nulla at metus tincidunt, dapibus lorem vitae, dictum justo. Phasellus nisi lacus.',
	},
	{
		id: '4',
		title: 'note 4',
		time: '08/02/2022',
		content:
			'Mauris quis enim ultricies, tristique ante eu, rutrum est. Ut eget ultrices lectus, vitae placerat magna. Proin scelerisque mattis mauris. Suspendisse porta turpis nec scelerisque pharetra. Aenean sed enim nec eros rutrum congue. Sed varius neque ipsum, eu malesuada tortor aliquam eget. Etiam non mauris eget ex bibendum placerat. Curabitur.',
	},
];

export default function Notes() {
	const { draggableModalType, setDraggableModalType, notesRef } = useContext(AppContext);
	const [currentNote, setCurrentNote] = useState();

	const saveNote = () => {
		// {title, content}
	};

	const deleteNote = (id) => {
		const deleteIndex = NOTES.findIndex((note) => note.id === id);
		NOTES.splice(deleteIndex, 1);
	};

	return (
		<div className='absolute top-8 left-1/2 transform -translate-x-1/2'>
			<div className='flex'>
				<Button
					className='absolute top-4 right-4'
					onClick={() => {
						setDraggableModalType({ ...draggableModalType, notes: false });
					}}
				>
					<img src={closeIcon} alt='close' />
				</Button>

				<div className='flex w-[660px]'>
					{/* Left */}
					<div className='w-1/3 py-8 px-4 flex flex-col justify-between bg-gradient-notes bg-transparent-b-50 backdrop-blur-2xl rounded-tl-3xl rounded-bl-3xl overflow-hidden'>
						<div className='relative handle cursor-move'>
							<h3 className='w-2/3 mx-4 text-4xl font-bold'>Notes</h3>
							<img
								src={titleNotesIcon}
								alt='title-draw'
								className='absolute left-2.5 -bottom-2.5 pointer-events-none'
							/>
						</div>
						<div className='h-[400px] overflow-auto border border-transparent-w-20 rounded-xl'>
							{NOTES.map((note, i) => (
								<div
									key={i}
									ref={(el) => {
										notesRef.current[i] = el;
									}}
									className={`max-h-[150px] p-2 ${i === 0 ? '' : 'border-t'} ${
										note.id === currentNote?.id && 'bg-primary text-black'
									} border-transparent-w-10 hover:opacity-70 duration-300 ease-out overflow-hidden cursor-pointer`}
									onClick={() => setCurrentNote(note)}
								>
									<h5 className='text-lg font-semibold'>{note.title}</h5>
									<p className='text-xs'>{note.createdAt}</p>
									<p className='text-sm note__content'>{note.content}</p>
								</div>
							))}
						</div>
					</div>

					{/* Right */}
					<div className='w-2/3 py-4 px-4 bg-black rounded-tr-3xl rounded-br-3xl'>
						<div className='py-2 flex items-center'>
							<Button onClick={() => setCurrentNote({})}>
								<img src={newNoteIcon} alt='new' className='w-6 h-6' />
							</Button>
							<Button onClick={() => deleteNote(currentNote?.id)}>
								<img src={binIcon} alt='bin' className='w-9 h-9' />
							</Button>
							<input
								type='text'
								placeholder='Add title here...'
								defaultValue={currentNote?.title}
								className='ml-2 bg-black text-3xl'
							/>
						</div>
						<div className='mt-2 h-[400px]'>
							<CKEditor
								editor={ClassicEditor}
								data={currentNote?.content}
								onReady={(editor) => {
									// You can store the "editor" and use when it is needed.
									console.log('Editor is ready to use!', editor);
								}}
								onChange={(event, editor) => {
									const data = editor.getData();
									console.log({ event, editor, data });
								}}
								onBlur={(event, editor) => {
									console.log('Blur.', editor);
								}}
								onFocus={(event, editor) => {
									console.log('Focus.', editor);
								}}
							/>
						</div>
						<div className='flex justify-end'>
							<Button className='py-1 px-6 bg-primary rounded-full text-black font-medium'>
								Save
							</Button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
