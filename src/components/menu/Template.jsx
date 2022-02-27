import React, { useContext } from 'react';
import { Button } from '..';
import { binIcon } from '../../assets/icons';
import { TEMPLATES } from '../../constants';
import { AppContext } from '../../context/AppProvider';
import { AuthContext } from '../../context/AuthProvider';
import { updateUser } from '../../firebase/services';

export default function Template() {
	const { uid } = useContext(AuthContext);
	const { templates, background } = useContext(AppContext);

	const saveTemplate = () => {
		if (!templates.includes(background.scene))
			updateUser(uid, { templates: [...templates, background.scene] });
	};

	const deleteTemplate = (template) => {
		const newTemplates = templates.filter((t) => t !== template);
		updateUser(uid, { templates: newTemplates });
	};

	return (
		<div>
			<h4 className='font-bold mb-3 text-xl'>Saved templates</h4>

			{templates.length === 0 ? (
				<div className='min-h-[100px] flex flex-col items-center justify-evenly'>
					<p className='italic opacity-50'>You have no saved templates</p>
					<Button
						className='py-1.5 px-4 flex items-center border border-[#5293f3] rounded-full bg-[rgba(82,147,243,.1)]'
						onClick={saveTemplate}
					>
						Save Template
					</Button>
				</div>
			) : (
				<div className='grid grid-cols-2'>
					{TEMPLATES.filter((t) => templates.includes(t.template)).map((item) => (
						<div
							key={item.template}
							className='relative h-[170px] col-span-1 m-2 rounded-2xl cursor-pointer hover:opacity-70 duration-200 ease-out'
						>
							<img
								src={item.img}
								alt='image'
								className='absolute top-0 h-full object-cover rounded-2xl'
							/>
							<div className='absolute bottom-0 w-full h-full bg-gradient-half flex flex-col-reverse rounded-b-2xl'>
								<div className='mb-5 flex justify-between items-center'>
									<p className='pl-2'>{item.name}</p>
									<Button onClick={() => deleteTemplate(item.template)}>
										<img src={binIcon} alt='bin' className='w-9 h-9 mr-2' />
									</Button>
								</div>
							</div>
						</div>
					))}
				</div>
			)}
		</div>
	);
}
