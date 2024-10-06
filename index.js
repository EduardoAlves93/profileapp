// index.js or main.js
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Amplify } from 'aws-amplify';
import awsconfig from './aws-exports';

// Configure Amplify
Amplify.configure(awsconfig);

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById('root')
);
