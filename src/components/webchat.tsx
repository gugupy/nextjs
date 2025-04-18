'use client';

import React from "react";
import { Avatar, Background, Column, Flex, Heading, IconButton, Input, Line, Row, Text, Textarea, TiltFx } from "@/once-ui/components";
import { style } from "@/app/resources/config";
import { SpacingToken } from "@/once-ui/types";

export interface WidgetStyle {
    brandColor: string;
    accentColor: string;
    fontFamily: string;

    // Bubble config
    bubblePosition?: "start" | "end";
    widgetWidth?: number | SpacingToken;
    widgetHeight?: number | SpacingToken;
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
    const [isOpen, setIsOpen] = React.useState(true);
    const [messages, setMessages] = React.useState<(UserMessage | BotMessage)[]>(msgs);
    const [userMessage, setUserMessage] = React.useState<UserMessage | null>(null);

    return (
        <Column horizontal={widgetStyle?.bubblePosition || 'start'} gap="2" fillHeight>
            {isOpen &&
                <Column flex={1} background="neutral-alpha-weak" radius="l" border="accent-alpha-weak" overflow="hidden" width={widgetStyle?.widgetWidth} fillWidth>
                    <Background
                        position="absolute"
                        mask={{
                            x: 50,
                            y: 100,
                            radius: 50,
                            cursor: false
                        }}
                        gradient={{
                            display: true,
                            x: 50,
                            y: 100,
                            width: 200,
                            height: 100,
                            tilt: -40,
                            opacity: 100,
                            colorStart: "accent-background-strong",
                            colorEnd: "static-transparent",
                        }}
                        grid={{
                            display: false,
                            opacity: 100,
                            width: "0.25rem",
                            color: "neutral-alpha-medium",
                            height: "0.25rem",
                        }}
                    />
                    {/* Chat Header */}
                    <Row horizontal="start" padding="m" gap="s" vertical="center" topRadius="s">
                        <Avatar
                            size="l"
                            value="FC"
                            loading={false}
                            empty={false}
                        />
                        <Column >
                            <Heading as="h3">Fonki</Heading>
                            <Text variant="label-default-xs">We always available!</Text>
                        </Column>
                    </Row>
                    <Line />

                    {/* Chat Window */}
                    <Column
                        fillHeight
                        flex={1}
                        gap="s"
                        overflowY="auto"
                        padding="s"
                        minHeight={widgetStyle?.widgetHeight}
                        ref={(el) => {
                            if (el) {
                                el.scrollTop = el.scrollHeight; // Auto-scroll to bottom
                            }
                        }}
                    >
                        {messages.map((message) => (
                            <Row
                                key={message.id}
                                horizontal={message.type === MessageType.Bot ? "start" : "end"}
                                gap="xs"
                                vertical="end"
                                style={{ wordWrap: "break-word", wordBreak: "break-word", maxWidth: "100%" }}
                            >
                                {message.type === "bot" && <Avatar size="m" value="FC" />}
                                <Flex
                                    background={message.type === MessageType.User ? 'brand-strong' : 'neutral-weak'}
                                    border={message.type === MessageType.Bot ? 'neutral-alpha-medium' : undefined}
                                    paddingX="16"
                                    paddingY="12"
                                    topRadius="l"
                                    bottomLeftRadius={message.type === MessageType.User ? "l" : undefined}
                                    bottomRightRadius={message.type === MessageType.Bot ? "l" : undefined}
                                    style={{ wordWrap: "break-word", wordBreak: "break-word", maxWidth: "80%" }}
                                >
                                    <Text
                                        onBackground={message.type === MessageType.User ? "neutral-strong" : "neutral-medium"}
                                        variant="label-default-l"
                                        style={{ fontFamily: widgetStyle.fontFamily, wordWrap: "break-word", wordBreak: "break-word" }}
                                    >
                                        {message.text}
                                    </Text>
                                </Flex>
                                {message.type === "user" && <Avatar size="m" value="U" />}
                            </Row>
                        ))}
                    </Column>

                    {/* Chat Footer */}
                    {/* <Row horizontal="center" vertical="center" gap="xs" padding="xs" background="neutral-alpha-medium" bottomRadius="s"> */}
                    <Flex horizontal="center" vertical="center" padding="xs" gap="xs" data-theme={style.accent}>
                        <Input
                            id="message-input"
                            label="Type your message..."
                            value={userMessage?.text || ""}
                            labelAsPlaceholder={true}
                            onChange={(e) => {
                                setUserMessage({
                                    id: Math.random().toString(36).substr(2, 9),
                                    text: e.target.value,
                                    type: MessageType.User,
                                    timestamp: new Date(),
                                });
                            }}
                            height="s"
                        />
                        <IconButton
                            icon="send"
                            tooltip="Send"
                            tooltipPosition="top"
                            variant="secondary"
                            size="l"
                            onClick={() => {
                                if (userMessage) {
                                    setMessages([...messages, userMessage]);
                                    setUserMessage(null); // Clear the input after sending
                                }
                            }}
                        />
                    </Flex>
                </Column >
            }
            <Column vertical="end" transition="micro-long" gap="xs">
                <TiltFx
                    border="brand-alpha-weak"
                    radius="l"
                >
                    <IconButton icon="chatBubble" size="l" variant="secondary" onClick={() => { setIsOpen(!isOpen) }} />
                </TiltFx>
            </Column>
        </Column >
    );
};

export default WebChat;
