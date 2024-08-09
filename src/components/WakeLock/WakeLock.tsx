import { ActionIcon } from '@mantine/core';
import { IconCoffee, IconCoffeeOff } from '@tabler/icons-react';
import { useState, useRef, useEffect } from 'react';

import { notifications } from '@mantine/notifications';

export interface DevelopingProcess {
  steps: Array<{
    name: string;
    step_minutes: number;
    chime_seconds: number | '';
    key: string;
  }>;
}

const notificationOff = {
  title: 'Screen Wake: Off',
  message: 'Your phone can go to sleep 😴',
  color: 'gray',
  icon: <IconCoffeeOff size={20} />,
};

const notificationOn = {
  title: 'Screen Wake: On',
  message: 'Your phone will stay awake ☕',
  color: 'blue',
  icon: <IconCoffee size={20} />,
};

export function WakeLock() {
  const wakeLock = useRef<WakeLockSentinel | null>(null);
  const [supported, setSupported] = useState(false);
  const [checked, setChecked] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function aquireLock() {
    try {
      wakeLock.current = await navigator.wakeLock.request('screen');
      setError(null);
    } catch (err: any) {
      notifications.show(notificationOff);
      setChecked(false);
    }
  }

  document.addEventListener('visibilitychange', async () => {
    if (supported && wakeLock !== null && document.visibilityState === 'visible') {
      aquireLock();
    }
  });

  async function releaseLock() {
    if (wakeLock.current) {
      await wakeLock.current.release();
      wakeLock.current = null;
    }
  }

  useEffect(() => {
    if (checked) {
      aquireLock();
    } else {
      releaseLock();
    }
  }, [checked]);

  useEffect(() => {
    if ('wakeLock' in navigator) {
      setSupported(true);
      //setChecked(true);
    } else {
      setSupported(false);
    }
  }, []);

  function handleChange() {
    if (checked) {
      notifications.show(notificationOff);
    } else {
      notifications.show(notificationOn);
    }

    setChecked(!checked);
  }

  return (
    <>
      <ActionIcon variant="default" disabled={!supported} onClick={handleChange}>
        {checked ? (
          <IconCoffee style={{ width: '80%', height: '80%' }} stroke={1.5} />
        ) : (
          <IconCoffeeOff style={{ width: '80%', height: '80%' }} stroke={1.5} />
        )}
      </ActionIcon>
      {error && error}
    </>
  );
}
