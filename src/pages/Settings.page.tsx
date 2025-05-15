import { Button, Center, rem, Stack, Title } from '@mantine/core';

import { ScrollableView } from '@/components/ScrollableView/ScrollableView';

export function SettingsPage() {
  return (
    <ScrollableView>
      <Center>
        <Stack align="left" mt="md" maw="90vw" w={rem(450)}>
          <Title>Settings</Title>
          <Button
            onClick={() => {
              window.location.reload();
            }}
            variant="outline"
          >
            Install latest version
          </Button>
        </Stack>
      </Center>
    </ScrollableView>
  );
}
