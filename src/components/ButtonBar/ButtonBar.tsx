import { Group, Text, Title } from '@mantine/core';
import { WakeLock } from '@/components/WakeLock/WakeLock';
import { DebugButton } from '@/components/DebugButton/DebugButton';
import { ColorSchemeButton } from '../ColorSchemeButton/ColorSchemeButton';

export function ButtonBar() {
  return (
    <>
      <Group justify="space-between" pl="xs">
        <Title order={2}>
          <Text
            inherit
            variant="gradient"
            component="span"
            gradient={{ from: 'pink', to: 'yellow' }}
          >
            Film Timer
          </Text>
        </Title>
        <Group gap="xs" justify="right" p="xs">
          <ColorSchemeButton />
          <DebugButton />
          <WakeLock />
        </Group>
      </Group>
    </>
  );
}
