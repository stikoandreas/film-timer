import { Outlet } from 'react-router-dom';
import { AppShell } from '@mantine/core';
import { MobileFooter } from './components/MobileFooter/MobileFooter';

import { DebugContextProvider } from '@/context/DebugContext';
import { ButtonBar } from '@/components/ButtonBar/ButtonBar';

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
