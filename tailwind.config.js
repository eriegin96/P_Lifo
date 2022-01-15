module.exports = {
	content: ['./src/**/*.{js,jsx,ts,tsx}'],
	theme: {
		extend: {
			animation: {
				zoomInOut: 'zoomInOut 1s ease infinite',
			},
			backgroundColor: (theme) => ({
				...theme('colors'),
				bg: 'var(--color-bg)',
				'bg-transparent': 'var(--color-transparent-13)',
				'bg-100': 'var(--color-bg-100)',
				'bg-150': 'var(--color-bg-150)',
				'bg-200': 'var(--color-bg-200)',
				'bg-300': 'var(--color-bg-300)',
			}),
			backgroundImage: {
				gradient: 'var(--gradient)',
				'gradient-r': 'var(--gradient-r)',
				'gradient-half': 'var(--gradient-half)',
			},
			borderRadius: {},
			borderWidth: {},
			boxShadow: {
				default: 'var(--default-shadow)',
			},
			colors: {
				primary: 'var(--color-primary)',
				secondary: 'var(--color-secondary)',
				clear: 'var(--color-clear)',
				transparent: 'var(--color-transparent-30)',
			},
			flexGrow: {
				2: 2,
				3: 3,
			},
			inset: {
				'1/10': '10%',
				'1/5': '20%',
				'2/5': '40%',
				'3/5': '60%',
				'4/5': '80%',
			},
			keyframes: {},
			letterSpacing: {
				1: '1px',
			},
			lineHeight: {},
			minHeight: {},
			maxHeight: {},
			minWidth: {},
			maxWidth: {},
			rotate: {},
			spacing: {},
			zIndex: {},
		},
	},
	plugins: [],
};

// #1c1a23
