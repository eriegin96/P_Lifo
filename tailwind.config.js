module.exports = {
	content: ['./src/**/*.{js,jsx,ts,tsx}'],
	theme: {
		extend: {
			animation: {
				fadeIn: 'fadeIn 0.3s ease',
				fadeIn1s: 'fadeIn 1s ease',
				fadeOut: 'fadeOut 0.3s ease',
			},
			backgroundColor: (theme) => ({
				...theme('colors'),
				bg: 'var(--color-bg)',
				'bg-menu': 'var(--color-bg-menu)',
				'transparent-w-10': 'var(--color-transparent-w-10)',
				'transparent-w-20': 'var(--color-transparent-w-20)',
				'transparent-w-30': 'var(--color-transparent-w-30)',
				'transparent-b-50': 'var(--color-transparent-b-50)',
				'transparent-b-60': 'var(--color-transparent-b-60)',
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
				'primary-20': 'var(--color-primary-20)',
				secondary: 'var(--color-secondary)',
				clear: 'var(--color-clear)',
				'transparent-w-10': 'var(--color-transparent-w-10)',
				'transparent-w-20': 'var(--color-transparent-w-20)',
				'transparent-w-30': 'var(--color-transparent-w-30)',
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
				fadeOut: {
					'0%': { opacity: 1 },
					'100%': { opacity: 0 },
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
				2: 2,
				3: 3,
				4: 4,
				5: 5,
				'-1': -1,
			},
		},
	},
	plugins: [],
};

// #1c1a23
