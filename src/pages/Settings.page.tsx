import {
  Button,
  Center,
  Divider,
  Group,
  rem,
  Stack,
  Switch,
  Text,
  useMantineColorScheme,
} from '@mantine/core';
import { useLocalStorage, useMediaQuery, useOs } from '@mantine/hooks';
import { useContext } from 'react';

import { ScrollableView } from '@/components/ScrollableView/ScrollableView';
import { useTitle } from '@/context/TitleContext';
import { InstallButton } from '@/components/InstallButton/InstallButton';
import { WakeContext } from '@/context/WakeContext';
import { AppIcon } from '@/components/AppIcon/AppIcon';

export function SettingsPage() {
  useTitle('Settings');

  const [quickEdit, setQuickEdit] = useLocalStorage({
    key: 'quickEdit',
    defaultValue: false,
  });

  const [customRecipes, setCustomRecipes] = useLocalStorage({
    key: 'customRecipes',
    defaultValue: [],
    getInitialValueInEffect: true,
  });

  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  const matches = useMediaQuery('(display-mode: standalone)');
  const os = useOs();

  const { isSupported, isAuto, setIsAuto } = useContext(WakeContext);

  return (
    <ScrollableView>
      <Center>
        <Stack align="left" mt="xs" maw="90vw" w={rem(450)}>
          {matches ? (
            <>
              <Button
                onClick={() => {
                  window.location.reload();
                }}
                variant="outline"
              >
                Install latest version
              </Button>
              <Divider />
            </>
          ) : os === 'ios' ? (
            <>
              <Group wrap="nowrap">
                <AppIcon size={64} />
                <Text size="sm">Film Timer is available as a home screen application for iOS!</Text>
              </Group>
              <InstallButton>
                <Button style={{ cursor: 'pointer' }} fullWidth>
                  Install to Home Screen
                </Button>
              </InstallButton>
              <Divider />
            </>
          ) : null}

          <Switch
            label="Quick Edit"
            checked={quickEdit}
            onChange={(event) => setQuickEdit(event.currentTarget.checked)}
            description="Enables you to edit step durations directly from the recipe view."
            mt="sm"
            size="sm"
          />
          <Switch
            label="Dark Mode"
            checked={colorScheme === 'dark'}
            onChange={() => toggleColorScheme()}
            description="Choose between light and dark theme."
            mt="sm"
            size="sm"
          />
          <Switch
            label="Keep Screen Awake"
            checked={isAuto}
            onChange={() => setIsAuto(!isAuto)}
            description={
              isSupported
                ? 'Keep the screen awake while using the timer.'
                : 'Not supported on this device.'
            }
            mt="sm"
            size="sm"
            disabled={!isSupported}
          />
          <Divider />
          <Text size="sm">You have {customRecipes.length} custom recipes.</Text>
          <Button
            onClick={() => {
              setCustomRecipes([]);
            }}
            variant="outline"
            color="red"
          >
            Clear local recipes
          </Button>
          <Divider />
          <Button
            onClick={() => {
              localStorage.clear();
              window.location.reload();
            }}
            variant="outline"
            color="red"
          >
            Reset all settings
          </Button>
        </Stack>
      </Center>
    </ScrollableView>
  );
}
