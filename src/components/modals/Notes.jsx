import React, { useContext } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import { Button } from '..';
import { AppContext } from '../../context/AppProvider';
import { closeIcon } from '../../assets/icons';

// TODO: check CSS
export default function Notes() {
	const { draggableModalType, setDraggableModalType } = useContext(AppContext);

	const saveNote = () => {
		// {title, content}
	};

	return (
		<div className='absolute top-44 left-1/2 transform -translate-x-1/2 animate-fadeIn'>
			<div className='p-6 flex flex-col justify-center items-center rounded-2xl bg-black'>
				<Button
					className='absolute top-4 right-4'
					onClick={() => {
						setDraggableModalType({ ...draggableModalType, notes: false });
					}}
				>
					<img src={closeIcon} alt='close' />
				</Button>

				<div className='flex'>
					<div className='handle cursor-move'>
						<h3 className='text-3xl font-bold'>Notes</h3>
					</div>
					<div className='w-[400px]'>
						<div className='py-2'>Edit</div>
						<div className='mt-2'>
							<CKEditor
								editor={ClassicEditor}
								data='<p>Hello from CKEditor 5!</p>'
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
					</div>
				</div>
			</div>
		</div>
	);
}
