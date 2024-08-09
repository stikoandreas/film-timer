import { Outlet } from 'react-router-dom';
import { AppShell } from '@mantine/core';
import { MobileFooter } from './components/MobileFooter/MobileFooter';

import { DebugContextProvider } from '@/context/DebugContext';
import { ButtonBar } from '@/components/ButtonBar/ButtonBar';

import classes from './Root.module.css';
import { Navbar } from './components/Navbar/Navbar';

export function Root() {
  return (
    <>
      <DebugContextProvider>
        <AppShell
          header={{ height: 50 }}
          navbar={{
            width: 50,
            breakpoint: 'sm',
          }}
          footer={{
            height: 50,
          }}
          className={classes.shell}
        >
          <AppShell.Header className={classes.header}>
            <ButtonBar />
          </AppShell.Header>
          <AppShell.Navbar visibleFrom="sm">
            <Navbar />
          </AppShell.Navbar>
          <AppShell.Main>
            <Outlet />
          </AppShell.Main>
          <AppShell.Footer className={classes.footer} hiddenFrom="sm">
            <MobileFooter />
          </AppShell.Footer>
        </AppShell>
      </DebugContextProvider>
    </>
  );
}
