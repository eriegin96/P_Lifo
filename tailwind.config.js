module.exports = {
	content: ['./src/**/*.{js,jsx,ts,tsx}'],
	theme: {
		extend: {
			animation: {
				fadeIn: 'fadeIn 0.5s ease',
			},
			backgroundColor: (theme) => ({
				...theme('colors'),
				bg: 'var(--color-bg)',
				'transparent-w-10': 'var(--color-transparent-w-10)',
				'transparent-b-50': 'var(--color-transparent-b-50)',
				'transparent-b-70': 'var(--color-transparent-b-70)',
				'transparent-b-80': 'var(--color-transparent-b-80)',
				'bg-200': 'var(--color-bg-200)',
				'bg-300': 'var(--color-bg-300)',
				'bg-400': 'var(--color-bg-400)',
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
			brightness: {
				1000: '100',
			},
			colors: {
				primary: 'var(--color-primary)',
				secondary: 'var(--color-secondary)',
				clear: 'var(--color-clear)',
				transparent: 'var(--color-transparent-w-30)',
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
			keyframes: {
				fadeIn: {
					'0%': { opacity: 0 },
					'100%': { opacity: 1 },
				},
			},
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
			zIndex: {
				1: 1,
				'-1': -1,
			},
		},
	},
	plugins: [],
};

// #1c1a23
