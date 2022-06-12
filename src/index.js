import React from 'react';
import ReactDOM from 'react-dom/client';
import AppProvider from './hoc/AppProvider';
import App from './App';
import './css/styles.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<AppProvider>
			<App />
		</AppProvider>
	</React.StrictMode>
);
