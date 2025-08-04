import { Group, Text, Title } from '@mantine/core';
import { WakeLock } from '@/components/WakeLock/WakeLock';
import { ColorSchemeButton } from '../ColorSchemeButton/ColorSchemeButton';
import { InstallButton } from '../InstallButton/InstallButton';

export function ButtonBar({ title }: { title?: string }) {
  return (
    <>
      <Group justify="space-between" pl="md">
        <Title order={2}>
          {title ? (
            <Group gap={0} align="center">
              <Text inherit component="span" fw={500}>
                {title}
              </Text>
            </Group>
          ) : (
            <Text
              inherit
              variant="gradient"
              component="span"
              gradient={{ from: 'pink', to: 'yellow' }}
            >
              Film Timer
            </Text>
          )}
        </Title>
        <Group gap="xs" justify="right" p="xs">
          <InstallButton />
          <ColorSchemeButton />
          <WakeLock />
        </Group>
      </Group>
    </>
  );
}
