import { Outlet } from 'react-router-dom';
import { AppShell } from '@mantine/core';
import { MobileFooter } from './components/MobileFooter/MobileFooter';

import { DebugContextProvider } from '@/context/DebugContext';
import { ButtonBar } from '@/components/ButtonBar/ButtonBar';

import classes from './Root.module.css';

export function Root() {
  return (
    <>
      <DebugContextProvider>
        <AppShell header={{ height: 50 }} className={classes.shell}>
          <AppShell.Header className={classes.header}>
            <ButtonBar />
          </AppShell.Header>
          <AppShell.Main>
            <Outlet />
          </AppShell.Main>
          <AppShell.Footer className={classes.footer}>
            <MobileFooter />
          </AppShell.Footer>
        </AppShell>
      </DebugContextProvider>
    </>
  );
}
