'use client';

import { useEffect } from 'react';

export default function WebchatLoader() {
    useEffect(() => {
        const script = document.createElement('script');
        script.src = '/embed/test.js'; // Ensure correct path
        script.onload = () => {
            let interval = setInterval(() => {
                if (window.renderWebchat) {
                    window.renderWebchat('webchat-container', {
                        msgs: [
                            { id: '1', text: 'Hello!', type: 'bot', timestamp: new Date() },
                        ],
                        brandColor: '#007bff',
                        accentColor: '#28a745',
                        fontFamily: 'sans-serif',
                        bubblePosition: 'end',
                    });
                    clearInterval(interval);
                } else {
                    console.log('renderWebchat not ready yet');
                }
            }, 50);
        };
        script.onerror = () => {
            console.error('Failed to load webchat.js');
        };
        document.head.appendChild(script);
    }, []);

    return null;
}