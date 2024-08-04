import { Switch } from '@mantine/core';
import { useState, useRef, useEffect } from 'react';

export interface DevelopingProcess {
  steps: Array<{
    name: string;
    step_minutes: number;
    chime_seconds: number | '';
    key: string;
  }>;
}

export function WakeLock() {
  const wakeLock = useRef<WakeLockSentinel | null>(null);
  const [supported, setSupported] = useState(false);
  const [checked, setChecked] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function aquireLock() {
    try {
      wakeLock.current = await navigator.wakeLock.request('screen');
      setError(null);
      wakeLock.current.addEventListener('release', () => {
        // the wake lock has been released
        if (checked) {
          setError('Wake Lock has been released');
          setChecked(false);
        }
      });
    } catch (err: any) {
      setError(`${err.name}, ${err.message}`);
      setChecked(false);
    }
  }

  document.addEventListener('visibilitychange', async () => {
    if (wakeLock !== null && document.visibilityState === 'visible') {
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
      setChecked(true);
    } else {
      setSupported(false);
    }
  }, []);

  return (
    <>
      <Switch
        defaultChecked
        checked={checked}
        label="Wake lock"
        disabled={!supported}
        onChange={(event) => setChecked(event.currentTarget.checked)}
        error={error}
      />
    </>
  );
}
