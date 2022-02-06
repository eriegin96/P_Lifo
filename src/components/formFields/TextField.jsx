import React from 'react';

export default function TextField({
	value,
	onChange,
	onBlur,
	label,
	inputRef,
	placeholder,
	className,
}) {
	return (
		<input
			type='text'
			label={label}
			placeholder={placeholder}
			value={value}
			onChange={onChange}
			onBlur={onBlur}
			ref={inputRef}
			className={className}
		/>
	);
}
