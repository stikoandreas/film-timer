import {
  ActionIcon,
  Affix,
  Button,
  Center,
  Group,
  List,
  Modal,
  Space,
  Text,
  ThemeIcon,
  Tooltip,
  Transition,
} from '@mantine/core';
import { useDisclosure, useMediaQuery, useOs } from '@mantine/hooks';
import { IconApps, IconShare2, IconSquarePlus } from '@tabler/icons-react';
import { AppIcon } from '../AppIcon/AppIcon';

export function InstallButton() {
  const [opened, { open, close }] = useDisclosure(false);

  const os = useOs();
  const matches = useMediaQuery('(display-mode: standalone)');

  return (
    <>
      {os === 'ios' && !matches && (
        <>
          <Modal opened={opened} onClose={close} title="Install Film Timer">
            <Group wrap="nowrap">
              <AppIcon size={40} />
              <Text>Film Timer is available as a home screen application for iOS!</Text>
            </Group>
            <Space h="md" />
            <Text>How to install:</Text>
            <Space h="xs" />
            <List type="ordered" withPadding>
              <List.Item>
                <Group gap={6}>
                  <Text>Click the share button in Safari</Text>
                  <ThemeIcon variant="light" color="gray">
                    <IconShare2 style={{ width: '75%', height: '75%' }} />
                  </ThemeIcon>
                </Group>
              </List.Item>
              <List.Item>
                <Group gap={6}>
                  <Text>Click &ldquo;Add to Home Screen&rdquo;</Text>
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
          <Affix position={{ bottom: 3 }} withinPortal hiddenFrom="sm">
            <Transition transition="slide-up" mounted={opened}>
              {(styles) => (
                <Center w="100dvw" style={styles}>
                  <Tooltip
                    label={
                      <Group gap={3}>
                        <ThemeIcon
                          variant="subtle"
                          color="light-dark(var(--mantine-color-white), var(--mantine-color-black))"
                        >
                          <IconSquarePlus style={{ width: '75%', height: '75%' }} stroke={1.5} />
                        </ThemeIcon>
                        Add to Home Screen
                      </Group>
                    }
                    withArrow
                    arrowSize={8}
                    opened
                    withinPortal={false}
                  >
                    <div />
                  </Tooltip>
                </Center>
              )}
            </Transition>
          </Affix>
        </>
      )}
    </>
  );
}
