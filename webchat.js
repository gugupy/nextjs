(function () {
    'use strict';

    function createWebChat(containerId, widgetStyle, initialMessages) {
        const container = document.getElementById(containerId);
        if (!container) {
            console.error('WebChat container not found.');
            return;
        }

        const isOpen = true;
        let messages = initialMessages || [];
        let userMessage = null;

        function render() {
            container.innerHTML = ''; // Clear the container

            const column = document.createElement('div');
            column.style.display = 'flex';
            column.style.flexDirection = 'column';
            column.style.gap = '8px'; // Assuming 8px gap for "2" gap in your component
            column.style.alignItems = widgetStyle.bubblePosition === 'end' ? 'flex-end' : 'flex-start';

            if (isOpen) {
                const chatWindow = document.createElement('div');
                chatWindow.style.display = 'flex';
                chatWindow.style.flexDirection = 'column';
                chatWindow.style.flex = '1';
                chatWindow.style.width = '25rem'; // Assuming 25rem for width={25}
                chatWindow.style.backgroundColor = 'rgba(243, 244, 246, 1)'; // neutral-alpha-weak
                chatWindow.style.borderRadius = '12px'; // Assuming 12px for radius="l"
                chatWindow.style.border = '1px solid rgba(229, 231, 235, 1)'; // accent-alpha-weak
                chatWindow.style.overflow = 'hidden';
                chatWindow.style.height = '100%';

                // Background (Simplified)
                const background = document.createElement('div');
                background.style.position = 'absolute';
                background.style.background = 'linear-gradient(-40deg, rgba(220, 38, 38, 1) 0%, rgba(255, 255, 255, 0) 100%)'; // Simplified gradient
                background.style.width = '200px';
                background.style.height = '100px';
                background.style.top = '100px';
                background.style.left = '50%';
                background.style.transform = 'translateX(-50%)';

                chatWindow.appendChild(background);

                // Chat Header
                const header = document.createElement('div');
                header.style.display = 'flex';
                header.style.alignItems = 'center';
                header.style.padding = '16px'; // Assuming 16px for padding="m"
                header.style.gap = '8px'; // Assuming 8px for gap="s"
                header.style.borderBottom = '1px solid rgba(229, 231, 235, 1)'; // Line

                const avatar = document.createElement('div');
                avatar.style.width = '40px'; // Assuming 40px for size="l"
                avatar.style.height = '40px';
                avatar.style.borderRadius = '50%';
                avatar.style.backgroundColor = 'gray'; // Placeholder
                avatar.style.display = 'flex';
                avatar.style.alignItems = 'center';
                avatar.style.justifyContent = 'center';
                avatar.textContent = 'FC';

                const headerText = document.createElement('div');
                const heading = document.createElement('h3');
                heading.textContent = 'Fonki';
                const subText = document.createElement('p');
                subText.textContent = 'We always available!';

                headerText.appendChild(heading);
                headerText.appendChild(subText);

                header.appendChild(avatar);
                header.appendChild(headerText);
                chatWindow.appendChild(header);

                // Chat Window Messages
                const messageContainer = document.createElement('div');
                messageContainer.style.flex = '1';
                messageContainer.style.overflowY = 'auto';
                messageContainer.style.padding = '8px'; // Assuming 8px for padding="s"
                messageContainer.style.display = 'flex';
                messageContainer.style.flexDirection = 'column';
                messageContainer.style.gap = '8px'; // Assuming 8px for gap="s"
                messageContainer.style.minHeight = '30rem';

                messages.forEach((message) => {
                    const messageRow = document.createElement('div');
                    messageRow.style.display = 'flex';
                    messageRow.style.alignItems = 'flex-end';
                    messageRow.style.gap = '4px'; // Assuming 4px for gap="xs"
                    messageRow.style.justifyContent = message.type === 'bot' ? 'flex-start' : 'flex-end';

                    if (message.type === 'bot') {
                        const botAvatar = document.createElement('div');
                        botAvatar.style.width = '32px'; // Assuming 32px for size="m"
                        botAvatar.style.height = '32px';
                        botAvatar.style.borderRadius = '50%';
                        botAvatar.style.backgroundColor = 'gray'; // Placeholder
                        botAvatar.style.display = 'flex';
                        botAvatar.style.alignItems = 'center';
                        botAvatar.style.justifyContent = 'center';
                        botAvatar.textContent = 'FC';
                        messageRow.appendChild(botAvatar);
                    }

                    const messageBubble = document.createElement('div');
                    messageBubble.style.padding = '12px 16px';
                    messageBubble.style.borderRadius = '12px'; // Assuming 12px for radius="l"
                    messageBubble.style.backgroundColor = message.type === 'user' ? widgetStyle.brandColor : 'rgba(243, 244, 246, 1)'; // neutral-weak
                    if (message.type === 'bot') {
                        messageBubble.style.border = '1px solid rgba(229, 231, 235, 1)'; // neutral-alpha-medium
                    }
                    if (message.type === "user") {
                        messageBubble.style.borderRadius = '12px 12px 0px 12px';
                    }
                    if (message.type === "bot") {
                        messageBubble.style.borderRadius = '0px 12px 12px 12px';
                    }

                    const messageText = document.createElement('p');
                    messageText.textContent = message.text;
                    messageText.style.color = message.type === 'user' ? 'rgba(55, 65, 81, 1)' : 'rgba(107, 114, 128, 1)';

                    messageBubble.appendChild(messageText);
                    messageRow.appendChild(messageBubble);

                    if (message.type === 'user') {
                        const userAvatar = document.createElement('div');
                        userAvatar.style.width = '32px'; // Assuming 32px for size="m"
                        userAvatar.style.height = '32px';
                        userAvatar.style.borderRadius = '50%';
                        userAvatar.style.backgroundColor = 'gray'; // Placeholder
                        userAvatar.style.display = 'flex';
                        userAvatar.style.alignItems = 'center';
                        userAvatar.style.justifyContent = 'center';
                        userAvatar.textContent = 'U';
                        messageRow.appendChild(userAvatar);
                    }

                    messageContainer.appendChild(messageRow);
                });

                chatWindow.appendChild(messageContainer);

                // Chat Footer
                const footer = document.createElement('div');
                footer.style.display = 'flex';
                footer.style.alignItems = 'center';
                footer.style.padding = '8px'; // Assuming 8px for padding="xs"
                footer.style.gap = '8px'; // Assuming 8px for gap="xs"
                footer.style.backgroundColor = widgetStyle.accentColor;

                const input = document.createElement('input');
                input.type = 'text';
                input.placeholder = 'Type your message...';
                input.style.flex = '1';
                input.style.padding = '8px';
                input.style.borderRadius = '4px';

                const sendButton = document.createElement('button');
                sendButton.textContent = 'Send';
                sendButton.style.padding = '8px 16px';
                sendButton.style.backgroundColor = 'gray'; // Placeholder
                sendButton.style.color = 'white';
                sendButton.style.borderRadius = '4px';

                input.addEventListener('input', (e) => {
                    userMessage = {
                        id: Math.random().toString(36).substr(2, 9),
                        text: e.target.value,
                        type: 'user',
                        timestamp: new Date(),
                    };
                });

                sendButton.addEventListener('click', () => {
                    if (userMessage) {
                        messages = [...messages, userMessage];
                        userMessage = null;
                        input.value = '';
                        render();
                    }
                });

                footer.appendChild(input);
                footer.appendChild(sendButton);
                chatWindow.appendChild(footer);

                column.appendChild(chatWindow);
            }

            const toggleButton = document.createElement('button');
            toggleButton.textContent = isOpen ? 'Close Chat' : 'Open Chat';
            toggleButton.style.padding = '8px 16px';
            toggleButton.style.backgroundColor = 'gray'; // Placeholder
            toggleButton.style.color = 'white';
            toggleButton.style.borderRadius = '4px';

            toggleButton.addEventListener('click', () => {
                isOpen = !isOpen;
                render();
            });

            column.appendChild(toggleButton);

            container.appendChild(column);
        }

        render();
    }

    window.createWebChat = createWebChat;
})();