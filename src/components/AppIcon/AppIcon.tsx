import { Box, BoxProps, Center, Image } from '@mantine/core';

import { getSvgPath } from 'figma-squircle';

export function AppIcon({ size = 100, ...props }: { size?: number } & BoxProps) {
  const svgPath = getSvgPath({
    width: 100,
    height: 100,
    cornerRadius: 24, // defaults to 0
    cornerSmoothing: 0.8, // cornerSmoothing goes from 0 to 1
  });

  return (
    <Box h={size} w={size} {...props}>
      <Center
        style={{
          clipPath: `path('${svgPath}')`,
          backgroundColor: '#ffe066',
          transform: size ? `scale(${size / 100})` : undefined,
          transformOrigin: 'top left',
        }}
        h={100}
        w={100}
      >
        <Image
          src={`${import.meta.env.BASE_URL}logo.svg`}
          alt="Logo"
          h={66}
          w="auto"
          fit="contain"
        />
      </Center>
    </Box>
  );
}
