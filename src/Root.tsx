import { DebugContextProvider } from '@/context/DebugContext';
import { ButtonBar } from '@/components/ButtonBar/ButtonBar';
import { Outlet } from 'react-router-dom';
import { AppShell, Group } from '@mantine/core';
import { IconAlarm, IconFlask } from '@tabler/icons-react';
import { MobileFooter } from './components/MobileFooter/MobileFooter';

export function Root() {
  return (
    <>
      <DebugContextProvider>
        <AppShell header={{ height: 50 }}>
          <AppShell.Header>
            <ButtonBar />
          </AppShell.Header>
          <AppShell.Main>
            <Outlet />
          </AppShell.Main>
          <AppShell.Footer>
            <MobileFooter />
          </AppShell.Footer>
        </AppShell>
      </DebugContextProvider>
    </>
  );
}
