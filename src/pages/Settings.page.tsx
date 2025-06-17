import { Button, Center, Checkbox, rem, Stack, Switch, Title } from '@mantine/core';

import { ScrollableView } from '@/components/ScrollableView/ScrollableView';
import { useLocalStorage } from '@mantine/hooks';

export function SettingsPage() {
  const [quickEdit, setQuickEdit] = useLocalStorage({
    key: 'quickEdit',
    defaultValue: false,
  });

  return (
    <ScrollableView>
      <Center>
        <Stack align="left" mt="xs" maw="90vw" w={rem(450)}>
          <Title>Settings</Title>
          <Button
            onClick={() => {
              window.location.reload();
            }}
            variant="outline"
          >
            Install latest version
          </Button>
          <Switch
            label="Quick Edit"
            checked={quickEdit}
            onChange={(event) => setQuickEdit(event.currentTarget.checked)}
            description="Enables you to edit step durations directly from the recipe view."
            mt="md"
            size="md"
          />
        </Stack>
      </Center>
    </ScrollableView>
  );
}
