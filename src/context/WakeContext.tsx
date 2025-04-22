import React, { createContext, useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';

interface WakeContextInterface {
  isSupported: boolean;
  isEnabled: boolean;
  isAuto: boolean;
  aquireLock: (soft?: boolean) => void;
  releaseLock: (soft?: boolean) => void;
  setIsAuto: (enabled: boolean) => void;
}

export const WakeContext = createContext<WakeContextInterface>({
  isSupported: false,
  isEnabled: false,
  isAuto: false,
  aquireLock: () => {},
  releaseLock: () => {},
  setIsAuto: () => {},
});

export function WakeContextProvider({ children }: React.PropsWithChildren) {
  const [isSupported, setIsSupported] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);
  const [isAuto, setIsAuto] = useState(true);
  const wakeLock = useRef<WakeLockSentinel | null>(null);

  async function aquireLock(soft = true) {
    if (soft && !isAuto) {
      return;
    }
    if (isSupported) {
      try {
        wakeLock.current = await navigator.wakeLock.request('screen');
        setIsEnabled(true);
      } catch (err: any) {
        setIsEnabled(false);
      }
    }
  }

  async function releaseLock(soft = true) {
    if (soft && !isAuto) {
      return;
    }
    if (wakeLock.current) {
      await wakeLock.current.release();
      wakeLock.current = null;
      setIsEnabled(false);
    }
  }

  document.addEventListener('visibilitychange', async () => {
    if (isSupported && isEnabled && wakeLock !== null && document.visibilityState === 'visible') {
      aquireLock();
    }
  });

  useEffect(() => {
    if ('wakeLock' in navigator) {
      setIsSupported(true);
    } else {
      setIsSupported(false);
    }
  }, []);

  const { pathname } = useLocation();

  useEffect(() => {
    if (isSupported && isAuto) {
      if (pathname.startsWith('/timer') && !isEnabled) {
        aquireLock();
      } else if (!pathname.startsWith('/timer') && isEnabled) {
        releaseLock();
      }
    }
  }, [isAuto, isEnabled, pathname, isSupported]);

  return (
    <WakeContext.Provider
      value={{ isSupported, isEnabled, isAuto, aquireLock, releaseLock, setIsAuto }}
    >
      {children}
    </WakeContext.Provider>
  );
}
