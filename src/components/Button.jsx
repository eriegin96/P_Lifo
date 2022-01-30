import React from 'react';

export default function Button({ children, className, onClick, activeButton, type }) {
	return (
		<button
			type={type}
			onClick={onClick}
			className={`transition-all duration-200 ease-linear hover:opacity-50 ${
				activeButton ? 'active:translate-y-0.5' : ''
			} ${className}`}
		>
			{children}
		</button>
	);
}
