import { Link, useLocation } from 'react-router-dom';
import { Group, Stack, Text } from '@mantine/core';
import { IconAlarm, IconAlarmFilled, IconFlask, IconFlaskFilled } from '@tabler/icons-react';

import classes from './MobileFooter.module.css';

const links = [
  {
    label: 'Timer',
    icon: <IconAlarm className={classes.icon} />,
    selectedIcon: <IconAlarmFilled className={classes.icon} />,
    href: '/',
  },
  {
    label: 'Volume',
    icon: <IconFlask />,
    selectedIcon: <IconFlaskFilled />,
    href: '/volume',
  },
];

export function MobileFooter() {
  function isActive(link: string) {
    return pathname === link;
  }
  const { pathname } = useLocation();
  return (
    <Group grow mt="xs" mb="lg">
      {links.map((link) => (
        <Link
          to={link.href}
          className={[classes.link, isActive(link.href) ? classes.active : undefined].join(' ')}
        >
          <Stack align="center" gap={0} mb="xs">
            {isActive(link.href) ? link.selectedIcon : link.icon}
            <Text size="xs">{link.label}</Text>
          </Stack>
        </Link>
      ))}
    </Group>
  );
}
