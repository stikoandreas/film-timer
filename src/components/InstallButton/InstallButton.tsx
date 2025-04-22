import { ActionIcon, Button, Group, List, Modal, Space, Text, ThemeIcon } from '@mantine/core';
import { useDisclosure, useMediaQuery, useOs } from '@mantine/hooks';
import { IconApps, IconShare2, IconSquarePlus } from '@tabler/icons-react';

export function InstallButton() {
  const [opened, { open, close }] = useDisclosure(false);

  const os = useOs();
  const matches = useMediaQuery('(display-mode: standalone)');

  return (
    <>
      {os === 'ios' && !matches && (
        <>
          <Modal opened={opened} onClose={close} title="Install Film Timer">
            <Text>Film Timer is available as a home screen application!</Text>
            <Space h="md" />
            <Text>How to install:</Text>
            <Space h="xs" />
            <List type="ordered" withPadding>
              <List.Item>
                <Group gap={6}>
                  <Text>Click the share button</Text>
                  <ThemeIcon variant="light" color="gray">
                    <IconShare2 style={{ width: '75%', height: '75%' }} />
                  </ThemeIcon>
                </Group>
              </List.Item>
              <List.Item>
                <Group gap={6}>
                  <Text>Click "Add to Home Screen"</Text>
                  <ThemeIcon variant="light" color="gray">
                    <IconSquarePlus style={{ width: '75%', height: '75%' }} />
                  </ThemeIcon>
                </Group>
              </List.Item>
            </List>
            <Space h="md" />
            <Button variant="default" fullWidth onClick={close}>
              Close
            </Button>
          </Modal>
          <ActionIcon onClick={open} variant="default">
            <IconApps style={{ width: '80%', height: '80%' }} stroke={1.5} />
          </ActionIcon>
        </>
      )}
    </>
  );
}
