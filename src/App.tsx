import '@mantine/core/styles.css';
import '@mantine/carousel/styles.css';
import '@mantine/notifications/styles.css';

import './global.css';

import { Notifications } from '@mantine/notifications';
import { ModalsProvider } from '@mantine/modals';
import { MantineProvider } from '@mantine/core';

import { Router } from './Router';
import { theme } from './theme';

import classes from './Root.module.css';

export default function App() {
  return (
    <MantineProvider theme={theme}>
      <ModalsProvider>
        <Notifications position="top-center" autoClose={3000} className={classes.notifications} />
        <Router />
      </ModalsProvider>
    </MantineProvider>
  );
}
