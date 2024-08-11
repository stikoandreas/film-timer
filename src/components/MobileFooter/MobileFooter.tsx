import { Link, useLocation } from 'react-router-dom';
import { Group, Stack, Text } from '@mantine/core';
import {
  IconAlarm,
  IconAlarmFilled,
  IconFlask,
  IconFlaskFilled,
  IconList,
} from '@tabler/icons-react';

import classes from './MobileFooter.module.css';
import { randomId } from '@mantine/hooks';

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
    return pathname === link;
  }
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
    </Group>
  );
}
