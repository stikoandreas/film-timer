import { Group } from '@mantine/core';
import { WakeLock } from '@/components/WakeLock/WakeLock';
import { DebugButton } from '@/components/DebugButton/DebugButton';

export function ButtonBar() {
  return (
    <>
      <Group gap="xs" justify="right" p="xs">
        <DebugButton />
        <WakeLock />
      </Group>
    </>
  );
}
