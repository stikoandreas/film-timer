import { Group, Text, Title } from '@mantine/core';
import { WakeLock } from '@/components/WakeLock/WakeLock';
import { ColorSchemeButton } from '../ColorSchemeButton/ColorSchemeButton';
import { InstallButton } from '../InstallButton/InstallButton';

export function ButtonBar({ title }: { title?: string }) {
  return (
    <>
      <Group justify="space-between" pl="md" wrap="nowrap">
        <Title order={2}>
          {title ? (
            <Group gap={0} align="center" wrap="nowrap">
              <Text
                inherit
                component="span"
                fw={500}
                style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
              >
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
        <Group gap="xs" justify="right" p="xs" wrap="nowrap">
          <InstallButton />
          <ColorSchemeButton />
          <WakeLock />
        </Group>
      </Group>
    </>
  );
}
