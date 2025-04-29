'use client';

import React, { useState, useRef, useEffect } from 'react';
import { BsSendFill } from "react-icons/bs";
import { PiChatsCircle } from "react-icons/pi";

export interface WidgetStyle {
    brandColor: string;
    accentColor: string;
    fontFamily: string;
    widgetWidth?: number;
    widgetHeight?: number;

    position?: "fixed" | "absolute" | "relative" | "sticky" | "static";
    botKey?: string;


    headerText?: string;
    headerTextColor?: string;
    headerBackgroundColor?: string;
    headerBorderColor?: string;
    headerFontSize?: string;
    headerFontWeight?: string;

    headerTagline?: string;
    headerTaglineColor?: string;
    headerTaglineFontSize?: string;
    headerTaglineFontWeight?: string;
    textColor?: string;

    bubbleTextColor?: string;
    bubbleBackgroundColor?: string;
    bubbleBorderColor?: string;
    bubblePosition?: "start" | "end";

    fonkiHost?: string;
}


interface Message {
    id: string;
    text: string;
    timestamp: Date;
}

export enum MessageType {
    User = "user",
    Bot = "bot",
}

export interface UserMessage extends Message {
    type: MessageType.User;
}

export interface BotMessage extends Message {
    type: MessageType.Bot;
}


