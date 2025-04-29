"use client";

import React, { useState } from "react";

import {
  ColorInput,
  Column,
  Heading,
  Input,
  Row,
  ThemeSwitcher,
  Text,
  ToggleButton,
  Button,
  Accordion,
  SegmentedControl
} from "@/once-ui/components";
import { CodeBlock } from "@/once-ui/modules";
import WebChat, { WidgetStyle, MessageType } from "@/components/webchat";

enum BubblePosition {
  Start = "start",
  End = "end"
}

enum WidgetStyleType {
  brandColor = "brandColor",
  accentColor = "accentColor",
  fontFamily = "fontFamily",
  bubblePosition = "bubblePosition",
  widgetWidth = "widgetWidth",
  widgetHeight = "widgetHeight",
}


export default function Home() {
  const [customAccentColor, setCustomAccentColor] = useState<string | null>(null);
  const [customBrandColor, setCustomBrandColor] = useState<string | null>(null);
  const [widgetStyle, setWidgetStyle] = useState<WidgetStyle>({
    brandColor: "blue",
    accentColor: "blue",
    fontFamily: "Arial",
    bubblePosition: BubblePosition.End,
    widgetWidth: 25,
    widgetHeight: 37,
    position: "relative",
    bottom: "0px",
    right: "0px",
  });
  // const [customSchema, setCustomSchema] = useState<string | null>(null);


  // React.useEffect(() => {
  //   async function updateColors() {
  //     try {
  //       const response = await fetch('/api/generateColors', {
  //         method: 'POST',
  //         headers: {
  //           'Content-Type': 'application/json',
  //         },
  //         body: JSON.stringify({ brandColor: customBrandColor, accentColor: customAccentColor }),
  //       });

  //       if (!response.ok) {
  //         throw new Error('Failed to update colors');
  //       }

  //       const data = await response.json();

  //       if (data.scss) {
  //         setCustomSchema(data.scss);
  //         const styleElement = document.createElement('style');
  //         styleElement.textContent = data.scss;
  //         document.head.appendChild(styleElement);
  //       } else if (data.error) {
  //         console.error('Error applying custom colors:', data.error);
  //       }

  //     } catch (error) {
  //       console.error('Error updating colors:', error);
  //     }
  //   }

  //   if (customAccentColor || customBrandColor) {
  //     updateColors();
  //   } else {
  //     setCustomSchema(null);
  //   }
  // }, [customAccentColor, customBrandColor]);

  const generateRandomString = (length: number) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  };

  const messages = [
    {
      id: generateRandomString(8),
      text: "Hello, how can I help you?",
      timestamp: new Date(),
      type: MessageType.Bot,
    },
    {
      id: generateRandomString(8),
      text: "I need help with my order.",
      timestamp: new Date(),
      type: MessageType.User,
    },
  ];

  const handleWidgetStyle = (value: any, type: WidgetStyleType, isCustom: boolean = false) => {
    if (type === WidgetStyleType.brandColor) {
      if (isCustom) {
        updateBrand('custom');
        setCustomBrandColor(value);
      } else {
        updateBrand(value);
      }
    } else if (type === WidgetStyleType.accentColor) {
      if (isCustom) {
        updateAccent('custom');
        setCustomAccentColor(value);
      } else {
        updateAccent(value);
      }
    }
    setWidgetStyle({
      ...widgetStyle,
      [type]: value
    });
  }

  const updateBrand = (value: any) => {
    document.documentElement.setAttribute('data-brand', value);
  }

  const updateAccent = (value: any) => {
    document.documentElement.setAttribute('data-accent', value);
  }

  return (
    <Column horizontal="center" gap="s" fillWidth padding="m">
      {/* Header */}
      <Column horizontal="center" gap="s" fillWidth padding="m" zIndex={3}>
        <Row gap="m" horizontal="space-around" className="header">
          <ThemeSwitcher center color="accent-alpha-strong" />
          <Button
            variant="secondary"
            weight="default"
            suffixIcon="close"
            className="button"
            size="l"
            onClick={() => {
              window.location.href = "/";
            }}
          >
            Exit
          </Button>
        </Row>
        <Heading>Fonki Chat Builder</Heading>
      </Column>

      {/* Main Content */}
      <Row mobileDirection="column" horizontal="center" gap="xl">

        {/* Widget Configurator */}
        <Column gap="s" horizontal="center">
          <Heading as="h3" variant="body-default-l">Configure Chat Widget</Heading>
          <Column border="neutral-alpha-strong" padding="m" gap="s" radius="s" overflowY="auto" maxWidth={25} maxHeight={40}>
            {/* Brand Color */}
            <Column key="brand" gap="xs" radius="s">
              <Text>Brand Color</Text>
              {/* <Scroller
                direction="row"
                maxHeight={12}
                gap="s"
              >
                {[
                  "blue",
                  "indigo",
                  "violet",
                  "magenta",
                  "pink",
                  "red",
                  "orange",
                  "yellow",
                  "moss",
                  "green",
                  "emerald",
                  "aqua",
                  "cyan",
                ].map((color) => (
                  <Flex key={color} paddingRight="xs">
                    <IconButton
                      size="m"
                      variant="ghost"
                      icon=""
                      style={{
                        background: `var(--scheme-${color}-500)`,
                        borderColor: `var(--scheme-${color}-700)`,
                      }}
                      onClick={() => { handleWidgetStyle(color, WidgetStyleType.brandColor); setCustomBrandColor(null); }} />
                  </Flex>
                ))}
              </Scroller> */}
              <ColorInput
                id="brand-color"
                label="Custom brand color"
                value={widgetStyle.brandColor}
                onChange={(newColor) => handleWidgetStyle(newColor.target.value, WidgetStyleType.brandColor, true)} />
            </Column>
            {/* Accent Color */}
            <Column key="accent" gap="xs" fillWidth radius="s">
              <Text>Accent</Text>
              {/* <Scroller
                direction="row"
                maxHeight={12}
                gap="xs"
              >
                {[
                  "blue",
                  "indigo",
                  "violet",
                  "magenta",
                  "pink",
                  "red",
                  "orange",
                  "yellow",
                  "moss",
                  "green",
                  "emerald",
                  "aqua",
                  "cyan",
                ].map((color) => (
                  <Flex key={`${color}1`} paddingRight="xs">
                    <IconButton
                      size="m"
                      variant="ghost"
                      icon=""
                      style={{
                        background: `var(--scheme-${color}-500)`,
                        borderColor: `var(--scheme-${color}-700)`,
                      }}
                      onClick={() => { handleWidgetStyle(color, WidgetStyleType.accentColor); setCustomAccentColor(null); }} />
                  </Flex>
                ))}
              </Scroller> */}
              <ColorInput
                id="accent-color"
                label="Custom accent color"
                value={widgetStyle.accentColor}
                onChange={(newColor) => handleWidgetStyle(newColor.target.value, WidgetStyleType.accentColor, true)} />
            </Column>

            {/* Font Family */}
            <Column key="font-family" gap="xs" fillWidth radius="s">
              <Text>Font Family</Text>
              <Input id="font-family" label="Enter the font family" labelAsPlaceholder={true} value={widgetStyle.fontFamily} onChange={(font) => setWidgetStyle({ ...widgetStyle, fontFamily: font.target.value })}></Input>
            </Column>

            {/* Widget Size */}
            <Row gap="s" horizontal="center" fillWidth>
              <Column fillWidth gap="xs">
                <Text>Width</Text>
                <Input
                  id="widget-width"
                  label="Widget Width"
                  labelAsPlaceholder={true}
                  value={widgetStyle.widgetWidth}
                  onChange={(width) => {
                    const value = Number(width.target.value);
                    setWidgetStyle({ ...widgetStyle, widgetWidth: value });
                  }}
                ></Input>
              </Column>
              <Column fillWidth gap="xs">
                <Text>Height</Text>
                <Input
                  id="widget-height"
                  label="Widget Height"
                  labelAsPlaceholder={true}
                  value={widgetStyle.widgetHeight}
                  onChange={(height) => {
                    const value = Number(height.target.value);
                    setWidgetStyle({ ...widgetStyle, widgetHeight: value });
                  }}
                ></Input>
              </Column>
            </Row>

            {/* Bubble Positions */}
            <Column fillWidth vertical="stretch" gap="xs">
              <Text>Bubble Position</Text>
              <Row fillWidth>
                <ToggleButton variant="outline" prefixIcon="chevronLeft" radius="left" weight="default" onClick={() => setWidgetStyle({ ...widgetStyle, bubblePosition: BubblePosition.Start })} fillWidth selected={widgetStyle.bubblePosition === BubblePosition.Start}>Left</ToggleButton>
                <ToggleButton variant="outline" suffixIcon="chevronRight" radius="right" weight="default" onClick={() => setWidgetStyle({ ...widgetStyle, bubblePosition: 'end' })} fillWidth aria-controls="panel-dark" selected={widgetStyle.bubblePosition === BubblePosition.End}>Right</ToggleButton>
              </Row>
            </Column>

            {/* Advanced Configurations */}
            <Column fillWidth gap="xs">         
              <Accordion
                title="Advanced Configurations"
                open={false}
                size="s"
              >
                <Column gap="xs" horizontal="center" fillWidth>
                  <Column fillWidth gap="1">
                    <Text>Header Background Color</Text>
                    <ColorInput
                      id="header-background-color"
                      label="Custom header background color"
                      value={widgetStyle.headerBackgroundColor || ""}
                      onChange={(newColor) =>
                        setWidgetStyle({ ...widgetStyle, headerBackgroundColor: newColor.target.value })
                      }
                    />
                  </Column>
                  <Column fillWidth gap="1">
                    <Text>Header TagLine Color</Text>
                    <ColorInput
                      id="header-background-color"
                      label="Custom header tagline color"
                      value={widgetStyle.headerBackgroundColor || ""}
                      onChange={(newColor) =>
                        setWidgetStyle({ ...widgetStyle, headerTaglineColor: newColor.target.value })
                      }
                    />
                  </Column>
                  <Column fillWidth gap="1">
                    <Text>User Message Text Color</Text>
                    <ColorInput
                      id="user-message-text-color"
                      label="Custom color for user messages"
                      value={widgetStyle.textColor || ""}
                      onChange={(newColor) => setWidgetStyle({ ...widgetStyle, textColor: newColor.target.value })}
                    />
                  </Column>
                </Column>
              </Accordion>
            </Column>
          </Column>
        </Column>

        {/* Widget Preview */}
        <Column gap="s" horizontal="center">
          <Heading as="h3" variant="body-default-l">Preview</Heading>
          <WebChat
            key={`${widgetStyle.brandColor}-${widgetStyle.accentColor}-${widgetStyle.fontFamily}`}
            brandColor={widgetStyle.brandColor}
            accentColor={widgetStyle.accentColor}
            fontFamily={widgetStyle.fontFamily}
            bubblePosition={widgetStyle.bubblePosition}
            widgetWidth={widgetStyle.widgetWidth}
            widgetHeight={widgetStyle.widgetHeight}
            position={widgetStyle.position}
            textColor={widgetStyle.textColor}
            headerBackgroundColor={widgetStyle.headerBackgroundColor}
            headerTaglineColor={widgetStyle.headerTaglineColor}
            bottom={widgetStyle.bottom}
            right={widgetStyle.right}
            msgs={messages} />
        </Column>
      </Row>

      {/* Code snippet */}
      <Column horizontal="center" data-border="rounded" gap="s" radius="s" fillWidth maxWidth={"s"}>
          <Heading as="h3" variant="body-default-l">
            Copy the code and paste it in your website
          </Heading>
          <CodeBlock
            codeHeight={30}
            codeInstances={[
              {
                code: `<!DOCTYPE html>
    <head>
    <title>Fonki Chat Widget</title>
    <script src="src/public/embed/webchat.js"></script>
    </head>
    <body>
    <div id="webchat-container"></div>
    <script>
      document.addEventListener('DOMContentLoaded', function() {
      if (window.renderWebchat && typeof window.renderWebchat.renderWebchat === 'function') {
        window.renderWebchat.renderWebchat('webchat-container', {
        brandColor: '${customBrandColor ? customBrandColor : widgetStyle.brandColor}',
        accentColor: '${customAccentColor ? customAccentColor : widgetStyle.accentColor}',
        fontFamily: '${widgetStyle.fontFamily}',
        bubblePosition: '${widgetStyle.bubblePosition}',
        widgetWidth: '${widgetStyle.widgetWidth}',
        widgetHeight: '${widgetStyle.widgetHeight}',
        position: "fixed",
        ${widgetStyle.headerBackgroundColor ? `headerBackgroundColor: '${widgetStyle.headerBackgroundColor}',` : ''}
        ${widgetStyle.textColor ? `textColor: '${widgetStyle.textColor}',` : ''}
        ${widgetStyle.botKey ? `botKey: '${widgetStyle.botKey}',` : ''}
        });
      } else {
        console.error('renderWebchat or renderWebchat.renderWebchat is undefined');
      }
      });
    </script>
    </body>
  </html>`.replace(/^\s*[\r\n]/gm, ''),
                label: 'HTML',
                language: 'html',
              },
            ]}
            copyButton={true}
            compact={false}
            textSize="xs" />
        </Column>
    </Column >

  );
}
