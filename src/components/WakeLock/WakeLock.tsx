import { Box, Button, Indicator, rem } from '@mantine/core';
import { IconCoffee, IconCoffeeOff } from '@tabler/icons-react';
import { useContext } from 'react';
import { notifications } from '@mantine/notifications';
import { useMatch } from 'react-router-dom';

import { WakeContext } from '@/context/WakeContext';

const notificationOff = {
  id: 'screenwakeoff',
  title: 'Screen Wake: Off',
  message: 'Your phone can go to sleep 😴',
  color: 'gray',
  icon: <IconCoffeeOff size={20} />,
};

const notificationOn = {
  id: 'screenwakeon',
  title: 'Screen Wake: On',
  message: 'Your phone will stay awake when developing ☕',
  color: 'blue',
  icon: <IconCoffee size={20} />,
};

export function WakeLock() {
  const { isEnabled, isSupported, isAuto, setIsAuto, releaseLock } = useContext(WakeContext);

  const routeMatch = useMatch('/timer');

  function handleChange() {
    if (isAuto) {
      notifications.show(notificationOff);
      releaseLock(false);
      setIsAuto(false);
    } else {
      notifications.show(notificationOn);
      setIsAuto(true);
    }
  }

  return (
    routeMatch && (
      <Button
        size="compact-md"
        variant="default"
        disabled={!isSupported}
        onClick={handleChange}
        h={28}
      >
        <Indicator
          position="middle-start"
          offset={3}
          size={5}
          color={isEnabled ? 'green' : 'gray'}
          processing={isEnabled}
        >
          <Box pl="xs">
            {isAuto ? (
              <IconCoffee style={{ width: rem(20), height: rem(20) }} stroke={1.5} />
            ) : (
              <IconCoffeeOff style={{ width: rem(20), height: rem(20) }} stroke={1.5} />
            )}
          </Box>
        </Indicator>
      </Button>
    )
  );
}
