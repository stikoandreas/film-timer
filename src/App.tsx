import '@mantine/core/styles.css';
import '@mantine/carousel/styles.css';
import '@mantine/notifications/styles.css';
import { Notifications } from '@mantine/notifications';

import { MantineProvider } from '@mantine/core';
import { Router } from './Router';
import { theme } from './theme';

import classes from './Root.module.css';

export default function App() {
  return (
    <MantineProvider theme={theme}>
      <Notifications position="top-center" autoClose={3000} className={classes.notifications} />
      <Router />
    </MantineProvider>
  );
}
