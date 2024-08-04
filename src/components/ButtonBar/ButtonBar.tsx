import { Group } from '@mantine/core';
import { WakeLock } from '@/components/WakeLock/WakeLock';
import { DebugButton } from '@/components/DebugButton/DebugButton';
import { ColorSchemeButton } from '../ColorSchemeButton/ColorSchemeButton';

export function ButtonBar() {
  return (
    <>
      <Group gap="xs" justify="right" p="xs">
        <ColorSchemeButton />
        <DebugButton />
        <WakeLock />
      </Group>
    </>
  );
}
