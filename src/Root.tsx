import { Outlet, useLocation } from 'react-router-dom';
import { AppShell } from '@mantine/core';
import { MobileFooter } from './components/MobileFooter/MobileFooter';

import { DebugContextProvider } from '@/context/DebugContext';
import { ButtonBar } from '@/components/ButtonBar/ButtonBar';

import classes from './Root.module.css';
import { Navbar } from './components/Navbar/Navbar';
import { WakeContextProvider } from './context/WakeContext';
import { useState } from 'react';

export function Root() {
  const [title, setTitle] = useState<string | undefined>(undefined);
  const { pathname } = useLocation();
  return (
    <>
      <DebugContextProvider>
        <WakeContextProvider>
          <AppShell
            header={{ height: 50 }}
            navbar={{
              width: 50,
              breakpoint: 'sm',
              collapsed: { mobile: true },
            }}
            footer={{
              height: 65,
            }}
            className={classes.shell}
          >
            <AppShell.Header className={classes.header}>
              <ButtonBar title={title} />
            </AppShell.Header>
            <AppShell.Navbar visibleFrom="sm" className={classes.navbar}>
              <Navbar />
            </AppShell.Navbar>
            <div className={classes.main}>
              <Outlet context={{ title, setTitle }} />
            </div>
            {pathname !== '/timer' && (
              <AppShell.Footer className={classes.footer} hiddenFrom="sm">
                <MobileFooter />
              </AppShell.Footer>
            )}
          </AppShell>
        </WakeContextProvider>
      </DebugContextProvider>
    </>
  );
}
