import React, { useContext, useRef, useState } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import { Button } from '..';
import { AppContext } from '../../context/AppProvider';
import { binIcon, closeIcon, newNoteIcon, titleNotesIcon } from '../../assets/icons';
import { format } from 'date-fns';
import { addNote, removeNote, updateNote } from '../../firebase/services';
import { AuthContext } from '../../context/AuthProvider';

export default function Notes() {
	const {user: {uid}} = useContext(AuthContext);
	const { draggableModalType, setDraggableModalType, notesRef, noteList } = useContext(AppContext);
	const [currentNote, setCurrentNote] = useState({title: '', content: ''});
	const editorRef = useRef();

	const saveNote = () => {
		const {title, content} = currentNote;

		if (currentNote.id) {
			updateNote(uid, currentNote.id, {title, content});
		} else {
			addNote(uid, {title, content});
			setCurrentNote({title: '', content: ''});
		}
	};

	const deleteNote = (id) => {
		if (id) {
			removeNote(uid, id)
			setCurrentNote({title: '', content: ''});
		};
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
							{noteList.map((note, i) => (
								<div
									key={i}
									className={`max-h-[150px] p-2 ${i === 0 ? '' : 'border-t'} ${
										note.id === currentNote?.id && 'bg-primary text-black'
									} border-transparent-w-10 hover:opacity-70 duration-300 ease-out overflow-hidden cursor-pointer`}
									onClick={() => setCurrentNote(note)}
								>
									<h5 className='text-lg font-semibold'>{note.title}</h5>
									<p className='text-xs'>{format(note?.modifiedAt?.seconds * 1000 || Date.now(), 'dd/MM/yyyy')}</p>
									<p className='text-sm note__content'>{note.content}</p>
								</div>
							))}
						</div>
					</div>

					{/* Right */}
					<div className='w-2/3 py-4 px-4 bg-black rounded-tr-3xl rounded-br-3xl'>
						<div className='py-2 flex items-center'>
							<Button onClick={() => setCurrentNote({title: '', content: ''})}>
								<img src={newNoteIcon} alt='new' className='w-6 h-6' />
							</Button>
							<Button onClick={() => deleteNote(currentNote?.id)}>
								<img src={binIcon} alt='bin' className='w-9 h-9' />
							</Button>
							<input
								type='text'
								placeholder='Add title here...'
								value={currentNote.title}
								onChange={(e) => setCurrentNote({...currentNote, title: e.target.value})}
								className='ml-2 bg-black text-3xl'
							/>
						</div>
						<div className='mt-2 h-[400px]'>
							<CKEditor
								ref={editorRef}
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
									setCurrentNote({...currentNote, content: editor.getData()})
								}}
								onFocus={(event, editor) => {
									console.log('Focus.', editor);
								}}
							/>
						</div>
						<div className='flex justify-end'>
							<Button className='py-1 px-6 bg-primary rounded-full text-black font-medium' onClick={saveNote}>
								Save
							</Button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
