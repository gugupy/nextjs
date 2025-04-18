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
  Scroller,
  Flex,
  IconButton,
  ToggleButton,
  Button
} from "@/once-ui/components";
import { CodeBlock } from "@/once-ui/modules";
import WebChat, { WidgetStyle, MessageType } from "@/components/webchat";
import { SpacingToken } from "@/once-ui/types";

enum BubblePosition {
  Start = "start",
  End = "end"
}

enum WidgetStyleType {
  brandColor = "brandColor",
  accentColor = "accentColor",
  fontFamily = "fontFamily",
  bubblePosition = BubblePosition.Start,
  widgetWidth = "widgetWidth",
  widgetHeight = "widgetHeight",
}


export default function Home() {
  const [customAccentColor, setCustomAccentColor] = useState<string | null>(null);
  const [customBrandColor, setCustomBrandColor] = useState<string | null>(null);
  const [customSchema, setCustomSchema] = useState<string | null>(null);


  React.useEffect(() => {
    async function updateColors() {
      try {
        const response = await fetch('/api/generateColors', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ brandColor: customBrandColor, accentColor: customAccentColor }),
        });

        if (!response.ok) {
          throw new Error('Failed to update colors');
        }

        const data = await response.json();

        if (data.scss) {
          setCustomSchema(data.scss);
          const styleElement = document.createElement('style');
          styleElement.textContent = data.scss;
          document.head.appendChild(styleElement);
        } else if (data.error) {
          console.error('Error applying custom colors:', data.error);
        }

      } catch (error) {
        console.error('Error updating colors:', error);
      }
    }

    if (customAccentColor || customBrandColor) {
      updateColors();
    } else {
      setCustomSchema(null);
    }
  }, [customAccentColor, customBrandColor]);

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

  const [widgetStyle, setWidgetStyle] = useState<WidgetStyle>({
    brandColor: "blue",
    accentColor: "blue",
    fontFamily: "Arial",
    bubblePosition: BubblePosition.End,
    widgetWidth: 25,
    widgetHeight: 25,
  });

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

      {/* Main Content */}
      <Row gap="xl" mobileDirection="column" horizontal="center">

        {/* Widget Configurator */}
        <Column gap="s" horizontal="center">
          <Heading as="h3" variant="body-default-l">Configure Chat Widget</Heading>

          <Column border="neutral-alpha-strong" padding="xs" gap="s" radius="s" fillWidth maxWidth={25}>
            {/* Brand Color */}
            <Column key="brand" gap="xs" radius="s">
              <Text>Brand</Text>
              <Scroller
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
              </Scroller>
              <ColorInput
                id="brand-color"
                label="Custom brand color"
                value={widgetStyle.brandColor}
                onChange={(newColor) => handleWidgetStyle(newColor.target.value, WidgetStyleType.brandColor, true)} />
            </Column>
            {/* Accent Color */}
            <Column key="accent" gap="xs" fillWidth radius="s">
              <Text>Accent</Text>
              <Scroller
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
              </Scroller>
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
                    const value = isNaN(Number(width.target.value))
                      ? (width.target.value as SpacingToken)
                      : Number(width.target.value);
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
                    const value = isNaN(Number(height.target.value))
                      ? (height.target.value as SpacingToken)
                      : Number(height.target.value);
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

          </Column>
        </Column>

        {/* Widget Preview */}
        <Column horizontal="center" gap="s" maxWidth={"xl"}>
          <Heading as="h3" variant="body-default-l">Preview</Heading>
          <WebChat
            key={`${widgetStyle.brandColor}-${widgetStyle.accentColor}-${widgetStyle.fontFamily}`}
            brandColor={widgetStyle.brandColor}
            accentColor={widgetStyle.accentColor}
            fontFamily={widgetStyle.fontFamily}
            bubblePosition={widgetStyle.bubblePosition}
            widgetWidth={widgetStyle.widgetWidth}
            widgetHeight={widgetStyle.widgetHeight}
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
     ${customSchema ? `<style>\n      ${customSchema}\n    </style>\n` : ''}
  </head>
  <body>
    <div id="webchat-container"></div>
    <script>
      document.addEventListener('DOMContentLoaded', function() {
        if (window.renderWebchat && typeof window.renderWebchat.renderWebchat === 'function') {
          window.renderWebchat.renderWebchat('webchat-container', {
            brandColor: '${customBrandColor ? 'custom' : widgetStyle.brandColor}',
            accentColor: '${customAccentColor ? 'custom' : widgetStyle.accentColor}',
            fontFamily: '${widgetStyle.fontFamily}',
            bubblePosition: '${widgetStyle.bubblePosition}',
            widgetWidth: '${widgetStyle.widgetWidth}',
            widgetHeight: '${widgetStyle.widgetHeight}',
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
