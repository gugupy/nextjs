// src/app/lib/WebchatEmbed.js
'use client';
import React from 'react';
import ReactDOM from 'react-dom/client';
import WebChat from '../../components/WebChat';

export const renderWebchat = (containerId, props) => {
    const root = ReactDOM.createRoot(document.getElementById(containerId));
    root.render(<WebChat {...props} />);
};

if (typeof window !== 'undefined') {
    console.log('Window Object:', window);
    window.renderWebchat = renderWebchat;
    console.log('renderWebchat attached to window:', window.renderWebchat);
}