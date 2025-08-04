import { Button, Center, rem, Stack, Switch, Title } from '@mantine/core';
import { useLocalStorage } from '@mantine/hooks';

import { ScrollableView } from '@/components/ScrollableView/ScrollableView';
import { useTitle } from '@/context/TitleContext';

export function SettingsPage() {
  const [quickEdit, setQuickEdit] = useLocalStorage({
    key: 'quickEdit',
    defaultValue: false,
  });

  useTitle('Settings');

  return (
    <ScrollableView>
      <Center>
        <Stack align="left" mt="xs" maw="90vw" w={rem(450)}>
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
