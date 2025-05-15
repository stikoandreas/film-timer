import { Link, useLocation } from 'react-router-dom';
import { Group, Stack, Text } from '@mantine/core';
import {
  IconAlarm,
  IconAlarmFilled,
  IconFlask,
  IconFlaskFilled,
  IconList,
  IconSettings,
  IconSettingsFilled,
} from '@tabler/icons-react';
import { randomId, useMediaQuery } from '@mantine/hooks';

import classes from './MobileFooter.module.css';

const links = [
  {
    label: 'Timer',
    icon: <IconAlarm />,
    selectedIcon: <IconAlarmFilled />,
    href: '/',
    key: randomId(),
  },
  {
    label: 'Recipes',
    icon: <IconList />,
    selectedIcon: <IconList strokeWidth={2.5} />,
    href: '/recipes',
    key: randomId(),
  },
  {
    label: 'Volume',
    icon: <IconFlask />,
    selectedIcon: <IconFlaskFilled />,
    href: '/volume',
    key: randomId(),
  },
];

export function MobileFooter() {
  function isActive(link: string) {
    if (link === '/') return pathname === link || pathname.startsWith('/timer');
    return pathname.startsWith(link);
  }

  const matches = useMediaQuery('(display-mode: standalone)');

  const { pathname } = useLocation();
  return (
    <Group grow>
      {links.map((link) => (
        <Link
          key={link.key}
          to={link.href}
          className={[classes.link, isActive(link.href) ? classes.active : undefined].join(' ')}
        >
          <Stack align="center" gap={0}>
            {isActive(link.href) ? link.selectedIcon : link.icon}
            <Text size="xs">{link.label}</Text>
          </Stack>
        </Link>
      ))}
      {matches && (
        <Link
          to="/settings"
          className={[
            classes.link,
            pathname.startsWith('/settings') ? classes.active : undefined,
          ].join(' ')}
        >
          <Stack align="center" gap={0}>
            {pathname.startsWith('/settings') ? <IconSettingsFilled /> : <IconSettings />}
            <Text size="xs">Settings</Text>
          </Stack>
        </Link>
      )}
    </Group>
  );
}
