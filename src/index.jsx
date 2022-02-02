import React from 'react';
import ReactDOM from 'react-dom';
import '@fontsource/roboto';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import App from './App';
import { AppProvider, AuthProvider } from './context';
import './index.css';

ReactDOM.render(
	<React.StrictMode>
		<AuthProvider>
			<AppProvider>
				<App />
			</AppProvider>
		</AuthProvider>
	</React.StrictMode>,
	document.getElementById('root')
);
