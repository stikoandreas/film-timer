import { Button, Center, rem, Stack, Switch, Text } from '@mantine/core';
import { useLocalStorage, useMediaQuery, useOs } from '@mantine/hooks';

import { ScrollableView } from '@/components/ScrollableView/ScrollableView';
import { useTitle } from '@/context/TitleContext';
import { InstallButton } from '@/components/InstallButton/InstallButton';

export function SettingsPage() {
  const [quickEdit, setQuickEdit] = useLocalStorage({
    key: 'quickEdit',
    defaultValue: false,
  });

  const [customRecipes, setCustomRecipes] = useLocalStorage({
    key: 'customRecipes',
    defaultValue: [],
    getInitialValueInEffect: true,
  });

  useTitle('Settings');

  const matches = useMediaQuery('(display-mode: standalone)');
  const os = useOs();

  return (
    <ScrollableView>
      <Center>
        <Stack align="left" mt="xs" maw="90vw" w={rem(450)}>
          {matches ? (
            <Button
              onClick={() => {
                window.location.reload();
              }}
              variant="outline"
            >
              Install latest version
            </Button>
          ) : os === 'ios' ? (
            <InstallButton>
              <Button style={{ cursor: 'pointer' }} size="md" fullWidth>
                Install to Home Screen
              </Button>
            </InstallButton>
          ) : null}
          <Switch
            label="Quick Edit"
            checked={quickEdit}
            onChange={(event) => setQuickEdit(event.currentTarget.checked)}
            description="Enables you to edit step durations directly from the recipe view."
            mt="md"
            size="md"
          />
          <Text size="sm">You have {customRecipes.length} custom recipes.</Text>
          <Button
            onClick={() => {
              setCustomRecipes([]);
            }}
            variant="outline"
          >
            Clear local recipes
          </Button>
        </Stack>
      </Center>
    </ScrollableView>
  );
}
