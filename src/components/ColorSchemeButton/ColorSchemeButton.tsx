import { ActionIcon, useMantineColorScheme } from '@mantine/core';
import { IconMoon, IconSunLow } from '@tabler/icons-react';

export function ColorSchemeButton() {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  return (
    <>
      <ActionIcon onClick={toggleColorScheme} variant="default">
        {colorScheme === 'light' ? (
          <IconSunLow style={{ width: '80%', height: '80%' }} stroke={1.5} />
        ) : (
          <IconMoon style={{ width: '80%', height: '80%' }} stroke={1.5} />
        )}
      </ActionIcon>
    </>
  );
}
