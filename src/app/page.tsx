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

enum BubblePosition {
  Start = "start",
  End = "end"
}

enum WidgetStyleType {
  brandColor = "brandColor",
  accentColor = "accentColor",
  fontFamily = "fontFamily",
  bubblePosition = BubblePosition.Start
}


export default function Home() {
  const [customAccentColor, setCustomAccentColor] = useState<string | null>(null);
  const [customBrandColor, setCustomBrandColor] = useState<string | null>(null);


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
        console.log(data.message);
      } catch (error) {
        console.error('Error updating colors:', error);
      }
    }

    if (customAccentColor || customBrandColor) {
      updateColors();
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
    brandColor: "#ffffff",
    accentColor: "#000000",
    fontFamily: "Arial",
    bubblePosition: BubblePosition.Start
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
    <Column fillWidth paddingY="s" paddingX="s" horizontal="center" flex={1} gap="s">
      <Row gap="m" horizontal="space-between">
        <ThemeSwitcher center />
        <Flex fillWidth radius="s">
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
        </Flex>
      </Row>
      <Heading>Fonki Chat Builder</Heading>
      <Row gap="2" mobileDirection="column">
        {/* Widget Configurator */}
        <Column horizontal="center" gap="xs">
          <Heading as="h3" variant="body-default-l">Configure Chat Widget</Heading>
          <Column border="neutral-alpha-strong" padding="xs" gap="s" radius="s" maxWidth={25} fitHeight>
            <Column key="brand" gap="xs" fillWidth radius="s">
              <Text>Brand</Text>
              <Scroller
                direction="row"
                maxHeight={12}
                fillWidth={true}
                gap="xs"
              >
                <Flex key="blue" paddingRight="xs">
                  <IconButton tooltip="blue" tooltipPosition="bottom" size="m" variant="ghost" icon="" style={{ background: "var(--scheme-blue-500)", borderColor: "var(--scheme-blue-700)" }} onClick={() => { handleWidgetStyle("blue", WidgetStyleType.brandColor) }}></IconButton>
                </Flex>

                <Flex key="indigo" paddingRight="xs">
                  <IconButton size="m" variant="ghost" icon="" style={{ background: "var(--scheme-indigo-500)", borderColor: "var(--scheme-indigo-700)" }} onClick={() => { handleWidgetStyle("indigo", WidgetStyleType.brandColor) }}></IconButton>
                </Flex>

                <Flex key="violet" paddingRight="xs">
                  <IconButton size="m" variant="ghost" icon="" style={{ background: "var(--scheme-violet-500)", borderColor: "var(--scheme-violet-700)" }} onClick={() => { handleWidgetStyle("violet", WidgetStyleType.brandColor) }}></IconButton>
                </Flex>

                <Flex key="magenta" paddingRight="xs">
                  <IconButton size="m" variant="ghost" icon="" style={{ background: "var(--scheme-magenta-500)", borderColor: "var(--scheme-magenta-700)" }} onClick={() => { handleWidgetStyle("magenta", WidgetStyleType.brandColor) }}></IconButton>
                </Flex>

                <Flex key="pink" paddingRight="xs">
                  <IconButton size="m" variant="ghost" icon="" style={{ background: "var(--scheme-pink-500)", borderColor: "var(--scheme-pink-700)" }} onClick={() => { handleWidgetStyle("pink", WidgetStyleType.brandColor) }}></IconButton>
                </Flex>

                <Flex key="red" paddingRight="xs">
                  <IconButton size="m" variant="ghost" icon="" style={{ background: "var(--scheme-red-500)", borderColor: "var(--scheme-red-700)" }} onClick={() => { handleWidgetStyle("red", WidgetStyleType.brandColor) }}></IconButton>
                </Flex>

                <Flex key="orange" paddingRight="xs">
                  <IconButton size="m" variant="ghost" icon="" style={{ background: "var(--scheme-orange-500)", borderColor: "var(--scheme-orange-700)" }} onClick={() => { handleWidgetStyle("orange", WidgetStyleType.brandColor) }}></IconButton>
                </Flex>

                <Flex key="yellow" paddingRight="xs">
                  <IconButton size="m" variant="ghost" icon="" style={{ background: "var(--scheme-yellow-500)", borderColor: "var(--scheme-yellow-700)" }} onClick={() => { handleWidgetStyle("yellow", WidgetStyleType.brandColor) }}></IconButton>
                </Flex>

                <Flex key="moss" paddingRight="xs">
                  <IconButton size="m" variant="ghost" icon="" style={{ background: "var(--scheme-moss-500)", borderColor: "var(--scheme-moss-700)" }} onClick={() => { handleWidgetStyle("moss", WidgetStyleType.brandColor) }}></IconButton>
                </Flex>

                <Flex key="green" paddingRight="xs">
                  <IconButton size="m" variant="ghost" icon="" style={{ background: "var(--scheme-green-500)", borderColor: "var(--scheme-green-700)" }} onClick={() => { handleWidgetStyle("green", WidgetStyleType.brandColor) }}></IconButton>
                </Flex>

                <Flex key="emerald" paddingRight="xs">
                  <IconButton size="m" variant="ghost" icon="" style={{ background: "var(--scheme-emerald-500)", borderColor: "var(--scheme-emerald-700)" }} onClick={() => { handleWidgetStyle("emerald", WidgetStyleType.brandColor) }}></IconButton>
                </Flex>

                <Flex key="aqua" paddingRight="xs">
                  <IconButton size="m" variant="ghost" icon="" style={{ background: "var(--scheme-aqua-500)", borderColor: "var(--scheme-aqua-700)" }} onClick={() => { handleWidgetStyle("aqua", WidgetStyleType.brandColor) }}></IconButton>
                </Flex>

                <Flex key="cyan" paddingRight="xs">
                  <IconButton size="m" variant="ghost" icon="" style={{ background: "var(--scheme-cyan-500)", borderColor: "var(--scheme-cyan-700)" }} onClick={() => { handleWidgetStyle("cyan", WidgetStyleType.brandColor) }}></IconButton>
                </Flex>
              </Scroller>
              <ColorInput
                id="brand-color"
                label="Custom brand color"
                value={widgetStyle.brandColor}
                onChange={(newColor) => handleWidgetStyle(newColor.target.value, WidgetStyleType.brandColor, true)}
              />
            </Column>
            <Column key="accent" gap="xs" fillWidth radius="s">
              <Text>Accent</Text>
              <Scroller
                direction="row"
                maxHeight={12}
                fillWidth={true}
                gap="xs"
              >
                <Flex key="blue1" paddingRight="xs">
                  <IconButton
                    size="m"
                    variant="ghost"
                    icon=""
                    style={{ background: "var(--scheme-blue-500)", borderColor: "var(--scheme-blue-700)" }}
                    onClick={() => handleWidgetStyle("blue", WidgetStyleType.accentColor)}
                  />
                </Flex>

                <Flex key="indigo1" paddingRight="xs">
                  <IconButton
                    size="m"
                    variant="ghost"
                    icon=""
                    style={{ background: "var(--scheme-indigo-500)", borderColor: "var(--scheme-indigo-700)" }}
                    onClick={() => handleWidgetStyle("indigo", WidgetStyleType.accentColor)}
                  />
                </Flex>

                <Flex key="violet1" paddingRight="xs">
                  <IconButton
                    size="m"
                    variant="ghost"
                    icon=""
                    style={{ background: "var(--scheme-violet-500)", borderColor: "var(--scheme-violet-700)" }}
                    onClick={() => handleWidgetStyle("violet", WidgetStyleType.accentColor)}
                  />
                </Flex>

                <Flex key="magenta1" paddingRight="xs">
                  <IconButton
                    size="m"
                    variant="ghost"
                    icon=""
                    style={{ background: "var(--scheme-magenta-500)", borderColor: "var(--scheme-magenta-700)" }}
                    onClick={() => handleWidgetStyle("magenta", WidgetStyleType.accentColor)}
                  />
                </Flex>

                <Flex key="pink1" paddingRight="xs">
                  <IconButton
                    size="m"
                    variant="ghost"
                    icon=""
                    style={{ background: "var(--scheme-pink-500)", borderColor: "var(--scheme-pink-700)" }}
                    onClick={() => handleWidgetStyle("pink", WidgetStyleType.accentColor)}
                  />
                </Flex>

                <Flex key="red1" paddingRight="xs">
                  <IconButton
                    size="m"
                    variant="ghost"
                    icon=""
                    style={{ background: "var(--scheme-red-500)", borderColor: "var(--scheme-red-700)" }}
                    onClick={() => handleWidgetStyle("red", WidgetStyleType.accentColor)}
                  />
                </Flex>

                <Flex key="orange1" paddingRight="xs">
                  <IconButton
                    size="m"
                    variant="ghost"
                    icon=""
                    style={{ background: "var(--scheme-orange-500)", borderColor: "var(--scheme-orange-700)" }}
                    onClick={() => handleWidgetStyle("orange", WidgetStyleType.accentColor)}
                  />
                </Flex>

                <Flex key="yellow1" paddingRight="xs">
                  <IconButton
                    size="m"
                    variant="ghost"
                    icon=""
                    style={{ background: "var(--scheme-yellow-500)", borderColor: "var(--scheme-yellow-700)" }}
                    onClick={() => handleWidgetStyle("yellow", WidgetStyleType.accentColor)}
                  />
                </Flex>

                <Flex key="moss1" paddingRight="xs">
                  <IconButton
                    size="m"
                    variant="ghost"
                    icon=""
                    style={{ background: "var(--scheme-moss-500)", borderColor: "var(--scheme-moss-700)" }}
                    onClick={() => handleWidgetStyle("moss", WidgetStyleType.accentColor)}
                  />
                </Flex>

                <Flex key="green1" paddingRight="xs">
                  <IconButton
                    size="m"
                    variant="ghost"
                    icon=""
                    style={{ background: "var(--scheme-green-500)", borderColor: "var(--scheme-green-700)" }}
                    onClick={() => handleWidgetStyle("green", WidgetStyleType.accentColor)}
                  />
                </Flex>

                <Flex key="emerald1" paddingRight="xs">
                  <IconButton
                    size="m"
                    variant="ghost"
                    icon=""
                    style={{ background: "var(--scheme-emerald-500)", borderColor: "var(--scheme-emerald-700)" }}
                    onClick={() => handleWidgetStyle("emerald", WidgetStyleType.accentColor)}
                  />
                </Flex>

                <Flex key="aqua1" paddingRight="xs">
                  <IconButton
                    size="m"
                    variant="ghost"
                    icon=""
                    style={{ background: "var(--scheme-aqua-500)", borderColor: "var(--scheme-aqua-700)" }}
                    onClick={() => handleWidgetStyle("aqua", WidgetStyleType.accentColor)}
                  />
                </Flex>

                <Flex key="cyan1" paddingRight="xs">
                  <IconButton
                    size="m"
                    variant="ghost"
                    icon=""
                    style={{ background: "var(--scheme-cyan-500)", borderColor: "var(--scheme-cyan-700)" }}
                    onClick={() => handleWidgetStyle("cyan", WidgetStyleType.accentColor)}
                  />
                </Flex>
              </Scroller>
              <ColorInput
                id="accent-color"
                label="Custom accent color"
                value={widgetStyle.accentColor}
                onChange={(newColor) => handleWidgetStyle(newColor.target.value, WidgetStyleType.accentColor, true)}
              />
            </Column>
            <Column key="font-family" gap="xs" fillWidth radius="s">
              <Text>Font Family</Text>
              <Input id="font-family" label="Enter the font family" labelAsPlaceholder={true} value={widgetStyle.fontFamily} onChange={(font) => setWidgetStyle({ ...widgetStyle, fontFamily: font.target.value })}></Input>
            </Column>

            <Column fillWidth vertical="stretch" gap="xs">
              <Text>Bubble Position</Text>
              <Row fillWidth>
                <ToggleButton variant="outline" prefixIcon="chevronLeft" radius="left" weight="default" onClick={() => setWidgetStyle({ ...widgetStyle, bubblePosition: 'start' })} fillWidth>Left</ToggleButton>
                <ToggleButton variant="outline" suffixIcon="chevronRight" radius="right" weight="default" onClick={() => setWidgetStyle({ ...widgetStyle, bubblePosition: 'end' })} fillWidth aria-controls="panel-dark">Right</ToggleButton>
              </Row>
            </Column>
          </Column>
        </Column>

        {/* Widget Preview */}
        <Column horizontal="center" width="xs" gap="s" radius="s">
          <Heading as="h3" variant="body-default-l">Preview</Heading>
          <WebChat
            key={`${widgetStyle.brandColor}-${widgetStyle.accentColor}-${widgetStyle.fontFamily}`}
            brandColor={widgetStyle.brandColor}
            accentColor={widgetStyle.accentColor}
            fontFamily={widgetStyle.fontFamily}
            bubblePosition={widgetStyle.bubblePosition}
            msgs={messages}
          />
        </Column>

        {/* Code snippet */}
        <Column horizontal="center" data-border="rounded" gap="s" radius="s" width="xs">
          <Heading as="h3" variant="body-default-l">
            Copy the code and paste it in your website
          </Heading>
          <CodeBlock
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
            brandColor: '${customBrandColor ? 'custom' : widgetStyle.brandColor}',
            accentColor: '${customAccentColor ? 'custom' : widgetStyle.accentColor}',
            fontFamily: '${widgetStyle.fontFamily}',
            bubblePosition: '${widgetStyle.bubblePosition}',
          });
        } else {
          console.error('renderWebchat or renderWebchat.renderWebchat is undefined');
        }
      });
    </script>
  </body>
</html>`,
                label: 'HTML',
                language: 'html',
              },
            ]}
            copyButton={true}
            compact={false}
            textSize="xs"
          />
        </Column>

      </Row >
    </Column >

  );
}
