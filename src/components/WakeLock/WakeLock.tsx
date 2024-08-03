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

  async function aquireLock() {
    wakeLock.current = await navigator.wakeLock.request('screen');
  }

  async function releaseLock() {
    if (wakeLock.current) {
      wakeLock.current.release();
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
    <Switch
      defaultChecked
      label="Wake lock"
      disabled={!supported}
      onChange={(event) => setChecked(event.currentTarget.checked)}
    />
  );
}