const WebChat: React.FC<WidgetStyle & { msgs: (UserMessage | BotMessage)[] }> = ({ msgs, ...widgetStyle }) => {
    const [isOpen, setIsOpen] = useState(true);
    const [messages, setMessages] = useState(msgs);
    const [input, setInput] = useState('');
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const [callId, setCallId] = useState('');
    // const [isConnected, setIsConnected] = useState(false);

    useEffect(() => {
        const storedMessages = localStorage.getItem('messages');
        if (storedMessages) {
            setMessages([...messages, ...JSON.parse(storedMessages)]);
        }
    }, []);

    const chatwithBot = async (message: string = '') => {
        const response = await fetch(`${widgetStyle.fonkiHost || 'http://localhost:5000'}/api/predict`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ bot_id: widgetStyle.botKey, message: message, call_id: callId }),
        });
        if (!response.ok) {
            console.error('Error fetching data:', response.statusText);
            return;
        }
        const data = await response.json();
        if (data && data.message) {
            // setIsConnected(true);
            setCallId(data.call_id);
            setMessages((prevMessages) => [
                ...prevMessages,
                { id: Date.now().toString(), text: data.message, timestamp: new Date(), type: MessageType.Bot },
            ]);
        }
    };

    const styles = {
        widgetContainer: {
            display: 'flex',
            flexDirection: 'column' as 'column',
            bottom: '20px',
            right: '20px',
            width: "100 %",
            maxHeight: `${widgetStyle.widgetHeight}rem`,
            fontFamily: widgetStyle.fontFamily,
            zIndex: 1000,
            position: widgetStyle.position || 'fixed',
        },
        chatBox: {
            display: 'flex',
            flexDirection: 'column' as 'column',
            borderRadius: '20px',
            border: '1px solid #ccc',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            overflow: 'hidden',
            bottom: '20px',
            right: '20px',
            width: `${widgetStyle.widgetWidth}rem`,
            height: `${widgetStyle.widgetHeight}rem`,
        },
        header: {
            display: 'flex',
            alignItems: 'center',
            padding: '12px',
            borderBottom: '1px solid #ccc',
            gap: '10px',
            justifyContent: 'space-between',
        },
        avatar: {
            flexShrink: 0,
            borderRadius: '50%',
            borderColor: 'gray',
            borderType: 'solid',
            borderWidth: '1px',
            width: '40px',
            height: '40px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            fontWeight: 'bold',
            fontSize: '16px',
            backgroundColor: widgetStyle.brandColor,
            color: '#fff',
        },
        messagesContainer: {
            flex: 1,
            padding: '10px',
            overflowY: 'auto' as React.CSSProperties['overflowY'],
            display: 'flex',
            flexDirection: 'column' as 'column',
            gap: '10px',
        },
        message: {
            padding: '10px 14px',
            maxWidth: '100%',
            wordBreak: 'break-word' as React.CSSProperties['wordBreak'],
        },
        botMessage: {
            alignSelf: 'flex-start',
            border: '1px solid #ddd',
            borderTopLeftRadius: '20px',
            borderTopRightRadius: '20px',
            borderBottomRightRadius: '20px',
        },
        userMessage: {
            alignSelf: 'flex-end',
            backgroundColor: `${widgetStyle.accentColor}`,
            color: 'unset',
            borderTopRightRadius: '20px',
            borderTopLeftRadius: '20px',
            borderBottomLeftRadius: '20px',
        },
        footer: {
            display: 'flex',
            borderTop: '1px solid #ccc',
            padding: '8px',
            alignItems: 'center',
            justifyContent: 'space-between',
        },
        input: {
            flex: 1,
            padding: '12px 8px',
            borderRadius: '20px',
            marginRight: '8px',
            border: '1px solid #ccc',
            backgroundColor: 'unset',
            color: 'unset',
        },
        sendBtn: {
            border: 'none',
            backgroundColor: `${widgetStyle.brandColor}`,
            color: 'white',
            borderRadius: '50%',
            cursor: 'pointer',
        },
        bubbleBtn: {
            backgroundColor: `${widgetStyle.brandColor}`,
            color: 'white',
            borderRadius: '50%',
            width: '56px',
            height: '56px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            border: 'none',
            cursor: 'pointer',
            fontSize: '24px',
            boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
        },
        messageAvatar: {
            flexShrink: 0,
            backgroundColor: widgetStyle.accentColor,
            color: '#fff',
            borderRadius: '9999px',
            width: '32px',
            height: '32px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            fontWeight: 'bold',
            fontSize: '14px',
        },
        userAvatar: {
            backgroundColor: '#5e5e5e',
        },
    };

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const sendMessage = () => {
        if (!input.trim()) return;
        setMessages([...messages, { id: Date.now().toString(), text: input, timestamp: new Date(), type: MessageType.User }]);
        chatwithBot(input);
        setInput('');
        localStorage.setItem('messages', JSON.stringify([...messages, { id: Date.now().toString(), text: input, timestamp: new Date(), type: MessageType.User }]));
    };

    return (
        <div style={styles.widgetContainer}>
            {isOpen && (
                <div style={styles.chatBox}>
                    {/* Header */}
                    <div style={styles.header}>
                        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                            <div style={styles.avatar}>FC</div>
                            <div>
                                <strong>Fonki</strong>
                                <div style={{ fontSize: '12px', color: '#888' }}>We always available!</div>
                            </div>
                        </div>
                        {/* <div>
                            {!isConnected && <button
                                onClick={() => { chatwithBot(); }}
                                style={{
                                    marginLeft: 'auto',
                                    padding: '8px 12px',
                                    backgroundColor: widgetStyle.brandColor,
                                    color: '#fff',
                                    border: 'none',
                                    borderRadius: '8px',
                                    cursor: 'pointer',
                                    fontSize: '14px',
                                    fontWeight: 'bold',
                                }}
                            >
                                Connect to Bot
                            </button>}

                        </div> */}
                    </div>

                    {/* Messages */}
                    <div style={styles.messagesContainer}>
                        {messages.map((msg) => (
                            <div style={{ display: 'flex', gap: '5px', alignItems: 'end', alignSelf: msg.type === 'bot' ? "flex-start" : "flex-end", justifyContent: msg.type === 'user' ? 'flex-end' : 'unset' }} key={msg.id}>
                                {msg.type === 'bot' && (
                                    <div style={{ ...styles.messageAvatar }}>
                                        FC
                                    </div>
                                )}
                                <div
                                    style={{
                                        ...styles.message,
                                        ...(msg.type === 'bot' ? styles.botMessage : styles.userMessage),
                                    }}
                                >
                                    {msg.text}
                                </div>
                                {msg.type === 'user' && (
                                    <div style={{ ...styles.messageAvatar, ...styles.userAvatar }}>
                                        U
                                    </div>
                                )}
                            </div>
                        ))}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Footer */}
                    <div style={styles.footer}>
                        <input
                            style={styles.input}
                            placeholder="Type your message..."
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                        />
                        <button style={{ ...styles.sendBtn, borderRadius: '50%', width: '40px', height: '40px', display: 'flex', justifyContent: 'center', alignItems: 'center' }} onClick={sendMessage}>
                            <BsSendFill />
                        </button>
                    </div>
                </div>
            )
            }

            {/* Chat bubble toggle */}
            <div style={{ marginTop: '8px', display: 'flex', justifyContent: widgetStyle.bubblePosition === 'end' ? 'flex-end' : 'flex-start' }}>
                <button style={styles.bubbleBtn} onClick={() => setIsOpen(!isOpen)}><PiChatsCircle style={{ fontSize: "40px" }} /></button>
            </div>
        </div >
    );
};

export default WebChat;
