import {
  ActionIcon,
  Affix,
  Box,
  Button,
  Center,
  Group,
  List,
  Modal,
  Space,
  Text,
  ThemeIcon,
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
          <Affix position={{ bottom: 0 }} withinPortal hiddenFrom="sm">
            <Transition transition="slide-up" mounted={opened}>
              {(styles) => (
                <Center w="100dvw" style={styles}>
                  <Box
                    style={{
                      height: '60px',
                      aspectRatio: '2/3',
                      mask: 'conic-gradient(from -30deg at 50% 60%,#0000,#000 1deg 59deg,#0000 60deg) bottom/100% 50% no-repeat, radial-gradient(circle at 50% calc(100% / 3),#000 22% 44%,#0000 44.5%)',
                      background: '#ffe066',
                    }}
                  >
                    <Center c="white">
                      <AppIcon size={40} />
                    </Center>
                  </Box>
                </Center>
              )}
            </Transition>
          </Affix>
        </>
      )}
    </>
  );
}
