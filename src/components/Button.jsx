import React from 'react';

export default function Button({ children, className, onClick, iconButton }) {
	return (
		<button
			type='button'
			onClick={onClick}
			className={`transition-all duration-300 ease-linear hover:opacity-50 transform ${
				!iconButton && 'active:translate-y-0.5'
			} ${className}`}
		>
			{children}
		</button>
	);
}
