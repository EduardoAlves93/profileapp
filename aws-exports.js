// src/index.js or src/main.js
import React from 'react';
import ReactDOM from 'react-dom';
import AppWrapper from './App';
import Amplify from 'aws-amplify';
import awsconfig from './aws-exports';

// Configure Amplify
Amplify.configure(awsconfig);

ReactDOM.render(
    <React.StrictMode>
        <AppWrapper />
    </React.StrictMode>,
    document.getElementById('root')
);
